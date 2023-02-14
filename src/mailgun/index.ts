import Mailgun from 'mailgun-js';
import formData from 'form-data';

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
export const FROM_EMAIL = process.env.MAILGUN_FROM_EMAIL;


const mailgun = new Mailgun({apiKey: API_KEY, domain: DOMAIN});

export default mailgun;