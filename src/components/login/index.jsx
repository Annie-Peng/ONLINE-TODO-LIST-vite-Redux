import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginData } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const inputs = {
      email: fromData.get('email'),
      password: fromData.get('password')
    };
    dispatch(loginData(inputs))
      .then(res => res && navigate('/todolist'))
  }
  return (
    <form className="flex flex-col gap-[24px]" onSubmit={handleSubmit}>
      <h2 className="font-bold text-[24px]">
        最實用的線上代辦事項服務
      </h2>
      <label className="font-bold" htmlFor="email">
        Email
        <input className="w-full justify indent-1 p-3 rounded-[10px] font-medium placeholder:text-tertiary mt-1" placeholder="請輸入Email" id="email" name="email" />
      </label>
      <label className="font-bold" htmlFor="password">
        密碼
        <input className="w-full  indent-1 p-3 rounded-[10px]  font-medium placeholder:text-tertiary mt-1" id="password" name="password" placeholder="請輸入密碼" />
      </label>
      <button className=" py-3 px-[48px] bg-secondary text-white font-bold text-[16px] rounded-[10px] w-fit mx-auto" type="submit">
        登入</button>
      <button className="font-bold text-[16px] w-fit mx-auto" type="button">
        <Link to="register">註冊帳號</Link>
      </button>
    </form>
  )
}