import { useDispatch, useSelector } from 'react-redux';
import logo from '../../images/cover/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { selectAuth, logoutAccount } from '../../features/authSlice';

export default function Header() {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    const res = await dispatch(logoutAccount(auth.token));
    res && navigate('/');
  }

  return (
    <nav className="flex justify-between items-center mx-auto max-w-[1028px] pt-[18px] ps-[24px] pe-[34px]">
      <img src={logo} className="w-[243px] h-[38px]" />
      <h2 className="npm ms-auto font-bold">{auth.userName}的代辦</h2>
      <button type='button' className="ms-3" onClick={handleLogout}>
        登出
      </button>
    </nav>
  )
}