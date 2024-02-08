import { Container } from '@/components/ui/container'
import FileUpload from './components/file-upload'
import { FilesTable } from './components/files-table'

export default async function Page() {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Recent Activities</h1>

        <FileUpload />
      </div>

      <FilesTable />
    </Container>
  )
}
