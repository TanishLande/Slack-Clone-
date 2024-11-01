"use client"
import { Sidebar } from "./Sidebar";
import WorkspaceSidebar from "./WorkspaceSidebar";
import Toolbar from "./_components/toolbar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,  // Correct import
} from "@/components/ui/resizable"


interface WorkspaceIdLayoutProps {
    children: React.ReactNode;
}

const WorkspaceIdLayout = ({
    children
}: WorkspaceIdLayoutProps ) => {
  return (
    <div className="h-full">
        <Toolbar />
        <div className="flex h-[calc(100vh-40px)]">
          <Sidebar />
          <ResizablePanelGroup
            direction="horizontal"
            autoSaveId="Resized-layout"
          >
            <ResizablePanel
              defaultSize={20}
              minSize={11}
              className="bg-[#5E2C5F]"
            >
              <WorkspaceSidebar />
            </ResizablePanel >
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={80}  minSize={20}>
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
    </div>
  )
}

export default WorkspaceIdLayout;
