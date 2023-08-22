import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

function NotFoundPage(): JSX.Element {

  return (
    <>
      <Helmet>
        <title>6 cities: Page Not Found</title>
      </Helmet>
      <h1>404 Not Found</h1>
      <Link to='/'>Вернуться на главную</Link>
    </>
  );
}

export default NotFoundPage;
