import HeaderLeft from './header-left';
import HeaderRight from './header-right';

type HeaderProps = {
  isLogin?: boolean;
}

function Header({isLogin = false}: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLeft/>
          {!isLogin && <HeaderRight/>}
        </div>
      </div>
    </header>
  );
}

export default Header;
