import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import theme from '../theme'
import { Notifications } from '@mantine/notifications';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme='auto'>
      <Notifications />
      <Outlet />
    </MantineProvider>
  );
}
