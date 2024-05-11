module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          version: '2023-05',
        },
      ],
      '@babel/plugin-proposal-explicit-resource-management',
    ],
    assumptions: {
      setPublicClassFields: false,
    },
  };
};
