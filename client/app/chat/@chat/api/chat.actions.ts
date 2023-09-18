export async function sendMessage(message: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/chat/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question: message,
      namespace: 'default',
    }),
  })

  if (!res.ok) {
    console.log(res)
  }

  const data = await res.json()

  return data.message
}

export async function uploadFile(formData: FormData) {
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
