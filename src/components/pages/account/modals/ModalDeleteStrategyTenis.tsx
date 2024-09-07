import { useEffect, useState } from "react";
import GetSocket from "../../../../utils/GetSocket";
import ProviderNotification from "../../../../utils/ProviderNotification";
import { Button, Stack, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { TypeStrategyTenis } from "../../../../types/TypeStrategyTenis";

interface Props {
  strategy: TypeStrategyTenis;
  onClose: () => void;
}

export default function ModalDeleteStrategyTenis({ strategy, onClose }: Props) {
  const socket = GetSocket();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleConfigDelete = (response: { title: string, message: string }) => {
      const { title, message } = response;
      ProviderNotification({ title, message });
      if (title !== 'Erro') onClose();
      setIsLoading(false);
    };

    socket.on('STRATEGY_DELETE_RES', handleConfigDelete);
    return () => {
      socket.off('STRATEGY_DELETE_RES', handleConfigDelete);
    };
  }, [socket]);

  const handleDeleteConfig = () => {
    setIsLoading(true);
    socket.emit('STRATEGY_DELETE', strategy);
  }

  return (
    <>
      <Stack align="center" gap={0}>
        <Text ta='center'>Deletar</Text>
        <Text ta='center' size="sm" c='dimmed'>Tem certeza que deseja deletar esta estrategia?</Text>
      </Stack>
      <Button
        onClick={handleDeleteConfig}
        fullWidth
        mt="md"
        loading={isLoading}
        leftSection={<IconTrash size={20} />}
        color='red'
      >
        Deletar estrategia
      </Button>
    </>
  );
}
