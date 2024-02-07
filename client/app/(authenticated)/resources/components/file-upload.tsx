'use client'

import React, { useEffect, useState, useTransition } from 'react'
import uploadFile from '../api/actions'

export default function FileUpload() {
  const [showModal, setShowModal] = useState(false)
  const [draggingOver, setDraggingOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (showModal) return

    setFileName('')
  }, [showModal])

  useEffect(() => {
    if (isPending) return

    setShowModal(false)
  }, [isPending])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFileName(e.target.files[0].name)
    }
  }

  const handleDragStateChange = (isDragging: boolean) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDraggingOver(isDragging)
  }

  const onSubmit = async (formData: FormData) => {
    startTransition(() => {
      uploadFile(formData)
    })
  }

  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        Upload File
      </button>

      {showModal ? (
        <>
          <div className="fixed inset-x-0 top-1/4 z-50 mx-8 max-w-2xl rounded-lg md:mx-auto">
            <button
              onClick={() => {
                setShowModal(false)
              }}
              className="px-4 text-2xl font-medium"
            >
              x
            </button>

            <form className="w-full space-y-4 px-12 py-8" action={onSubmit}>
              <label className="block text-xl font-semibold">Upload File</label>

              <input type="file" name="file" id="file" onChange={handleFileChange} className="sr-only" />
              <div
                className={`flex justify-center ${draggingOver ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
                onDragOver={handleDragStateChange(true)}
                onDragLeave={handleDragStateChange(false)}
                onDrop={handleDragStateChange(false)}
              >
                <label
                  htmlFor="file"
                  className="w-full cursor-pointer rounded-md border border-dashed  p-16 text-center"
                >
                  <span className="mb-4 block text-lg">Drop file here</span>
                  <span className="mb-4 block text-base font-medium ">Or</span>
                  <span className="block text-lg">Click to add file</span>
                </label>
              </div>

              {fileName && (
                <div className="flex justify-between rounded-md  p-4">
                  {fileName}{' '}
                  <button className="font-semibold" onClick={() => setFileName('')}>
                    Remove
                  </button>
                </div>
              )}

              <button
                disabled={isPending || !fileName}
                className="w-full items-center rounded-md bg-primary py-3 text-center text-white outline-none disabled:opacity-70"
              >
                {isPending ? 'Uploading...' : 'Upload'}
              </button>
            </form>
          </div>

          <div className="fixed inset-0 z-40 bg-black opacity-25" onClick={() => setShowModal(false)}></div>
        </>
      ) : null}
    </>
  )
}
