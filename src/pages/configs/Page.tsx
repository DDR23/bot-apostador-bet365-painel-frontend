import { Button, Flex, Grid, Modal, Paper, Stack, Text } from "@mantine/core";
import { CardConfigs } from "../../components/pages/configs/CardConfigs";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ModalCreateConfig from "../../components/pages/configs/modals/ModalCreateConfig";

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
];


export default function PageConfigs() {
  const [opened, { open, close }] = useDisclosure(false);

  const rows = mockCardConfigs?.map((row, index) => (
    <Grid.Col key={index} span={"content"}>
      <CardConfigs user={row.user} password={row.password} strategy={row.strategy} start={row.start} finish={row.finish} entries={row.entries} result={row.result} status={row.status} />
    </Grid.Col>
  ));

  return (
    <>
      <Stack h="100%" m='auto' justify="center" align="center" p={20}>
        <Grid justify="center" pb={80}>
          {rows}
          <Grid.Col span={"content"}>
            <Button variant="default" type="button" onClick={open} radius="md" w={238} h={309}>
              <Stack w='100%' h='100%' justify="center" align="center" gap={0}>
                <IconPlus size={50} stroke={1.5} />
                <Text fw={700}>Adicionar novo</Text>
              </Stack>
            </Button>
          </Grid.Col>
        </Grid>
        <Paper pos='fixed' bottom={0} withBorder w='100vw'>
          <Flex justify='center' gap={15} p={20}>
            <Button bg='green' >Iniciar todos</Button>
            <Button bg='red' >Parar todos</Button>
          </Flex>
        </Paper>
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        size='auto'
        title='Configurações'
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}
      >
        <ModalCreateConfig />
      </Modal>
    </>
  );
}
