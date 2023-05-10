import {APIGatewayProxyResultV2} from "aws-lambda";

const expression = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

export const isValidEmail = (email: string) => expression.test(email)

export const buildResponse = (statusCode: number, body: any): APIGatewayProxyResultV2 => ({
  statusCode,
  body: JSON.stringify(body),
})