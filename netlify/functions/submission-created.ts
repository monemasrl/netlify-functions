import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from 'axios';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    const API_ENDPOINT = process.env.CRM_API_ENDPOINT;

    if (event.body === null) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing payload' }),
      };
    }
    const body = JSON.parse(event.body).payload

    /**
     * The API expects the data to be in the following format:
     * 
     * {
     * "id": "649ad5b62a9d080089b14083",
     * "site_url": "https://www.example.com",
     * "form_name": "Contact Form",
     * "form_id": "649ad2fd170c050007f5475d",
     * "first_name": "John",
     * "last_name": "Doe",
     * "email": "jdoe@testmail.test",
     * "phone": "1234567890",
     * "subject": "Contact Form Submission",
     * "message": "This is a test message"
     * "utm_source": "google",
     * "utm_medium": "cpc",
     * "utm_campaign": "test-campaign",
     * "utm_term": "test-term",
     * "utm_content": "test-content",
     * "created_at": "2021-01-01 00:00:00
     * }
     */

    const { first_name, last_name, email, phone, mobile, subject, message, utm_source, utm_medium, utm_campaign, utm_term, utm_content, ...rest } = body.data;
    const requestBody = {
      "id": body.id,
      "site_url": body.site_url,
      "form_name": body.form_name,
      "form_id": body.form_id,
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "phone": phone,
      "mobile": mobile,
      "subject": subject,
      "message": message,
      "utm_source": utm_source,
      "utm_medium": utm_medium,
      "utm_campaign": utm_campaign,
      "utm_term": utm_term,
      "utm_content": utm_content,
      "created_at": body.created_at
    }

    const otherFields = Object.keys(rest).map(key => {
      return `${key}: ${rest[key]}`
    })

    requestBody['notes'] = otherFields.join('\n');

    const response = await axios.post(API_ENDPOINT, requestBody);
    return { statusCode: 200, body: JSON.stringify({ response }) };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed posting data' }),
    };
  }
}

export { handler };
