const {SESClient, SendEmailCommand} = require("@aws-sdk/client-ses");

const client = new SESClient({});

export const sendWelcomeEmail = async (recipient: string) => {
  try {
    await client.send(new SendEmailCommand({
      Destination: {
        ToAddresses: [recipient],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: 'Hello,\n\nThis is Stefan. Thank you for subscribing to my testpage.\n\nBest,\nStefan',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Welcome Mail',
        },
      },
      Source: 'do-not-reply@mail1a.de',
    }))
    console.log(`welcome email sent to ${recipient}`)
    return true
  } catch (e) {
    console.error(`failed to send email to ${recipient}`)
    return false
  }
}