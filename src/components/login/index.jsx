import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginData } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, setError
  } = useForm();
  function onSubmit(datas) {
    const inputs = {
      email: datas.email,
      password: datas.password
    }
    dispatch(loginData(inputs))
      .then(res => {
        if (!res.status) {
          setError("email", {
            type: "manual",
            message: "帳號或密碼驗證錯誤"
          });
        } else {
          navigate("/todolist")
        }
      })
  }

  return (
    <form className="flex flex-col gap-[24px]" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-bold text-[24px]">
        最實用的線上代辦事項服務
      </h2>
      <label className="font-bold" htmlFor="email">
        Email
        <input className="w-full justify indent-1 p-3 rounded-[10px] font-medium placeholder:text-tertiary mt-1" placeholder="請輸入Email" type="text" {...register("email", { required: "此欄位不可為空" })} />
        <p className="text-warning mt-1">{errors.email?.message}</p>
      </label>
      <label className="font-bold" htmlFor="password">
        密碼
        <input className="w-full  indent-1 p-3 rounded-[10px]  font-medium placeholder:text-tertiary mt-1" placeholder="請輸入密碼" type="password" {...register("password", { required: "此欄位不可為空" })} />
        <p className="text-warning mt-1">{errors.password?.message}</p>
      </label>
      <button className=" py-3 px-[48px] bg-secondary text-white font-bold text-[16px] rounded-[10px] w-fit mx-auto" type="submit">
        登入</button>
      <button className="font-bold text-[16px] w-fit mx-auto" type="button">
        <Link to="register">註冊帳號</Link>
      </button>
    </form>
  )
}