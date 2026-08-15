package config

import org.slf4j.LoggerFactory
import java.io.File
import java.security.KeyFactory
import java.security.KeyStore
import java.security.PrivateKey
import java.security.cert.CertificateFactory
import java.security.spec.PKCS8EncodedKeySpec
import java.util.Base64

object TlsHelper {
    private val logger = LoggerFactory.getLogger(TlsHelper::class.java)

    fun resolveCertFile(): File {
        val configuredPath = EnvConfig["TLS_CERT_FILE"] ?: "gothiccastles.com.pem"
        val primary = File(configuredPath)
        if (primary.exists()) return primary
        val fallback = File("cert.pem")
        if (fallback.exists()) return fallback
        return primary
    }

    fun resolveKeyFile(): File {
        val configuredPath = EnvConfig["TLS_KEY_FILE"] ?: "gothiccastles.com.key"
        val primary = File(configuredPath)
        if (primary.exists()) return primary
        val fallback = File("key.pem")
        if (fallback.exists()) return fallback
        return primary
    }

    fun loadKeyStoreFromPem(
        certFile: File = resolveCertFile(),
        keyFile: File = resolveKeyFile(),
        keyAlias: String = "kornelian_key",
        password: String = "changeit"
    ): KeyStore {
        if (!certFile.exists()) {
            throw IllegalArgumentException("TLS Certificate file not found at: ${certFile.absolutePath}")
        }
        if (!keyFile.exists()) {
            throw IllegalArgumentException("TLS Key file not found at: ${keyFile.absolutePath}")
        }

        logger.info("Loading TLS certificate from: {}", certFile.absolutePath)
        logger.info("Loading TLS private key from: {}", keyFile.absolutePath)

        val certFactory = CertificateFactory.getInstance("X.509")
        val certs = certFile.inputStream().use { stream ->
            certFactory.generateCertificates(stream).toList().toTypedArray()
        }

        val keyPem = keyFile.readText()
            .replace("-----BEGIN PRIVATE KEY-----", "")
            .replace("-----END PRIVATE KEY-----", "")
            .replace("-----BEGIN RSA PRIVATE KEY-----", "")
            .replace("-----END RSA PRIVATE KEY-----", "")
            .replace("-----BEGIN EC PRIVATE KEY-----", "")
            .replace("-----END EC PRIVATE KEY-----", "")
            .replace("\\s+".toRegex(), "")

        val keyBytes = Base64.getDecoder().decode(keyPem)
        val keySpec = PKCS8EncodedKeySpec(keyBytes)

        val privateKey: PrivateKey = try {
            KeyFactory.getInstance("RSA").generatePrivate(keySpec)
        } catch (e1: Exception) {
            try {
                KeyFactory.getInstance("EC").generatePrivate(keySpec)
            } catch (e2: Exception) {
                KeyFactory.getInstance("Ed25519").generatePrivate(keySpec)
            }
        }

        val keyStore = KeyStore.getInstance(KeyStore.getDefaultType())
        keyStore.load(null, password.toCharArray())
        keyStore.setKeyEntry(keyAlias, privateKey, password.toCharArray(), certs)
        return keyStore
    }
}
