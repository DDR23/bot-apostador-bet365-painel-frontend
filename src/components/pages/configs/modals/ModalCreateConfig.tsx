import { Paper, SimpleGrid, TextInput, Button, Flex } from "@mantine/core";
import { IconLock, IconUser } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaConfig } from "../../../../schemas/SchemaConfig";
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
  const { register, handleSubmit, formState: { errors } } = useForm<TypeConfig>({
    mode: 'onChange',
    resolver: yupResolver(SchemaConfig),
    defaultValues: {
      CONFIG_USER: '',
      CONFIG_PASSWORD: '',
      CONFIG_TIME_START: '--:--',
      CONFIG_TIME_FINISH: '--:--',
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
        </SimpleGrid>
      </Paper>
      <Flex mt='md' justify='flex-end'>
        <Button type="submit" loading={isLoading}>Salvar</Button>
      </Flex>
    </form>
  );
}
