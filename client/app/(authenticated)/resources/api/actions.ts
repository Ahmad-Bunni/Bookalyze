'use server'

export default async function uploadFile(formData: FormData) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/upload/file`, {
      method: 'POST',
      cache: 'no-cache',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload file')
    }
  } catch (error) {
    console.error(error)
  }
}
