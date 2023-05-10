import {DynamoDBClient, GetItemCommand, UpdateItemCommand} from "@aws-sdk/client-dynamodb";

const TABLE = process.env['TABLE']
const dynamoDb = new DynamoDBClient({})

export const saveAndGetViewers = async () => {
  console.log('save new viewer')
  const response = await dynamoDb.send(new UpdateItemCommand({
    Key: {'key': {S: 'viewers'}},
    TableName: TABLE,
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'add viewers_count :viewers_count',
    ExpressionAttributeValues: {
      ':viewers_count': {N: '1'},
    }
  }))
  return Number(response.Attributes?.viewers_count?.N || '-1')
}

export const getViewers = async () => {
  const response = await dynamoDb.send(new GetItemCommand({
    Key: {'key': {S: 'viewers'}},
    TableName: TABLE,
  }))
  return Number(response.Item?.viewers_count?.N || '-1')
}

export const saveSubscription = async (email: string) => {
  try {
    await dynamoDb.send(new UpdateItemCommand({
      Key: {'key': {S: 'subscriptions'}},
      TableName: TABLE,
      UpdateExpression: 'add subscriptions :email_list',
      ConditionExpression: 'not(contains(subscriptions, :email))',
      ExpressionAttributeValues: {
        ':email_list': {SS: [email]},
        ':email': {S: email},
      }
    }))
    return true
  } catch (e) {
    console.error('failed to save subscription', e)
    return false
  }
}

export const deleteSubscription = async (email: string) => {
  try {
    await dynamoDb.send(new UpdateItemCommand({
      Key: {'key': {S: 'subscriptions'}},
      TableName: TABLE,
      UpdateExpression: 'delete subscriptions :email',
      ExpressionAttributeValues: {
        ':email': {SS: [email]},
      }
    }))
  } catch (e) {
    console.error(`failed to delete subscription ${email}`, e)
  }
}