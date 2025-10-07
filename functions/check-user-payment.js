
const Stripe = require('stripe');
const stripe = Stripe('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');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  const { email, additional_param } = event.queryStringParameters;

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'email es requerido' }),
    };
  }

  try {
    const sessions = await stripe.checkout.sessions.list({
      status: 'complete',
      limit: 100,
      expand: ['data.line_items'],
    });

    const paidSession = sessions.data.find((session) => {
      const lineItems = session.line_items?.data || [];
      return (
        session.payment_status === 'paid' &&
        session.customer_details?.email === email &&
        lineItems.some((item) => item.price.id === 'price_1R5Ec8GGFTbfvYzkRAzzzp4b')
      );
    });

    if (paidSession) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          paid: true,
          userData: {
            companyName: paidSession.metadata.companyName,
            country: paidSession.metadata.country,
            city: paidSession.metadata.city,
            contactName: paidSession.metadata.contactName,
            email: paidSession.metadata.email,
            phone: paidSession.metadata.phone,
            phonePrefix: paidSession.metadata.phonePrefix,
            score: parseFloat(paidSession.metadata.score),
            paid: paidSession.metadata.paid === 'true',
          },
          additional_param: additional_param || null
        }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          paid: false,
          additional_param: additional_param || null
        }),
      };
    }
  } catch (error) {
    console.error('Error al verificar el pago del usuario:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al verificar el pago del usuario' }),
    };
  }
};
