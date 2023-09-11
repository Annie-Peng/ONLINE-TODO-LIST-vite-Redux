import { Link, Form } from "react-router-dom";
import { registerAccount } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = {
      email: formData.get('email'),
      userName: formData.get('userName'),
      password: formData.get('password'),
      rePassword: formData.get('rePassword'),
    }
    dispatch(registerAccount(inputs))
      .then(res => res && navigate('/'))
  }

  return (
    <Form className="flex flex-col gap-[24px]" method="post" onSubmit={handleSubmit}>
      <h2 className="font-bold text-[24px]">
        註冊帳號
      </h2>
      <label className="font-bold" htmlFor="email">
        Email
        <input className="w-full justify indent-1 p-3 rounded-[10px] font-medium placeholder:text-tertiary mt-1" placeholder="請輸入Email" id="email" name="email" />
      </label>
      <label className="font-bold" htmlFor="userName">
        您的暱稱
        <input className="w-full justify indent-1 p-3 rounded-[10px] font-medium placeholder:text-tertiary mt-1" placeholder="請輸入您的暱稱" id="userName" name="userName" />
      </label>
      <label className="font-bold" htmlFor="password">
        密碼
        <input className="w-full  indent-1 p-3 rounded-[10px]  font-medium placeholder:text-tertiary mt-1" id="password" name="password" placeholder="請輸入密碼" />
      </label>
      <label className="font-bold" htmlFor="rePassword">
        再次輸入密碼
        <input className="w-full indent-1 p-3 rounded-[10px] font-medium placeholder:text-tertiary mt-1" id="rePassword" name="rePassword" placeholder="請再次輸入密碼" />
      </label>
      <button className=" py-3 px-[48px] bg-secondary text-white font-bold text-[16px] rounded-[10px] w-fit mx-auto" type="submit">註冊帳號</button>
      <button className="font-bold text-[16px] w-fit mx-auto" type="button">
        <Link to="/">登入</Link>
      </button>
    </Form>
  )
}