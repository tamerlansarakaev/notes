import { Box, Typography } from '@mui/material';

// Styles
import CustomModalStyles from './CustomModal.module.scss';
import { forwardRef } from 'react';

type CustomModal = {
  children?: React.ReactNode;
  text?: string;
  className?: string;
};

const CustomModalBox: React.FC<CustomModal> = forwardRef(
  ({ children, text, className }, ref) => {
    return (
      <div
        className={
          className
            ? `${className} ${CustomModalStyles.container}`
            : CustomModalStyles.container
        }
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
      </div>
    );
  }
);

export default CustomModalBox;
