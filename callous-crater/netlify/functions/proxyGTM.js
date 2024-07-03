const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const url = new URL(event.queryStringParameters.url);

  try {
    const response = await fetch(url);
    const data = await response.text();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Access-Control-Allow-Origin': '*',
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch resource' }),
    };
  }
};
