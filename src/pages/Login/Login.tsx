// Global
import React from 'react';
import { Container, Input, Typography } from '@mui/material';

// Components
import Button from '../../Components/UI/Button/Button';

// Styles
import classNames from './Login.module.scss';
import buttonClassNames from '../../styles/button.module.scss';
import { api, db } from '../../Api/config';

interface IFormState {
  userId: string;
  password: string;
}

const Login = () => {
  const [status, setStatus] = React.useState(false);
  const [formState, setFormState] = React.useState<IFormState>({
    userId: '',
    password: '',
  });

  async function getData() {
    try {
      // api.get('/test');
    } catch(err) {
      console.log(err)
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

  const handleSubmitForm = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      api.get('/test.json');
    },
    [formState]
  );

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
            <label htmlFor="id">User ID</label>
            <Input
              className={classNames.loginInput}
              disableUnderline
              onChange={(e) =>
                setFormState((form) => {
                  return { ...form, userId: e.target.value };
                })
              }
              required
              name="id"
              id="id"
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

export default Login;
