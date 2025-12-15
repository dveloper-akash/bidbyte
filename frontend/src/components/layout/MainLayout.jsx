import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import PageContainer from "./PageContainer"

const MainLayout = () => {
  return (
    <div className="h-full flex flex-col bg-slate-50">
        <Navbar/>
        <main className="flex-1">
            {/* <PageContainer > */}
                <Outlet/>
            {/* </PageContainer> */}
        </main>
    </div>
  )
}

export default MainLayout