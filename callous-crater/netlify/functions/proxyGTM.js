// netlify/functions/proxyGTM.js

const axios = require('axios');

exports.handler = async (event) => {
  const { id, src, cond, gtm } = event.queryStringParameters;
  const GTM_ENDPOINT = `https://www.googletagmanager.com/debug/bootstrap?id=${id}&src=${src}&cond=${cond}&gtm=${gtm}`;

  try {
    const response = await axios.get(GTM_ENDPOINT);
    const responseData = response.data;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error('Error proxying GTM request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to proxy GTM request' }),
    };
  }
};
