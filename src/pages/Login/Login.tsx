import React from 'react';
import { Container, Input, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../Api/api';
import { Navigate, useNavigate } from 'react-router-dom';
// Components
import Button from '../../Components/UI/Button/Button';

// Styles
import classNames from './Login.module.scss';
import buttonClassNames from '../../styles/button.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signedIn } from '../../redux/reducers/rootReducer';
import { IRootReducer } from '../../Types/Types';

interface IFormState {
  mail: string;
  password: string;
}

const Login: React.FunctionComponent = () => {
  const [formState, setFormState] = React.useState<IFormState>({
    mail: '',
    password: '',
  });

  const loginStatus = useSelector(
    (state: IRootReducer) => state.rootReducer.loginStatus
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    const auth = getAuth(app);
    e.preventDefault();
    try {
      const loginUser = await signInWithEmailAndPassword(
        auth,
        formState.mail,
        formState.password
      );
      dispatch(signedIn({ loginStatus: true }));

      return loginUser;
    } catch (err) {
      dispatch(signedIn({ loginStatus: false }));
    }
    return;
  };

  React.useEffect(() => {
    if (loginStatus) {
      navigate('/');
    }
  }, [loginStatus]);

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'var(--blackLightBackgroundColor)',
        color: 'white',
        minHeight: '100vh',
        minWidth: '100%',
      }}
    >
      <form
        className={classNames.loginForm}
        onSubmit={(e) => handleSubmitForm(e)}
      >
        <fieldset className={classNames.loginElementsGroup}>
          <Typography
            variant="h1"
            component="h1"
            className={classNames.titleLogin}
          >
            Sign in
          </Typography>
          <fieldset className={classNames.loginFormGroup}>
            <label htmlFor="mail">mail</label>
            <Input
              className={classNames.loginInput}
              disableUnderline
              onChange={(e) =>
                setFormState((form) => {
                  return { ...form, mail: e.target.value };
                })
              }
              required
              name="mail"
              id="mail"
            />
          </fieldset>
          <fieldset className={classNames.loginFormGroup}>
            <label htmlFor="password">Password</label>
            <Input
              className={classNames.loginInput}
              type="password"
              id="password"
              onChange={(e) =>
                setFormState((form) => {
                  return { ...form, password: e.target.value };
                })
              }
              required
              name="password"
              disableUnderline
            />
          </fieldset>
          <fieldset className={classNames.buttonForm}>
            <Button className={buttonClassNames.redLightButton}>Sign In</Button>
            <label>
              При авторизации на сайте даете согласие на обработку своих данных.
            </label>
          </fieldset>
        </fieldset>
      </form>
    </Container>
  );
};

export default React.memo(Login);
