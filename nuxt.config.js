// eslint-disable-next-line import/no-extraneous-dependencies
import StylelintPlugin from 'stylelint-webpack-plugin'

module.exports = {
  head: {
    title: 'Jacob Daitzman',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Slab' }
    ]
  },
  modules: [
    ['nuxt-cname-module']
  ],
  env: {
    generateCNAME: false
  },
  build: {
    watch: [
      'tsconfig.json'
    ],
    plugins: [
      new StylelintPlugin({
        files: ['**/*.{scss,vue}']
      })
    ],
    extend (config, { isDev, isClient }) {
      const { rules } = config.module
      rules.push({
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      })

      if (isDev && isClient) {
        rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
