import { ChatIcon, ResourcesIcon, WorkspaceIcon } from '@app/common/Icons'
import { Tile } from './components/tile'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1">
      <Tile title="Chat" path="/chat" icon={<ChatIcon />} />
      <Tile title="Resources" path="/resources" icon={<ResourcesIcon />} />
      <Tile title="Workspaces" path="/dashboard" icon={<WorkspaceIcon />} />
    </div>
  )
}
