import { Paper, SimpleGrid, TextInput, Button, Flex } from "@mantine/core";
import { IconLock, IconPlayerPause, IconPlayerPlay, IconUser } from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaConfig } from "../../../../schemas/SchemaConfig";
import { TimeInput } from "@mantine/dates";
import { useTimePickerControls } from "../../../../utils/TimePickerControls";
import { TypeConfig } from "../../../../types/TypeConfig";
import GetSocket from "../../../../utils/GetSocket";
import { useEffect, useState } from "react";
import ProviderNotification from "../../../../utils/ProviderNotification";

interface Props {
  onClose: () => void;
}

export default function ModalCreateConfig({ onClose }: Props) {
  const socket = GetSocket();
  const [isLoading, setIsLoading] = useState(false);
  const { timeStartRef, timeFinishRef, pickerControlStart, pickerControlFinish } = useTimePickerControls();
  const { register, control, handleSubmit, formState: { errors } } = useForm<TypeConfig>({
    mode: 'onChange',
    resolver: yupResolver(SchemaConfig),
    defaultValues: {
      CONFIG_USER: '',
      CONFIG_PASSWORD: '',
      CONFIG_TIME_START: undefined,
      CONFIG_TIME_FINISH: undefined,
    },
  });

  useEffect(() => {
    const handleConfigCreated = (response: { title: string, message: string }) => {
      const { title, message } = response;
      ProviderNotification({ title, message });
      if (title === 'Sucesso') onClose();
      setIsLoading(false);
    };
    
    socket.on('CONFIG_POST_RES', handleConfigCreated);
    return () => {
      socket.off('CONFIG_POST_RES', handleConfigCreated);
    };
  }, [socket]);

  const onSubmit = (data: TypeConfig) => {
    setIsLoading(true);
    socket.emit('CONFIG_POST', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper withBorder p='md'>
        <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={10}>
          <TextInput {...register("CONFIG_USER")} placeholder="Nome de usuário" error={errors.CONFIG_USER?.message} leftSection={<IconUser size={20} />} />
          <TextInput {...register("CONFIG_PASSWORD")} placeholder="Senha" error={errors.CONFIG_PASSWORD?.message} leftSection={<IconLock size={20} />} />
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
                value={field.value || undefined}
                onChange={(value) => field.onChange(value || undefined)}
                error={errors.CONFIG_TIME_START?.message}
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
                value={field.value || undefined}
                onChange={(value) => field.onChange(value || undefined)}
                error={errors.CONFIG_TIME_FINISH?.message}
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
