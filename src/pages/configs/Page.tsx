import { Button, Grid, Stack, Text } from "@mantine/core";
import { CardConfigs } from "../../components/pages/configs/CardConfigs";
import { IconPlus } from "@tabler/icons-react";

// mockCardConfigs.js
export const mockCardConfigs = [
  {
    user: 'andre',
    password: '129312',
    strategy: 1,
    start: '12:32',
    finish: '13:32',
    entries: 1,
    result: 0,
    status: false,
  },
  {
    user: 'maria',
    password: 'abc123',
    strategy: 2,
    start: '10:00',
    finish: '11:00',
    entries: 2,
    result: 1,
    status: false,
  },
  {
    user: 'joao',
    password: 'secure456',
    strategy: 3,
    start: '09:15',
    finish: '10:15',
    entries: 3,
    result: 2,
    status: true,
  },
  {
    user: 'ana',
    password: 'pass789',
    strategy: 1,
    start: '14:00',
    finish: '15:00',
    entries: 1,
    result: 0,
    status: false,
  },
];

const rows = mockCardConfigs.map((row, index) => (
  <Grid.Col key={index} span={"content"}>
    <CardConfigs user={row.user} password={row.password} strategy={row.strategy} start={row.start} finish={row.finish} entries={row.entries} result={row.result} status={row.status} />
  </Grid.Col>
))

export default function PageConfigs() {
  return (
    <Stack h="100%" w='98vw' m='auto' justify="center" align="center" py={20}>
      <Grid justify="center">
        {rows}
        <Grid.Col span={"content"}>
          <Button variant="default" type="button" onClick={() => console.log('adicionar novo')} radius="md" w={238} h={309}>
            <Stack w='100%' h='100%' justify="center" align="center" gap={0}>
              <IconPlus size={50} stroke={1.5} />
              <Text fw={700}>Adicionar novo</Text>
            </Stack>
          </Button>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
