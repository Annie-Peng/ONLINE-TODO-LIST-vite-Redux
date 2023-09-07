import logo from '../../images/cover/logo.png'
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="flex justify-between items-center mx-auto max-w-[1028px] pt-[18px] ps-[24px] pe-[34px]">
      <img src={logo} className="w-[243px] h-[38px]" />
      <h2 className="npm ms-auto font-bold">王小明的代辦</h2>
      <button type='button' className="ms-3">
        <Link to='/'>
          登出
        </Link>
      </button>
    </nav>
  )
}