import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

interface NotificationOptions {
  title: string;
  message: string;
  data?: any;
}

export default function ProviderNotification({ title, message }: NotificationOptions) {
  const notificationColor = title === 'Sucesso' ? 'green' : 'red';
  const notificationIcon = title === 'Sucesso' ? <IconCheck /> : <IconX />;

  notifications.show({
    title: title,
    message: message,
    autoClose: 3000,
    color: notificationColor,
    icon: notificationIcon
  });
}
