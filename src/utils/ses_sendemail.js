export function sendEmail (recipientEmail, templateName) {

  // Load the AWS SDK for Node.js
  var AWS = require('aws-sdk/dist/aws-sdk-react-native');
  // Set the region
  AWS.config.update({
    //having trouble setting up the .env? throw accessKeyID and secretAccessKey in here for testing
    region: "us-east-1"
  });

  var sourceEmail = "help@opear.com";

  var replacementTags = {};

  //TODO: logic for different templates
  //set replacementTags like this:
  // {\"REPLACEMENT_TAG_NAME\":\"REPLACEMENT_VALUE\"}

  if(templateName = "passwordReset")
  {
    //TODO: Generate deeplink after setting app scheme
    //replacementTags = {\"PASSWORD_RESET_LINK\":\"REPLACEMENT_VALUE\"}
  }

  // Create sendTemplatedEmail params
  var params = {
  Destination: { /* required */
    ToAddresses: [
      recipientEmail,
      /* more To email addresses */
    ]
  },
  Source: sourceEmail, /* required */
  Template: templateName, /* required */
  TemplateData: replacementTags, /* required */
  ReplyToAddresses: [
    sourceEmail
  ],
  };


  // Create the promise and SES service object
  var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendTemplatedEmail(params).promise();

  // Handle promise's fulfilled/rejected states
  sendPromise.then(
  function(data) {
    console.log(data);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });

}
