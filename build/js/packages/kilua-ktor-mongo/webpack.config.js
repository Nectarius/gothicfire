let config = {
  mode: 'development',
  resolve: {
    modules: [
      "node_modules"
    ]
  },
  plugins: [],
  module: {
    rules: []
  },
  
};

// entry
config.entry = {
    main: [require('path').resolve(__dirname, "kotlin/kilua-ktor-mongo.js")]
};
config.output = {
    filename: (chunkData) => {
        return chunkData.chunk.name === 'main'
            ? "kilua-ktor-mongo.js"
            : "kilua-ktor-mongo-[name].js";
    },
    library: "kilua-ktor-mongo",
    libraryTarget: "umd",
    clean: true,
    globalObject: "globalThis"
};
// source maps
config.module.rules.push({
        test: /\.m?js$/,
        use: ["source-map-loader"],
        enforce: "pre"
});
config.devtool = 'eval-source-map';
config.ignoreWarnings = [
    /Failed to parse source map/,
    /Accessing import\.meta directly is unsupported \(only property access or destructuring is supported\)/
]

// dev server
config.devServer = {
  "open": true,
  "client": {
    "overlay": {
      "errors": true,
      "warnings": false
    }
  },
  "static": [
    {
      "directory": require('path').resolve(__dirname, "kotlin"),
      "watch": false
    },
    {
      "directory": require('path').resolve(__dirname, "../../../processedResources/js/main"),
      "watch": false
    },
    {
      "directory": require('path').resolve(__dirname, "../../../.."),
      "watch": false
    }
  ]
};

                config.watchOptions = {
  "ignored": [
    "**/node_modules",
    "**/*.kt"
  ]
};
// noinspection JSUnnecessarySemicolon
;(function(config) {
    const tcErrorPlugin = require('kotlin-web-helpers/dist/tc-log-error-webpack');
    config.plugins.push(new tcErrorPlugin())
    config.stats = config.stats || {}
    Object.assign(config.stats, config.stats, {
        warnings: false,
        errors: false
    })
})(config);

// port.js
config.devServer = config.devServer || {};
config.devServer.port = 5120;


// proxy.js
config.devServer = config.devServer || {};
config.devServer.proxy = config.devServer.proxy || [];
config.devServer.proxy.push({
    context: ['/login', '/auth/google/callback', '/auth/twitter', '/auth/twitter/callback', '/logout', '/rpc'],
    target: 'http://localhost:8081',
    secure: false,
    changeOrigin: true
});



module.exports = config
