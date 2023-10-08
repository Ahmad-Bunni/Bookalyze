import { ChatIcon, ResourcesIcon, WorkspaceIcon } from '@common/Icons'
import { ActivityTable } from './components/ActivityTable'
import { Tile } from './components/Tile'

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1">
        <Tile title="Chat" path="/chat" icon={<ChatIcon />} />
        <Tile title="Resources" path="/dashboard" icon={<ResourcesIcon />} />
        <Tile title="Workspaces" path="/dashboard" icon={<WorkspaceIcon />} />
      </div>

      <div className="space-y-2 divide-x-2 pt-8">
        <h1 className="text-xl">Recent Activities</h1>
        <ActivityTable />
      </div>
    </>
  )
}
