export function ActivityTable() {
  return (
    <div className="overflow-y-auto">
      <table className="text-md min-w-full text-left max-sm:text-sm">
        <thead className="border-b font-medium dark:border-zinc-500">
          <tr>
            <th scope="col" className="px-6 py-4">
              Event
            </th>
            <th scope="col" className="px-6 py-4">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b dark:border-zinc-500">
            <td className="max-w-xs overflow-hidden break-words px-6 py-4">Workspace creation event</td>
            <td className="px-6 py-4">{new Date().toLocaleString()}</td>
          </tr>
          <tr className="border-b dark:border-zinc-500">
            <td className="max-w-xs overflow-hidden break-words px-6 py-4">event</td>
            <td className="px-6 py-4">{new Date().toLocaleString()}</td>
          </tr>
          <tr className="border-b dark:border-zinc-500">
            <td className="max-w-lg break-words px-6 py-4 max-sm:max-w-xs">
              eventeventeventeventeventeventeventeventeventeventeventeventeven
            </td>
            <td className="px-6 py-4">{new Date().toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
