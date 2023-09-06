export default function register() {
  return (
    <form className="flex flex-col gap-[24px]">
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
        <input className="w-full  indent-1 p-3 rounded-[10px]  font-medium placeholder:text-tertiary mt-1" id="rePassword" name="rePassword" placeholder="請再次輸入密碼" />
      </label>
      <button className=" py-3 px-[48px] bg-secondary text-white font-bold text-[16px] rounded-[10px] w-fit mx-auto" type="button">註冊帳號</button>
      <button className="font-bold text-[16px] w-fit mx-auto" type="button">登入</button>
    </form>
  )
}