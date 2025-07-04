import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import { IconMenu2 } from '@tabler/icons-react';

export default function Header() {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        px: 2,
        py: 0.5,
        bgcolor: 'background.paper',

      }}
    >
      {/* Left section: Menu + Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          variant="rounded"
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            bgcolor: 'secondary.light',
            color: 'secondary.dark',
            '&:hover': {
              bgcolor: 'secondary.dark',
              color: 'secondary.light'
            },
            cursor: 'pointer'
          }}
          onClick={() => handlerDrawerOpen(!drawerOpen)}
        >
          <IconMenu2 stroke={1.5} size="20px" />
        </Avatar>
        <LogoSection />
      </Box>

      {/* Spacer pushes right section to far end */}
      <Box sx={{ flexGrow: 1 }} />

      {/* Right section: Notification + Profile */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* <NotificationSection /> */}
        <ProfileSection />
      </Box>
    </Box>
  );
}
