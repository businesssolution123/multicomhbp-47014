
const Stripe = require('stripe');
const stripe = Stripe('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');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  const { session_id, additional_param } = event.queryStringParameters;

  if (!session_id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'session_id es requerido' }),
    };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        payment_status: session.payment_status,
        additional_param: additional_param || null
      }),
    };
  } catch (error) {
    console.error('Error al verificar el pago:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al verificar el pago' }),
    };
  }
};
