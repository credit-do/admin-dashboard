import mailgun, { FROM_EMAIL } from '../../../mailgun';
import Mailgun from 'mailgun-js';

const messageDataParser = (req): Mailgun.messages.SendTemplateData => {
  const { template, recipient, variableKeys, variableVals } = req.body;

  let messageData: Mailgun.messages.SendTemplateData = {to: recipient, from: FROM_EMAIL, template: template};

  for (let i = 0; i < variableKeys.length; i++) {
    messageData[variableKeys[i]] = variableVals[i];
  }
  return messageData;
}

export default function handler(req, res) {
    if (req.method !== 'POST') res.status(400).json({ error: 'Bad request' });

    if (!req.body) res.status(400).json({ error: 'No body' });

    if (!req.body.template || !req.body.recipient) res.status(400).json({ error: 'Missing fields' });

    const msg: Mailgun.messages.SendTemplateData = messageDataParser(req);
    mailgun.messages().send(msg, (error, body) => {console.log(error);});

    res.status(200).json({ name: 'John Doe' });
}
