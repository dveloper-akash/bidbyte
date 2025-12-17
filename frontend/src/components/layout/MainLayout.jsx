import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import PageContainer from "./PageContainer"

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
        <Navbar/>
        <main className="flex-1 pt-16">
            {/* <PageContainer > */}
                <Outlet/>
            {/* </PageContainer> */}
        </main>
    </div>
  )
}

export default MainLayout