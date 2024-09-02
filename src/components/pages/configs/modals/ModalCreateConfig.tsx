import { Paper, SimpleGrid, Stack, Text, TextInput, Button, Center, ScrollArea, Flex, Divider } from "@mantine/core";
import { IconLock, IconPlayerPause, IconPlayerPlay, IconTrophy, IconUser, IconXboxX } from "@tabler/icons-react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PaperStrategyTenis from "../papers/PaperStrategyTenis";
import ProviderDevice from "../../../../utils/ProviderDevice";
import { SchemaConfig } from "../../../../schemas/SchemaConfig";
import { TypeConfigTenis } from "../../../../types/TypeConfigTenis";

export default function ModalCreateConfig() {
  const { isDesktop } = ProviderDevice();

  const { register, control, handleSubmit, formState: { errors } } = useForm<TypeConfigTenis>({
    mode: 'onChange',
    resolver: yupResolver(SchemaConfig),
    defaultValues: {
      USER: '',
      PASSWORD: '',
      TIME_START: '',
      TIME_FINISH: '',
      STOP_WIN: null, // Ou valor padrão desejado
      STOP_LOSS: null, // Ou valor padrão desejado
      ESTRATEGIES: []
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ESTRATEGIES",
  });

  const onSubmit = (data: TypeConfigTenis) => {
    // Envie o objeto via socket para o backend
    console.log(data);
  };

  const addStrategy = () => {
    append({ DIFF_SET: null, DIFF_POINT: null, MULTIP: 0, ODD_VALUE: 0 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ScrollArea h='auto' scrollbarSize={4}>
        <Stack mah='63vh' gap={10}>
          <Paper withBorder px={10} py={20}>
            <Text ta="center" pb={10}>Dados da BET365 - TÊNIS</Text>
            <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={10}>
              <TextInput {...register("USER")} placeholder="Nome de usuário" error={errors.USER?.message} leftSection={<IconUser size={20} />} />
              <TextInput {...register("PASSWORD")} placeholder="Senha" error={errors.PASSWORD?.message} leftSection={<IconLock size={20} />} />
              <TextInput {...register("TIME_START")} placeholder="Inicio" error={errors.TIME_START?.message} leftSection={<IconPlayerPlay size={20} />} />
              <TextInput {...register("TIME_FINISH")} placeholder="Termino" error={errors.TIME_FINISH?.message} leftSection={<IconPlayerPause size={20} />} />
              <TextInput {...register("STOP_WIN")} placeholder="Stop Win" leftSection={<IconTrophy size={20} />} />
              <TextInput {...register("STOP_LOSS")} placeholder="Stop Loss" leftSection={<IconXboxX size={20} />} />
            </SimpleGrid>
          </Paper>
          <Center><Text ta='center' inline my={5}>Configurações das estratégias</Text></Center>
          {fields.map((strategy, index) => (
            <PaperStrategyTenis
              key={strategy.id}
              id={index}
              register={register}
              onRemove={() => remove(index)}
            />
          ))}
        </Stack>
      </ScrollArea>
      <Divider />
      <Flex mt='md' justify='space-between' direction={isDesktop ? 'row' : 'column'} gap={isDesktop ? '0' : '10'}>
        <Button bottom={0} onClick={addStrategy} color="green">Adicionar Estratégia</Button>
        <Flex gap={10}>
          <Button variant="default">Importar Configurações</Button>
          <Button type="submit">Salvar</Button>
        </Flex>
      </Flex>
    </form>
  );
}
