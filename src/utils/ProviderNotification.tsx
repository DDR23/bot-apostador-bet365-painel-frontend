import { notifications } from "@mantine/notifications";
import { IconCheck, IconExclamationMark, IconX } from "@tabler/icons-react";

interface NotificationOptions {
  title: string;
  message: string;
  data?: any;
}

export default function ProviderNotification({ title, message }: NotificationOptions) {
  const notificationColor = title === 'Sucesso' ? 'green' : title === 'Alerta' ? 'Orange' : 'red';
  const notificationIcon = title === 'Sucesso' ? <IconCheck /> : title === 'Alerta' ? <IconExclamationMark /> : <IconX />;

  notifications.show({
    title: title,
    message: message,
    autoClose: 3000,
    color: notificationColor,
    icon: notificationIcon
  });
}
