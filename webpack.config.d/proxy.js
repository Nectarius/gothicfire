const backendPort = process.env.PORT || 8080;
config.devServer = config.devServer || {};
config.devServer.proxy = config.devServer.proxy || [];
config.devServer.proxy.push({
    context: ['/login', '/auth/google/callback', '/auth/twitter', '/auth/twitter/callback', '/logout', '/rpc'],
    target: 'http://localhost:' + backendPort,
    secure: false,
    changeOrigin: true
});
config.devServer.proxy.push({
    context: ['/game-socket'],
    target: 'ws://localhost:' + backendPort,
    ws: true,
    secure: false,
    changeOrigin: true
});
