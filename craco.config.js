module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.enforce !== 'pre' || !rule.use) return;

        const uses = Array.isArray(rule.use) ? rule.use : [rule.use];
        const isSourceMapLoader = uses.some((use) =>
          String(use?.loader || use).includes('source-map-loader')
        );

        if (!isSourceMapLoader) return;

        const existing = rule.exclude
          ? Array.isArray(rule.exclude)
            ? rule.exclude
            : [rule.exclude]
          : [];

        rule.exclude = [/@mediapipe/, ...existing];
      });

      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        /Failed to parse source map/,
      ];

      return webpackConfig;
    },
  },
};
