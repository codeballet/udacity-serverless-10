// import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as express from 'express'
import * as awsServerlessExpress from 'aws-serverless-express'

import { getAllGroups } from '../../businessLogic/groups'

const app = express()

app.get('/groups', async (_req, res) => {
// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // console.log('Processing event: ', event)

  const groups = await getAllGroups()

  res.json({
    items: groups
  })

  // return {
  //   statusCode: 200,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*'
  //   },
  //   body: JSON.stringify({
  //     items: groups
  //   })
  // }
})

// Create an Express server
const server = awsServerlessExpress.createServer(app)

// Pass API Gateway events to the Express server
exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context)
}
