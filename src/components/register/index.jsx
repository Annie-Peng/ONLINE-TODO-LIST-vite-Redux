import { Link, Form } from "react-router-dom";
import { registerAccount } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();
  function onSubmit(datas) {
    dispatch(registerAccount(datas))
      .then(res => {
        res.message === '用戶已存在';
        setError('email', {
          type: 'manual',
          message: '電子信箱已註冊過'
        })
        res.status && navigate("/")
      })
  }

  return (
    <form className="flex flex-col gap-[24px]" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="font-bold text-[24px]">
        註冊帳號
      </h2>
      <label className="font-bold" htmlFor="email">
        Email
        <input className="w-full justify indent-1 p-3 rounded-[10px] font-medium placeholder:text-tertiary mt-1" type="text" placeholder="請輸入Email" {...register("email", {
          required: "此欄位不可為空", pattern: {
            value:
              /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
            message: "請輸入正確email格式",
          }
        })} />
        <p className="text-warning mt-1">{errors.email?.message}</p>
      </label>
      <label className="font-bold -mt-2" htmlFor="userName">
        您的暱稱
        <input className="w-full justify indent-1 p-3 rounded-[10px] font-medium placeholder:text-tertiary mt-1" type="text" placeholder="請輸入您的暱稱" {...register("userName", { required: "此欄位不可為空" })} />
        <p className="text-warning mt-1">{errors.userName?.message}</p>
      </label>
      <label className="font-bold -mt-2" htmlFor="password">
        密碼
        <input className="w-full  indent-1 p-3 rounded-[10px] font-medium placeholder:text-tertiary mt-1" type="password" placeholder="請輸入密碼" {...register("password", { required: "此欄位不可為空", minLength: { value: 6, message: "密碼不得少於6個字" } })} />
        <p className="text-warning mt-1">{errors.password?.message}</p>
      </label>
      <label className="font-bold -mt-2" htmlFor="rePassword">
        再次輸入密碼
        <input className="w-full indent-1 p-3 rounded-[10px] font-medium placeholder:text-tertiary mt-1" type="password" placeholder="請再次輸入密碼" {...register("rePassword", { required: "此欄位不可為空", validate: (value, formValues) => value === formValues.password || "密碼輸入錯誤" })} />
        <p className="text-warning mt-1">{errors.rePassword?.message}</p>
      </label>
      <button className=" py-3 px-[48px] bg-secondary text-white font-bold text-[16px] rounded-[10px] w-fit mx-auto" type="submit">註冊帳號</button>
      <button className="font-bold text-[16px] w-fit mx-auto" type="button">
        <Link to="/">登入</Link>
      </button>
    </form>
  )
}
