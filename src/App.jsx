import Login from "./components/login";
import Register from "./components/register";
import ToDoList from "./components/todolist";
import coverPic from "./images/cover/coverPic.png";
import logo from "./images/cover/logo.png";
import { Routes, Route, Outlet } from "react-router-dom";

const Cover = () => {
  return (
    <section className="bg-primary h-screen flex justify-center items-center gap-[106px] px-[116px]">
      <div className="pic">
        <img className="w-max-[313px] h-max-[46px] mx-auto" src={logo} />
        <img className="w-max-[396px] h-max-[448px] mt-4" src={coverPic} />
      </div>
      <Outlet />
    </section>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/ONLINE-TODO-LIST-vite-Redux/" element={<Cover />} >
        <Route path="/ONLINE-TODO-LIST-vite-Redux/" element={<Login />} />
        <Route path="/ONLINE-TODO-LIST-vite-Redux/register" element={<Register />} />
      </Route>
      <Route path="/ONLINE-TODO-LIST-vite-Redux/todolist" element={<ToDoList />} />
    </Routes>

  )
}

export default App
