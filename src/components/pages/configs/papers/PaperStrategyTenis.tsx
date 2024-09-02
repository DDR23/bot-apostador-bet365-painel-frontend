import { Button, Center, Paper, SimpleGrid, TextInput } from "@mantine/core";
import { IconBrandSupabase, IconCoin, IconPingPong, IconScoreboard } from "@tabler/icons-react";
import { UseFormRegister } from "react-hook-form";

interface Props {
  id: number;
  register: UseFormRegister<any>;
  onRemove: (id: number) => void;
}

export default function PaperStrategyTenis({ id, register, onRemove }: Props) {
  return (
    <Paper withBorder p={10}>
      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={10}>
        <TextInput {...register(`ESTRATEGIES[${id}].DIFF_SET`)} placeholder="Diferença de set" leftSection={<IconScoreboard size={20} />} />
        <TextInput {...register(`ESTRATEGIES[${id}].DIFF_POINT`)} placeholder="Diferença de pontos" leftSection={<IconPingPong size={20} />} />
        <TextInput {...register(`ESTRATEGIES[${id}].MULTIP`)} placeholder="Multiplicador" leftSection={<IconBrandSupabase size={20} />} />
        <TextInput {...register(`ESTRATEGIES[${id}].ODD_VALUE`)} placeholder="Valor da entrada" leftSection={<IconCoin size={20} />} />
      </SimpleGrid>
      <Center>
        <Button mt={10} color="red" onClick={() => onRemove(id)}>Remover</Button>
      </Center>
    </Paper>
  );
}
