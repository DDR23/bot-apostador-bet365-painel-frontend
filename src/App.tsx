import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';
import theme from './styles/theme'
import { Notifications } from '@mantine/notifications';
import AppLayout from './components/layouts/AppLayout';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme='auto'>
      <Notifications />
      <AppLayout />
    </MantineProvider>
  );
}
