// module.exports = config => {
//     config.entry = ['@babel/polyfill', config.entry]; // eslint-disable-line no-param-reassign
// }

module.exports = function (config, entry) {
    config.entry = ['@babel/polyfill', config.entry]; // eslint-disable-line no-param-reassign
    config.node = entry.isPluginCommand ? false : {
      setImmediate: false
    };
    config.module.rules.push({
      test: /\.(html)$/,
      use: [{
          loader: "@skpm/extract-loader",
        },
        {
          loader: "html-loader",
          options: {
            attrs: [
              'img:src',
              'link:href'
            ],
            interpolate: true,
          },
        },
      ]
    })
    config.module.rules.push({
      test: /\.(css)$/,
      use: [{
          loader: "@skpm/extract-loader",
        },
        {
          loader: "css-loader",
        },
      ]
    })
  }