import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import theme from '../theme'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme='auto'>
      <Notifications />
    </MantineProvider>
  );
}
