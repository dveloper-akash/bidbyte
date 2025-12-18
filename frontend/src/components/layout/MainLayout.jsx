import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import PageContainer from "./PageContainer"

const MainLayout = () => {
  return (
    <div className="h-screen overflow-hidden flex flex-col  bg-slate-100">
        <Navbar/>
        <main className="flex-1 overflow-y-auto ">
            {/* <PageContainer > */}
                <Outlet/>
            {/* </PageContainer> */}
        </main>
    </div>
  )
}

export default MainLayout