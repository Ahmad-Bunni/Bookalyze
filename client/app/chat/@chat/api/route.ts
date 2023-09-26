'use server'

import { CreateStreamFromResponse } from '../services/stream'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await fetch(`${process.env.API_BASE_URL}/chat/ask`, {
    method: 'POST',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: messages, namespace: 'default' }),
  })

  if (!response.ok) {
    throw 'request failed'
  }

  const stream = CreateStreamFromResponse(response)

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  })
}
