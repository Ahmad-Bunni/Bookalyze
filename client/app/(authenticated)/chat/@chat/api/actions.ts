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
