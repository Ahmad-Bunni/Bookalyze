'use client'

import { UploadFile } from '../api/route'

export default function FileUploadButton() {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files

    if (fileList && fileList.length) {
      const file = fileList[0]

      const formData = new FormData()
      formData.append('file', file)
      formData.append('namespace', 'development-3')

      await UploadFile(formData)
    }
  }

  return (
    <label className="cursor-pointer">
      Upload File
      <input type="file" className="hidden" onChange={handleFileChange} />
    </label>
  )
}
