'use server'

import { authOptions } from '@/app/api/auth/auth'
import { getServerSession } from 'next-auth'

export default async function uploadFile(formData: FormData) {
  const data = await getServerSession(authOptions)
  if (!data?.user?.email) return

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/content/file`, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        namespace: data?.user?.email,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload file')
    }
  } catch (error) {
    console.error(error)
  }
}
