import FileUpload from './components/FileUpload'
import { FilesTable } from './components/FilesTable'

type Props = {
  searchParams: Record<string, string> | null | undefined
}

export default async function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Recent Activities</h1>

        <FileUpload />
      </div>

      <FilesTable />
    </>
  )
}
