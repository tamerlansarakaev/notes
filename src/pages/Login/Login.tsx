import React from 'react';
import { Container, Input, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';

// Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../Api/api';

// Redux
import { logIn } from '../../redux/reducers/rootReducer';
import { IModalReducer, IRootReducer } from '../../Types/Types';
import { modalClose, modalOpen } from '../../redux/reducers/modalReducer';
import { useDispatch, useSelector } from 'react-redux';

// Types
import { types } from '../../redux/types';

// Components
import Button from '../../Components/UI/Button/Button';
import CustomModalBox from '../../Components/CustomModalBox/CustomModalBox';

// Styles
import classNames from './Login.module.scss';
import buttonClassNames from '../../styles/button.module.scss';

interface IFormState {
  mail: string;
  password: string;
}

const Login: React.FunctionComponent = () => {
  const [formState, setFormState] = React.useState<IFormState>({
    mail: 'admin@notes.com',
    password: 'adminroot',
  });

  const loginStatus = useSelector(
    (state: IRootReducer) => state.rootReducer.loginStatus
  );

  const authStatus = useSelector(
    (state: IRootReducer) => state.rootReducer.authStatus
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalStatus = useSelector(
    (state: IModalReducer) => state.modalReducer.modalStatus
  );

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    const auth = getAuth(app);
    e.preventDefault();

    try {
      const loginUser = await signInWithEmailAndPassword(
        auth,
        formState.mail,
        formState.password
      );
      dispatch(logIn({ loginStatus: true }));
      return loginUser;
    } catch (err) {
      dispatch(
        modalOpen({
          modalStatus: true,
          modalType: types.INCORRECT_FORM,
        })
      );
    }
    return;
  };

  function closeModal() {
    dispatch(modalClose());
  }

  React.useEffect(() => {
    if (loginStatus) {
      navigate('/');
    }
  }, [loginStatus, authStatus]);

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
              value={formState.mail}
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
              value={formState.password}
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
            <Button
              className={buttonClassNames.whiteBorderButton}
              onClick={(e) => {
                e.preventDefault();
                navigate('/register');
              }}
            >
              Sign up
            </Button>
          </fieldset>
        </fieldset>
      </form>
      <Modal
        open={modalStatus && modalStatus}
        onClose={() => closeModal()}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        slotProps={{
          backdrop: {
            style: {
              background: 'rgba(26, 26, 26, 0.5)',
              backdropFilter: 'blur(5.5px)',
            },
          },
        }}
      >
        <div>
          <CustomModalBox text="Write correct Login and Password ">
            <Button
              className={buttonClassNames.blackLightButton}
              onClick={() => closeModal()}
            >
              Close
            </Button>
          </CustomModalBox>
        </div>
      </Modal>
    </Container>
  );
};

export default React.memo(Login);
