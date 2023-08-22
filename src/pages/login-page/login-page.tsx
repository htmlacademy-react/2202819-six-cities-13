import {useEffect, useRef, FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {toast} from 'react-toastify';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus, CityMap} from '../../const';
import {getRandomCity} from '../../utils';
import {loginAction} from '../../store/api-actions';
import {setActiveCity} from '../../store/offers-data/offers-data.slice';
import {getAuthorizationStatus} from '../../store/user-data/user-data.selectors';
import HeaderLeft from '../../components/header/header-left';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const regexEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  const regexPassword = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  const randomCity = getRandomCity(CityMap);

  const handleButtonRandomClick = () => {
    dispatch(setActiveCity(randomCity));
    navigate(AppRoute.Main);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) =>{
    evt.preventDefault();

    if (loginRef.current && passwordRef.current) {

      if(!regexEmail.test(loginRef.current.value)) {
        toast.warn('Invalid login form');
        return;
      }

      if(!regexPassword.test(passwordRef.current.value)) {
        toast.warn('Invalid password form');
        return;
      }

      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  useEffect(() => {
    if (isAuthorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [isAuthorizationStatus, navigate]);

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLeft/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <button className="locations__item-link" type='button' onClick={handleButtonRandomClick}>
                <span>{randomCity.name}</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
