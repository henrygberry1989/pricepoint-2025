import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Server Error: Missing STRIPE_SECRET_KEY')
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    )
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  })

  try {
    const body = await req.json()
    console.log('Received request body:', body)
    console.log('Environment variables:', {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      priceId: body.priceId
    })

    const { priceId, successUrl, cancelUrl } = body

    if (!priceId) {
      console.error('Missing priceId in request')
      return NextResponse.json(
        { error: 'Missing price ID' },
        { status: 400 }
      )
    }

    console.log('Creating Stripe session...')
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    console.log('Successfully created session:', session.id)
    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error('Stripe error:', {
      message: error.message,
      type: error.type,
      stack: error.stack,
      raw: error
    })
    
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
