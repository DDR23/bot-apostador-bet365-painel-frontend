import { Button, Stack, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import GetSocket from "../../../../utils/GetSocket";
import ProviderNotification from "../../../../utils/ProviderNotification";

interface Props {
  configId?: string;
  onClose: () => void;
}

export default function ModalDeleteConfig({ configId, onClose }: Props) {
  const socket = GetSocket();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleConfigDelete = (response: { title: string, message: string }) => {
      const { title, message } = response;
      ProviderNotification({ title, message });
      if (title === 'Sucesso') onClose();
      setIsLoading(false);
    };

    socket.on('CONFIG_DELETE_RES', handleConfigDelete);
    return () => {
      socket.off('CONFIG_DELETE_RES', handleConfigDelete);
    };
  }, [socket]);

  const handleDeleteConfig = () => {
    setIsLoading(true);
    socket.emit('CONFIG_DELETE', configId);
  }

  return (
    <>
      <Stack align="center" gap={0}>
        <Text ta='center'>Deletar</Text>
        <Text ta='center' size="sm" c='dimmed'>Tem certeza que deseja deletar configuração?</Text>
      </Stack>
      <Button
        onClick={handleDeleteConfig}
        fullWidth
        mt="md"
        loading={isLoading}
        leftSection={<IconTrash size={20} />}
        color='red'
      >
        Deletar configuração
      </Button>
      <Text ta='center' size="xs" c='dimmed' mt={10}>OBS: Ao deletar uma configuração todas as estrategias da configurção tambem são apagadas.</Text>
    </>
  );
}
