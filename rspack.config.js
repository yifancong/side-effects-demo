const rspack = require('@rspack/core');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');
const { RsdoctorRspackPlugin } = require('@rsdoctor/rspack-plugin');

/** @type {import('@rspack/cli').Configuration} */
const config = {
  entry: {
    main: './src/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'css/auto',
      },
      {
        test: /\.less$/,
        use: 'less-loader',
        type: 'css',
      },
      {
        test: /\.module\.less$/,
        use: 'less-loader',
        type: 'css/module',
      },
      {
        test: /\.svg$/,
        use: '@svgr/webpack',
      },
      {
        test: /\.tsx$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                jsx: true,
              },
              externalHelpers: true,
              preserveAllComments: false,
              transform: {
                react: {
                  runtime: 'automatic',
                  throwIfNamespace: true,
                  useBuiltins: false,
                },
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.ts$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
              externalHelpers: true,
              preserveAllComments: false,
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'builtin:lightningcss-loader',
            options: {
              targets: 'ie 10',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
    ],
  },
  stats: 'verbose',
  resolve: {
    extensions: ['...', '.tsx', '.ts', '.jsx'], // "..." means to extend from the default extensions
    // Intentionally omit 'module' to demonstrate E1009: esm-resolved-to-cjs.
    // Packages like @arco-design/web-react declare both "module" (ESM) and "main" (CJS).
    // Without 'module' in mainFields, rspack falls back to "main" (CJS) even for
    // ESM `import` statements, preventing tree-shaking.
    // Fix: restore ['browser', 'module', 'main'] so ESM entries are preferred.
    mainFields: ['browser', 'main'],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new RsdoctorRspackPlugin({
      features: ['bundle', 'plugins', 'loader', 'treeShaking'],
      output: {
        mode: 'brief',
        options: {
          type: ['json']
        }
      },
    }),
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: 'public',
        },
      ],
    }),
  ],
};
module.exports = config;
