import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from 'axios';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // your server-side functionality
  try {
    const API_ENDPOINT = process.env.CRM_API_ENDPOINT;
    const body = JSON.parse(event.body).payload
 
    const response = await axios.post(API_ENDPOINT, body);
    return { statusCode: 200, body: JSON.stringify({ response }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
}

export { handler };
