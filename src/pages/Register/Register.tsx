import React from 'react';
import { Container, Input, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';

// Redux
import { logIn } from '../../redux/reducers/rootReducer';
import { IModalReducer, IRootReducer } from '../../Types/Types';
import { modalClose, modalOpen } from '../../redux/reducers/modalReducer';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Button from '../../Components/UI/Button/Button';
import CustomModalBox from '../../Components/CustomModalBox/CustomModalBox';

// Other
import { createUser } from '../../utils/utils';
import { types } from '../../redux/types';

// Styles
import classNames from './Register.module.scss';
import buttonClassNames from '../../styles/button.module.scss';

interface IFormState {
  mail: string;
  password: string;
}

const Register: React.FunctionComponent = () => {
  const [formState, setFormState] = React.useState<IFormState>({
    mail: '',
    password: '',
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
    e.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const email = emailRegex.test(formState.mail);
      if (!email)
        return dispatch(
          modalOpen({
            modalStatus: true,
            modalType: types.INCORRECT_FORM,
          })
        );

      const create = await createUser({ ...formState }).then(() => {
        dispatch(logIn({ loginStatus: true }));
      });

      return create;
    } catch (err) {
      dispatch(
        modalOpen({
          modalStatus: true,
          modalType: types.INCORRECT_FORM,
        })
      );
      return err;
    }
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
        className={classNames.registerForm}
        onSubmit={(e) => handleSubmitForm(e)}
      >
        <fieldset className={classNames.registerElementsGroup}>
          <Typography
            variant="h1"
            component="h1"
            className={classNames.titleRegister}
          >
            Sign Up
          </Typography>
          <fieldset className={classNames.registerFormGroup}>
            <label htmlFor="mail">mail</label>
            <Input
              className={classNames.registerInput}
              placeholder="example@mail.com"
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
          <fieldset className={classNames.registerFormGroup}>
            <label htmlFor="password">Password</label>
            <Input
              className={classNames.registerInput}
              value={formState.password}
              placeholder="password"
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
            <Button className={buttonClassNames.bluePurpleButton}>
              Sign Up
            </Button>
            <Button
              className={buttonClassNames.whiteBorderButton}
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
            >
              Sign in
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
          <CustomModalBox text="Write correct Email or Password ">
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

export default React.memo(Register);
