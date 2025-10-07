const Stripe = require('stripe');
console.log('Inicializando Stripe...');
const stripe = Stripe('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');
console.log('Stripe inicializado correctamente');

exports.handler = async (event) => {
  console.log('Evento recibido:', event);

  if (event.httpMethod !== 'POST') {
    console.log('Método no permitido:', event.httpMethod);
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  try {
    console.log('Verificando event.body...');
    if (!event.body) {
      console.log('Cuerpo de la solicitud vacío');
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: 'Cuerpo de la solicitud vacío' }),
      };
    }

    console.log('Parseando event.body...');
    const body = JSON.parse(event.body);
    console.log('Cuerpo de la solicitud parseado:', body);

    const { companyName, country, city, contactName, email, phone, phonePrefix, score, lang } = body;

    console.log('Verificando email...');
    if (!email) {
      console.log('Email no proporcionado');
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ error: 'Email es requerido' }),
      };
    }

    console.log('Determinando idioma del checkout...');
    const checkoutLocale = lang === 'en' ? 'en' : 'es'; // Por defecto en español si lang no es 'en'

    console.log('Construyendo parámetros para Stripe...');
    const sessionParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: lang === 'en' ?'price_1RCpeRGGFTbfvYzkbNp2rkDG':'price_1R5Ec8GGFTbfvYzkRAzzzp4b',
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: email,
      success_url: 'https://crisismanagement.multicomhbp.com/?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://crisismanagement.multicomhbp.com/',
      locale: checkoutLocale, // Configura el idioma del checkout
      metadata: {
        companyName: companyName || '',
        country: country || '',
        city: city || '',
        contactName: contactName || '',
        email: email || '',
        phone: phone || '',
        phonePrefix: phonePrefix || '',
        score: typeof score === 'number' ? score.toString() : '0',
        paid: 'true',
        lang: lang || 'es', // Guarda el idioma en los metadatos para referencia
      },
    };

    console.log('Parámetros enviados a Stripe:', sessionParams);

    console.log('Creando sesión de checkout...');
    const session = await stripe.checkout.sessions.create(sessionParams);

    console.log('Sesión creada:', session);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error('Error al crear la sesión de Checkout:', error);
    console.error('Detalles del error:', error.message);
    console.error('Código de estado de Stripe:', error.statusCode);
    console.error('Respuesta completa de Stripe:', error.raw);
    console.error('Stack del error:', error.stack);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Error al crear la sesión de Checkout', details: error.message, stripeError: error.raw }),
    };
  }
};