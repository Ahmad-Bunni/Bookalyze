'use server'

import { createStreamFromResponse } from './stream'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await fetch(`${process.env.API_BASE_URL}/chat/ask`, {
    method: 'POST',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: messages, namespace: 'default' }),
  })

  const stream = createStreamFromResponse(response)

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  })
}

export async function UploadFile(formData: FormData) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/file`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload file')
    }

    // Handle the response here if needed
  } catch (error) {
    console.error(error)
  }
}
