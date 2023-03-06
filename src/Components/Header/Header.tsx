// MUI for App
import { Box, ListItemButton } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Styles
import './Header.css';

type Props = {};

export default function Header({}: Props) {
  return (
    <div
      className="header-notes"
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ListItemButton sx={{ padding: 1, borderRadius: '8px' }}>
          <FormatListBulletedIcon
            className="list-view-icon"
            sx={{ fill: '#A4A4A4' }}
          />
        </ListItemButton>
        <ListItemButton sx={{ padding: 1, borderRadius: '8px' }}>
          <GridViewIcon className="grid-view-icon" sx={{ fill: '#A4A4A4' }} />
        </ListItemButton>
        <ListItemButton sx={{ padding: 1, borderRadius: '8px' }}>
          <ArrowBackIosNewIcon fontSize="small" sx={{ fill: '#A4A4A4' }} />
        </ListItemButton>
      </Box>
      <Box></Box>
    </div>
  );
}
