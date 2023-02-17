
// batch send email
// specify email template
// specify email recipients
// specify variables for email template

import { EmailInput } from './types';

export const sendEmail = async (emailInput: EmailInput) => {
    const { template, recipients, variableKeys, variableVals } = emailInput;

    let body = {template: template, recipient: recipients, variableKeys: variableKeys, variableVals: variableVals};

    const request = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json; charset=UTF-8',},
    };
    await fetch('/api/email/introEmail', request).catch((err) => {return err});
}

export const sendPermissionEmail = async (studentName: string, parentEmail: string) => {
    const emailInput = {
        template: 'permissions',
        recipients: parentEmail,
        variableKeys: ['v:studentName'],
        variableVals: [studentName],
    }
    return sendEmail(emailInput);
}   