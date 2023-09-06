import coverPic from "../../images/cover/coverPic.png";
import logo from "../../images/cover/logo.png";
import { Outlet } from "react-router-dom";

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

export default Cover;