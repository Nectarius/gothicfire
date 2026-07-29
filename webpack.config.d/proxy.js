config.devServer = config.devServer || {};
config.devServer.proxy = config.devServer.proxy || [];
config.devServer.proxy.push({
    context: ['/login', '/auth/google/callback', '/auth/twitter', '/auth/twitter/callback', '/logout', '/rpc'],
    target: 'http://localhost:8081',
    secure: false,
    changeOrigin: true
});
config.devServer.proxy.push({
    context: ['/game-socket'],
    target: 'ws://localhost:8081',
    ws: true,
    secure: false,
    changeOrigin: true
});
