import kotlin.reflect.KClass
import dev.kilua.rpc.RpcServiceManager
import rpc.AppServiceManager
import dev.kilua.rpc.ServiceRegistry

/**
 fuser -k 5120/tcp
* /
fun main() {
    println("AppServiceManager: " + rpc.AppServiceManager)
    println("Websocket requests: " + rpc.AppServiceManager.webSocketRequests)
    println("SSE requests: " + rpc.AppServiceManager.sseRequests)
    println("Registered in ServiceRegistry: " + ServiceRegistry.INSTANCE)
}
