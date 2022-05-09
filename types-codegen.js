/*
  eslint-disable @typescript-eslint/no-var-requires
*/

const path = require('path')
const { generateApi } = require('swagger-typescript-api')

generateApi({
  name: 'index.ts',
  output: path.resolve(process.cwd(), 'app', 'api'),
  url: 'https://int20h-2021-test-task.herokuapp.com/v2/api-docs',
  generateResponses: false,
  httpClientType: 'fetch',
  baseUrl: 'https://int20h-2021-test-task.herokuapp.com',
})
