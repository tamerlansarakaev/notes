// Global
import React from 'react';
import { ReactSVG } from 'react-svg';

// Redux
import { modalClose } from '../../redux/reducers/modalReducer';
import { useDispatch } from 'react-redux';

// Components
import { Modal } from '@mui/material';
import CustomModalBox from '../CustomModalBox/CustomModalBox';

// Icon
import CrossIcon from './icon/cross.svg';

// Styles
import settingsClassNames from './SettingsModal.module.scss';

type SettingsModal = {
  open: boolean;
};

const SettingsModal = React.forwardRef((props: SettingsModal, ref: any) => {
  const dispatch = useDispatch();

  function closeModalSettings() {
    dispatch(modalClose());
  }

  React.useEffect(() => {
    if (props.open) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [props.open]);

  return (
    <Modal
      ref={ref}
      open={props.open}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        zIndex: '50',
        overflowY: 'auto',
        alignItems: 'center',
      }}
      slotProps={{
        backdrop: {
          style: {
            background: 'rgba(26, 26, 26, 0.5)',
          },
        },
      }}
      className={settingsClassNames.modal}
      onClose={closeModalSettings}
    >
      <CustomModalBox className={settingsClassNames.modalBox}>
        <ReactSVG
          src={CrossIcon}
          className={settingsClassNames.crossIcon}
          onClick={closeModalSettings}
        />
        <span className={settingsClassNames.settings__title}>
          IN development
        </span>
      </CustomModalBox>
    </Modal>
  );
});

export default SettingsModal;
