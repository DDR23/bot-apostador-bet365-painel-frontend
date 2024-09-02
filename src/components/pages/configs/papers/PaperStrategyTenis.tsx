import { Button, Center, NumberInput, Paper, SimpleGrid } from "@mantine/core";
import { IconBrandSupabase, IconCoin, IconPingPong, IconScoreboard } from "@tabler/icons-react";
import { Controller } from "react-hook-form";

interface Props {
  id: number;
  control: any;
  errors: any;
  onRemove: (id: number) => void;
}

export default function PaperStrategyTenis({ id, control, errors, onRemove }: Props) {
  return (
    <Paper withBorder p={10}>
      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={10}>
        <Controller
          name={`ESTRATEGIES[${id}].DIFF_SET`}
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              placeholder="Diferença de set"
              allowDecimal={false}
              min={0}
              leftSection={<IconScoreboard size={20} />}
            />
          )}
        />
        <Controller
          name={`ESTRATEGIES[${id}].DIFF_POINT`}
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              placeholder="Diferença de pontos"
              allowDecimal={false}
              min={0}
              leftSection={<IconPingPong size={20} />}
            />
          )}
        />
        <Controller
          name={`ESTRATEGIES[${id}].MULTIP`}
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              placeholder="Multiplicador"
              min={1}
              decimalScale={2}
              leftSection={<IconBrandSupabase size={20} />}
              error={errors?.ESTRATEGIES?.[id]?.MULTIP?.message ? 'Multiplicador é obrigatório': ''}
            />
          )}
        />
        <Controller
          name={`ESTRATEGIES[${id}].ODD_VALUE`}
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              placeholder="Valor da entrada"
              allowDecimal={false}
              min={1}
              leftSection={<IconCoin size={20} />}
              error={errors?.ESTRATEGIES?.[id]?.ODD_VALUE?.message ? 'Valor da entrada é obrigatório' : ''}
            />
          )}
        />
      </SimpleGrid>
      <Center>
        <Button mt={10} color="red" onClick={() => onRemove(id)}>Remover</Button>
      </Center>
    </Paper>
  );
}
