// Include the AWS SDK module

const AWS = require('aws-sdk');
// Instantiate a DynamoDB document client with the SDK
let dynamodb = new AWS.DynamoDB.DocumentClient();
// Use built-in module to get current date & time
let date = new Date();
// Store date and time in human-readable format in a variable
let now = date.toISOString();
// Define handler function, the entry point to our code for the Lambda service
// We receive the object that triggers the function as a parameter
exports.handler = async (event) => {
    // Extract values from event and format as strings
    //let name = JSON.stringify(`Case , ${event.CompanyID}`);
     
   //let random_number = Math.floor((Math.random()*1000000)+1);
    let case_id = JSON.stringify(`${event.ID}`);
    let CompanyName = JSON.stringify(`${event.CompanyName}`);
    let company_id = JSON.stringify(`${event.CompanyID}`);
    let CaseOwner = JSON.stringify(`${event.CaseOwner}`);
    let SignatureDate = JSON.stringify(`${event.SignatureDate}`);
    //let ContractDuration = JSON.parse(`${event.ContractDuration}`);
    let OnboardingType = JSON.stringify(`${event.OnboardingType}`);
    let DealRequestType = JSON.stringify(`${event.DealRequestType}`);
    let DealEffectiveDate = JSON.stringify(`${event.DealEffectiveDate}`);
    let ContractCentralNumber = JSON.stringify(`${event.ContractCentralNumber}`);
    let CaseStatus = JSON.stringify(`${event.CaseStatus}`);
    let OnboardingStatus = JSON.stringify(`${event.OnboardingStatus}`);
    let Services = JSON.stringify(`${event.Services}`);
    let Comments = JSON.stringify(`${event.Comments}`);
    let Priority = JSON.stringify(`${event.Priority}`);
    
    case_id = case_id.replace(/\"/g, "");
    CompanyName = CompanyName.replace(/\"/g, "");
    company_id = company_id.replace(/\"/g, "");
    OnboardingType = OnboardingType.replace(/\"/g, "");
    CaseOwner = CaseOwner.replace(/\"/g, "");
    DealRequestType = DealRequestType.replace(/\"/g, "");
    DealEffectiveDate = DealEffectiveDate.replace(/\"/g, "");
    DealRequestType = DealRequestType.replace(/\"/g, "");
    ContractCentralNumber = ContractCentralNumber.replace(/\"/g, "");
    CaseStatus = CaseStatus.replace(/\"/g, "");
    SignatureDate = SignatureDate.replace(/\"/g, "");
    OnboardingType = OnboardingType.replace(/\"/g, "");
    OnboardingStatus =OnboardingStatus.replace(/\"/g, "");
    Services =Services.replace(/\"/g, "");
    Comments =Comments.replace(/\"/g, "");
    Priority =Priority.replace(/\"/g, "");

    
    
    
    let message = "Case successfully submitted";
    let params = {
        TableName:'HelloWorldDatabase',
        Item: {
            'ID': case_id,
            'CompanyName': CompanyName,
            'LatestGreetingTime': now,
            'CompanyID': company_id, 
            'CaseOwner': CaseOwner, 
            'SignatureDate': SignatureDate, 
            'OnboardingType': OnboardingType,
            'DealRequestType': DealRequestType,
            'DealEffectiveDate': DealEffectiveDate,
            'ContractCentralNumber':ContractCentralNumber,
            'CaseStatus': CaseStatus,
            'OnboardingStatus': OnboardingStatus,
            'Services':Services,
            'Comments':Comments,
            'Priority':Priority //Normal,High
            }
    };
    // Using await, make sure object writes to DynamoDB table before continuing execution
    await dynamodb.put(params).promise();
    // Create a JSON object with our response and store it in a constant
    const response = {
        statusCode: 200,
        body: message
    };
    // Return the response constant
    return response;
};
