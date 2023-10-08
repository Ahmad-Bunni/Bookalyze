export function FilesTable() {
  return (
    <div className="overflow-y-auto rounded-md border bg-zinc-300 dark:border-none dark:bg-zinc-700">
      <table className="text-md min-w-full text-left max-sm:text-sm">
        <thead className="border-b font-medium dark:border-zinc-500">
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
          <tr className="border-b dark:border-zinc-500">
            {/* <td className="max-w-xs overflow-hidden break-words px-6 py-4">Sample</td>
            <td className="px-6 py-4">Default</td>
            <td className="px-6 py-4">{new Date().toLocaleString()}</td> */}
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center p-4">
        <label className="text-center">There are no items to display.</label>
      </div>
    </div>
  )
}
