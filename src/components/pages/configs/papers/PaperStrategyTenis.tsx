import { Button, Center, Paper, SimpleGrid, TextInput } from "@mantine/core";
import { IconBrandSupabase, IconCoin, IconPingPong, IconScoreboard } from "@tabler/icons-react";

interface PaperStrategyTenisProps {
  id: number;
  onRemove: (id: number) => void;
}

export default function PaperStrategyTenis({ id, onRemove }: PaperStrategyTenisProps) {
  return (
    <Paper withBorder p={10}>
      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={10}>
        <TextInput placeholder="Diferença de set" leftSection={<IconScoreboard size={20} />} />
        <TextInput placeholder="Diferença de pontos" leftSection={<IconPingPong size={20} />} />
        <TextInput placeholder="Multiplicador" leftSection={<IconBrandSupabase size={20} />} />
        <TextInput placeholder="Valor da entrada" leftSection={<IconCoin size={20} />} />
      </SimpleGrid>
      <Center>
        <Button mt={10} color="red" onClick={() => onRemove(id)}>Remover</Button>
      </Center>
    </Paper>
  );
}
