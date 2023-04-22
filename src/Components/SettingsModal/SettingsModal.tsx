// Global
import React from 'react';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';

// Components
import { Modal } from '@mui/material';
import CustomModal from '../Modal/CustomModal';

// Icon
import CrossIcon from './icon/cross.svg';

// Styles
import settingsClassNames from './SettingsModal.module.scss';
import { modalClose } from '../../redux/reducers/modalReducer';

type SettingsModal = {
  open: boolean;
};

const SettingsModal = React.forwardRef((props: SettingsModal, ref: any) => {
  const dispatch = useDispatch();

  function closeModalSettings() {
    dispatch(modalClose());
  }

  return (
    <Modal
      ref={ref}
      open={props.open}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClose={closeModalSettings}
    >
      <div>
        <CustomModal className={settingsClassNames.modalBox}>
          <ReactSVG
            src={CrossIcon}
            className={settingsClassNames.crossIcon}
            onClick={closeModalSettings}
          />
          <span className={settingsClassNames.settings__title}>
            IN development
          </span>
        </CustomModal>
      </div>
    </Modal>
  );
});

export default SettingsModal;
