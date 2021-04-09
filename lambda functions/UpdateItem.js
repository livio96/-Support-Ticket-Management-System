'use strict';

const aws = require('aws-sdk');

// It is recommended that we instantiate AWS clients outside the scope of the handler 
// to take advantage of connection re-use.
const docClient = new aws.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
    
    let case_id = JSON.stringify(`${event.CaseID}`);
    let CompanyName = JSON.stringify(`${event.CompanyName}`);
    let company_id = JSON.parse(`${event.CompanyID}`);
    let CaseOwner = JSON.stringify(`${event.CaseOwner}`);
    let SignatureDate = JSON.stringify(`${event.SignatureDate}`);
    let OnboardingType = JSON.stringify(`${event.OnboardingType}`);
    let DealRequestType = JSON.stringify(`${event.DealRequestType}`);
    let DealEffectiveDate = JSON.stringify(`${event.DealEffectiveDate}`);
    let ContractCentralNumber = JSON.stringify(`${event.ContractCentralNumber}`);
    let CaseStatus = JSON.stringify(`${event.CaseStatus}`);
    let OnboardingStatus = JSON.stringify(`${event.OnboardingStatus}`);
    
    case_id = case_id.replace(/\"/g, "");
    CompanyName = CompanyName.replace(/\"/g, "");
    OnboardingType = OnboardingType.replace(/\"/g, "");
    CaseOwner = CaseOwner.replace(/\"/g, "");
    DealEffectiveDate = DealEffectiveDate.replace(/\"/g, "");
    DealRequestType = DealRequestType.replace(/\"/g, "");
    ContractCentralNumber = ContractCentralNumber.replace(/\"/g, "");
    CaseStatus = CaseStatus.replace(/\"/g, "");
    SignatureDate = SignatureDate.replace(/\"/g, "");
    OnboardingStatus =OnboardingStatus.replace(/\"/g, "");

    
    const params = {
        TableName: "HelloWorldDatabase",
        Key: {
            "ID": case_id
        },
        UpdateExpression: "set CompanyName = :CompanyName, CompanyID = :CompanyID, OnboardingType = :OnboardingType, CaseOwner = :CaseOwner, DealRequestType = :DealRequestType, DealEffectiveDate = :DealEffectiveDate,  ContractCentralNumber = :ContractCentralNumber,  SignatureDate = :SignatureDate, OnboardingStatus = :OnboardingStatus, CaseStatus = :CaseStatus",
     //  UpdateExpression: "set CompanyName = :CompanyName, CompanyID = :CompanyID",
        ExpressionAttributeValues: {
            ":CompanyName": CompanyName,
            ":CompanyID": company_id,
            ":OnboardingType": OnboardingType,
            ":CaseOwner": CaseOwner,
            ":DealEffectiveDate": DealEffectiveDate,
           ":DealRequestType": DealRequestType,
           ":ContractCentralNumber": ContractCentralNumber,
            ":SignatureDate": SignatureDate,
             ":OnboardingStatus": OnboardingStatus,
             ":CaseStatus":CaseStatus
             

            
        }
    };

    docClient.update(params, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
    });
    
    
      const response = {
        statusCode: 200,
        body: JSON.stringify('Case Updated Successfully'),
    };
    return response;
};

