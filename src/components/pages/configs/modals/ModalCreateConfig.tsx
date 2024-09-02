import { Paper, SimpleGrid, TextInput, Button, Flex } from "@mantine/core";
import { IconLock, IconPlayerPause, IconPlayerPlay, IconUser } from "@tabler/icons-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaConfig } from "../../../../schemas/SchemaConfig";
import { TimeInput } from "@mantine/dates";
import { useTimePickerControls } from "../../../../utils/TimePickerControls";
import { TypeConfig } from "../../../../types/TypeConfig";

export default function ModalCreateConfig() {
  const { timeStartRef, timeFinishRef, pickerControlStart, pickerControlFinish } = useTimePickerControls();
  const { register, control, handleSubmit, formState: { errors } } = useForm<TypeConfig>({
    mode: 'onChange',
    resolver: yupResolver(SchemaConfig),
    defaultValues: {
      USER: '',
      PASSWORD: '',
      TIME_START: undefined,
      TIME_FINISH: undefined,
    },
  });
  
  const onSubmit = (data: TypeConfig) => {
    console.log(data);
  };
  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper withBorder p='md'>
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
        </SimpleGrid>
      </Paper>
      <Flex mt='md' justify='flex-end'>
        <Button type="submit">Salvar</Button>
      </Flex>
    </form>
  );
}









// const { fields, append, remove } = useFieldArray({
//   control,
//   name: "ESTRATEGIES",
// });
// const addStrategy = () => {
//   append({ DIFF_SET: 0, DIFF_POINT: 0, MULTIP: 0, ODD_VALUE: 0 });
// };


{/* <Controller
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
  /> */}