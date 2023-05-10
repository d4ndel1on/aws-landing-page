import middy from "@middy/core";
import cors from '@middy/http-cors';
import {APIGatewayProxyEventV2, APIGatewayProxyResultV2} from "aws-lambda";
import {deleteSubscription, getViewers, saveAndGetViewers, saveSubscription} from "./dataClient";
import {buildResponse, isValidEmail} from "./utils";
import {sendWelcomeEmail} from "./emailClient";

const handleSubscribeRequest = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  if (!event.body) {
    return buildResponse(400, {error: 'body is missing'})
  }
  const email = JSON.parse(event.body).email
  if (!email || typeof email !== 'string') {
    return buildResponse(400, {error: 'email is missing'})
  }
  if (!isValidEmail(email)) {
    return buildResponse(400, {error: 'invalid email'})
  }
  const subscriptionSaved = await saveSubscription(email)
  if (subscriptionSaved) {
    const emailSent = await sendWelcomeEmail(email)
    if (emailSent) {
      return buildResponse(200, {result: 'subscription saved'})
    } else {
      await deleteSubscription(email)
      return buildResponse(500, {error: 'failed to send email'})
    }
  } else {
    return buildResponse(409, {error: 'already subscribed'})
  }
}

const handleViewersRequest = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const saveNew = event.queryStringParameters?.count === 'true'
  const viewers = saveNew ? await saveAndGetViewers() : await getViewers()
  return buildResponse(200, {viewers})
}

const handleEvent = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log('received event', event)
  if (event.rawPath === '/subscribe' && event.requestContext.http.method === 'POST') {
    return await handleSubscribeRequest(event)
  }
  if (event.rawPath === '/viewers' && event.requestContext.http.method === 'GET') {
    return await handleViewersRequest(event)
  }
  return {statusCode: 404}
}

export const handler = middy(handleEvent)
  .use(cors())