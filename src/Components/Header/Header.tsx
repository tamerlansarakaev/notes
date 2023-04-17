// MUI for App
import { Box, ListItemButton } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Styles
import './Header.scss';
import { Link } from 'react-router-dom';

interface IHeader {
  children?: React.ReactNode;
  activeBackButton?: boolean;
}

export default function Header({ children, activeBackButton = true }: IHeader) {
  return (
    <div
      className="header-notes"
      style={{ display: 'flex', justifyContent: 'space-between',minHeight: '67px' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {activeBackButton && (
          <ListItemButton
            sx={{
              borderRadius: '8px',
              display: 'flex',
              width: '41px',
              height: '41px',
              boxSizing: 'border-box',
              justifyContent: 'center',
            }}
          >
            <Link
              to={'/'}
              style={{
                display: 'flex',
                padding: '8px 16px',
                boxSizing: 'border-box',
                textDecoration: 'none',
                outline: 'none',
              }}
            >
              <ArrowBackIosNewIcon fontSize="small" sx={{ fill: '#A4A4A4' }} />
            </Link>
          </ListItemButton>
        )}
      </Box>
      {children ? children : ''}
    </div>
  );
}
