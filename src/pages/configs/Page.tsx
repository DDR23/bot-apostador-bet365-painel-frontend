import { Button, Flex, Grid, Modal, Paper, Stack, Text } from "@mantine/core";
// import { CardConfigs } from "../../components/pages/configs/CardConfigs";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ModalCreateConfig from "../../components/pages/configs/modals/ModalCreateConfig";

export default function PageConfigs() {
  const [opened, { open, close }] = useDisclosure(false);

  // const rows = mockCardConfigs?.map((row, index) => (
  //   <Grid.Col key={index} span={"content"}>
  //     <CardConfigs />
  //   </Grid.Col>
  // ));

  return (
    <>
      <Stack h="100%" m='auto' justify="center" align="center" px={20} py={80}>
        <Grid justify="center">
          {/* {rows} */}
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
          <Flex justify='center' gap='md' p='sm'>
            <Button bg='green' >Iniciar todos</Button>
            <Button bg='red' >Parar todos</Button>
          </Flex>
        </Paper>
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        size='auto'
        title='Dados da BET365 - TÊNIS'
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}
      >
        <ModalCreateConfig onClose={close} />
      </Modal>
    </>
  );
}
