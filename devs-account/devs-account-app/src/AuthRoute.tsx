import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = (props) => {
  const { user: { loggedIn, accessToken } } = useSelector((state: any) => state.auth);

  if (!loggedIn && !accessToken) return <Redirect to="/" />; // check logged in user

  return <Route {...props} />;
};

export default AuthRoute; 
