import { Box, Typography } from '@mui/material';
import styles from './CustomModal.module.scss';

type CustomModal = {
  children?: React.ReactNode;
  text?: string;
};

const CustomModal: React.FC<CustomModal> = ({ children, text }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#242424',
        gap: '64px',
        boxShadow: '0px 7px 11px rgba(0, 0, 0, 0.25)',
        borderRadius: '20px',
        padding: '60px 185px',
      }}
    >
      {text && (
        <Typography
          component="span"
          sx={{
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '30px',
            lineHeight: '35px',
            maxWidth: '327px',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: 'var(--whiteColor)',
          }}
        >
          {text}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default CustomModal;
