export function FilesTable() {
  return (
    <div className="overflow-y-auto rounded-md border">
      <table className="text-md min-w-full text-left max-sm:text-sm">
        <thead className="border-b font-medium ">
          <tr>
            <th scope="col" className="px-6 py-4">
              File
            </th>

            <th scope="col" className="px-6 py-4">
              Workspace
            </th>

            <th scope="col" className="px-6 py-4">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b"></tr>
        </tbody>
      </table>
      <div className="flex justify-center p-4">
        <label className="text-center">There are no items to display.</label>
      </div>
    </div>
  )
}
