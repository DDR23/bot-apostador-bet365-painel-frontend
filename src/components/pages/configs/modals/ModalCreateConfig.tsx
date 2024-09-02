import { Paper, SimpleGrid, Stack, Text, TextInput, Button, Center, ScrollArea, Flex, Divider, NumberInput } from "@mantine/core";
import { IconLock, IconPlayerPause, IconPlayerPlay, IconTrophy, IconUser, IconXboxX } from "@tabler/icons-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PaperStrategyTenis from "../papers/PaperStrategyTenis";
import ProviderDevice from "../../../../utils/ProviderDevice";
import { SchemaConfig } from "../../../../schemas/SchemaConfig";
import { TypeConfigTenis } from "../../../../types/TypeConfigTenis";
import { TimeInput } from "@mantine/dates";
import { useTimePickerControls } from "../../../../utils/TimePickerControls";

export default function ModalCreateConfig() {
  const { isDesktop } = ProviderDevice();
  const { timeStartRef, timeFinishRef, pickerControlStart, pickerControlFinish } = useTimePickerControls();
  const { register, control, handleSubmit, formState: { errors } } = useForm<TypeConfigTenis>({
    mode: 'onChange',
    resolver: yupResolver(SchemaConfig),
    defaultValues: {
      USER: '',
      PASSWORD: '',
      TIME_START: undefined,
      TIME_FINISH: undefined,
      STOP_WIN: 0,
      STOP_LOSS: 0,
      ESTRATEGIES: []
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ESTRATEGIES",
  });

  const onSubmit = (data: TypeConfigTenis) => {
    console.log(data);
  };

  const addStrategy = () => {
    append({ DIFF_SET: 0, DIFF_POINT: 0, MULTIP: 0, ODD_VALUE: 0 });
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
              <Controller
                name="TIME_START"
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
                    error={errors.TIME_START?.message}
                  />
                )}
              />
              <Controller
                name="TIME_FINISH"
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
                    error={errors.TIME_FINISH?.message}
                  />
                )}
              />
              <Controller
                name="STOP_WIN"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    placeholder="Stop Win"
                    min={0}
                    allowDecimal={false}
                    leftSection={<IconTrophy size={20} />}
                  />
                )}
              />
              <Controller
                name="STOP_LOSS"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    {...field}
                    placeholder="Stop Loss"
                    min={0}
                    allowDecimal={false}
                    leftSection={<IconXboxX size={20} />}
                  />
                )}
              />
            </SimpleGrid>
          </Paper>
          <Center><Text ta='center' inline my={5}>Configurações das estratégias</Text></Center>
          {fields.map((strategy, index) => (
            <PaperStrategyTenis
              key={strategy.id}
              id={index}
              control={control}
              errors={errors}
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
