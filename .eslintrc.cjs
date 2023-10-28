module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
      {
        "env": {
            "browser": true,
            "es6": true
        },
        "extends": [
            "eslint:recommended",
            "plugin:react/recommended",
            "react-app","prettier"
        ],
        "settings": {
          "react": {
            "createClass": "createReactClass",
            "pragma": "React",
            "version": "detect",
            "flowVersion": "0.53"
          },
          "propWrapperFunctions": [
              "forbidExtraProps",
              {"property": "freeze", "object": "Object"},
              {"property": "myFavoriteWrapper"}
          ],
          "linkComponents": [
            "Hyperlink",
            {"name": "Link", "linkAttribute": "to"}
          ]
        },
        "parserOptions": {
            "ecmaVersion": 2018,
            "ecmaFeatures": {
              "jsx": true
            }
        },
        "plugins": [
            "react","prettier"
        ],
        "rules": {
          "react/jsx-uses-react": "error",
          "react/jsx-uses-vars": "error",
          "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
        }
    }
    ],
  },
}
