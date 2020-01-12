module.exports = (api) => {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-root-import',
        {
          rootPathSuffix: './src',
          rootPathPrefix: '@/',
        },
      ],
    ],
  };
};
