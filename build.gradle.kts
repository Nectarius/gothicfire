@file:OptIn(org.jetbrains.kotlin.gradle.ExperimentalKotlinGradlePluginApi::class)

plugins {
    alias(libs.plugins.kotlin.multiplatform)
    alias(libs.plugins.kotlin.serialization)
    id("com.google.devtools.ksp") version "2.3.9"
    alias(libs.plugins.kilua)
    id("dev.kilua.rpc") version "0.0.45"
    id("org.jetbrains.kotlin.plugin.compose") version "2.4.0"
}

kotlin {
    jvm {
        mainRun {
            mainClass.set("ServerKt")
        }
    }
    js {
        browser()
        binaries.executable()
    }
    
    sourceSets {
        commonMain.dependencies {
            implementation(libs.kilua.rpc.core)
            implementation(libs.kilua.rpc.ktor)
            implementation("dev.kilua:kilua-rpc-annotations:0.0.45")
            implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.1")
        }
        jvmMain.dependencies {
            implementation("org.jetbrains.compose.runtime:runtime:1.7.0")
            implementation(libs.ktor.server.core)
            implementation(libs.ktor.server.netty)
            implementation(libs.ktor.server.auth)
            implementation(libs.ktor.server.sessions)
            implementation(libs.ktor.server.cors)
            implementation(libs.ktor.server.content.negotiation)
            implementation(libs.ktor.client.cio)
            implementation(libs.ktor.serialization.kotlinx.json)
            implementation(libs.mongodb.kotlin.sync)
            implementation(libs.logback)
            implementation("io.ktor:ktor-server-websockets-jvm:3.5.1")
        }
        jsMain.dependencies {
            implementation(libs.kilua.core)
        }
    }
}

// Ensure KSP-generated RPC sources are available before compilation
tasks.named("compileKotlinJvm") {
    dependsOn("kspCommonMainKotlinMetadata")
}
tasks.named("compileKotlinJs") {
    dependsOn("kspCommonMainKotlinMetadata")
}
