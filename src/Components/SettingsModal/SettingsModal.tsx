// Global
import React from 'react';
import { useSelector } from 'react-redux';
import { IModalReducer } from '../../Types/Types';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';

// Components
import { Modal } from '@mui/material';
import CustomModal from '../Modal/CustomModal';

// Icon
import CrossIcon from './icon/cross.svg';

// Styles
import settingsClassNames from './SettingsModal.module.scss';

type SettingsModal = {
  open: boolean;
  onClose: (e: any) => void;
};

const SettingsModal = React.forwardRef((props: SettingsModal, ref: any) => {
  const modalStatus = useSelector(
    (state: IModalReducer) => state.modalReducer.modalStatus
  );

  return (
    <Modal
      ref={ref}
      open={props.open}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClose={props.onClose}
    >
      <div>
        <CustomModal>
          <ReactSVG src={CrossIcon} className={settingsClassNames.crossIcon} />
          <span className={settingsClassNames.settings__title}>
            IN development
          </span>
        </CustomModal>
      </div>
    </Modal>
  );
});

export default SettingsModal;
