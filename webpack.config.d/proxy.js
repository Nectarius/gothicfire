config.devServer = config.devServer || {};
config.devServer.proxy = config.devServer.proxy || [];
config.devServer.proxy.push({
    context: ['/login', '/auth/google/callback', '/logout', '/rpc'],
    target: 'http://localhost:8081',
    secure: false,
    changeOrigin: true
});
