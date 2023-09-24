export function createStreamFromResponse(apiResponse: Response): ReadableStream {
  return new ReadableStream({
    async start(controller) {
      const reader = apiResponse.body?.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = (await reader?.read()) || {}

        if (done) {
          controller.close()
          return
        }

        const decoded = decoder.decode(value)
        controller.enqueue(decoded)
      }
    },
  })
}
