import ChatContainer from './components/ChatContainer'
import FileUploadButton from './components/FileUploadButton'

export default function Chat() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-end gap-4 p-2">
        <FileUploadButton />
      </div>

      <ChatContainer />
    </div>
  )
}
