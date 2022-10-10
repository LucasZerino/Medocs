import { Header } from "./header";
import { Sidebar } from "./sidebar";


export function Dashlayout ({ children }: { children: React.ReactNode }) {
    return<div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
         <Sidebar/>
        <div className="w-full">
            <div className="flex flex-col h-full w-full">
                <Header/>
                <div>{children}</div>
            </div>
        </div>
    </div>
  }