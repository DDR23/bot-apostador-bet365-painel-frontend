import { useEffect, useState } from "react";
import GetSocket from "../../../../utils/GetSocket";
import { useTimePickerControls } from "../../../../utils/TimePickerControls";
import { Controller, useForm } from "react-hook-form";
import { TypeConfigEdit } from "../../../../types/TypeConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaConfigEdit } from "../../../../schemas/SchemaConfig";
import { Button, Flex, Paper, SimpleGrid, TextInput } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconLock, IconPlayerPause, IconPlayerPlay, IconUser } from "@tabler/icons-react";
import ProviderNotification from "../../../../utils/ProviderNotification";

interface Props {
  configId?: string;
  onClose: () => void;
}

export default function ModalEditConfig({ configId, onClose }: Props) {
  const socket = GetSocket();
  const [isLoading, setIsLoading] = useState(false);
  const { timeStartRef, timeFinishRef, pickerControlStart, pickerControlFinish } = useTimePickerControls();
  const { control, handleSubmit } = useForm<TypeConfigEdit>({
    mode: 'onChange',
    resolver: yupResolver(SchemaConfigEdit)
  });

  useEffect(() => {
    const handleConfigUpdate = (response: { title: string, message: string }) => {
      const { title, message } = response;
      ProviderNotification({ title, message });
      if (title !== 'Erro') onClose();
      setIsLoading(false);
    };

    socket.on('CONFIG_PUT_RES', handleConfigUpdate);
    return () => {
      socket.off('CONFIG_PUT_RES', handleConfigUpdate);
    };
  }, [socket]);

  const onSubmit = (data: TypeConfigEdit) => {
    setIsLoading(true);
    socket.emit('CONFIG_PUT', configId, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper withBorder p='md'>
        <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={10}>
          <Controller
            name="CONFIG_USER"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                leftSection={<IconUser size={20} />}
                placeholder="Nome de usuário"
                value={field.value || ''}
                onChange={(value) => field.onChange(value || '')}
              />
            )}
          />
          <Controller
            name="CONFIG_PASSWORD"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                leftSection={<IconLock size={20} />}
                placeholder="Senha"
                value={field.value || ''}
                onChange={(value) => field.onChange(value || '')}
              />
            )}
          />
          <Controller
            name="CONFIG_TIME_START"
            control={control}
            render={({ field }) => (
              <TimeInput
                {...field}
                ref={timeStartRef}
                rightSection={pickerControlStart}
                leftSection={<IconPlayerPlay size={20} />}
                placeholder="Início"
                value={field.value || ''}
                onChange={(value) => field.onChange(value || '')}
              />
            )}
          />
          <Controller
            name="CONFIG_TIME_FINISH"
            control={control}
            render={({ field }) => (
              <TimeInput
                {...field}
                ref={timeFinishRef}
                rightSection={pickerControlFinish}
                leftSection={<IconPlayerPause size={20} />}
                placeholder="Término"
                value={field.value || ''}
                onChange={(value) => field.onChange(value || '')}
              />
            )}
          />
        </SimpleGrid>
      </Paper>
      <Flex mt='md' justify='flex-end'>
        <Button type="submit" loading={isLoading}>Salvar</Button>
      </Flex>
    </form>
  );
}
