'use server'

import { authOptions } from '@/app/api/auth/auth'
import { getServerSession } from 'next-auth/next'
import { CreateStreamFromResponse } from '../services/stream'

export async function POST(req: Request) {
  const data = await getServerSession(authOptions)
  if (!data?.user?.email) return

  const { messages } = await req.json()

  const response = await fetch(`${process.env.API_BASE_URL}/chat/ask`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      namespace: data?.user?.email,
    },
    body: JSON.stringify({ messages: messages }),
  })

  if (!response.ok) {
    throw 'request failed'
  }

  const stream = CreateStreamFromResponse(response)

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  })
}
