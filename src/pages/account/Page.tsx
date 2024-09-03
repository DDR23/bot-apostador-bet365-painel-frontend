import { Button, Center, Flex, Grid, Modal, Paper, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import MenuNavigation from "../../components/_ui/MenuNavigation";

export default function PageAccount() {
  const configId = useParams()
  const [opened, { open, close }] = useDisclosure(false);
  console.log(configId)

  // const rows = configs.map((config, index) => (
  //   <Grid.Col key={index} span={"content"}>
  //     <CardConfigs config={config} />
  //   </Grid.Col>
  // ));

  return (
    <>
      <Stack h="100%" mih='100vh' m='auto' justify="center" align="center" px={20} py={80}>
        <Paper pos='fixed' top={0} withBorder w='100vw' p='md' style={{ zIndex: '100' }}>
          <MenuNavigation />
        </Paper>
        <Paper withBorder w='80vw' p='md'>
          informações da config
        </Paper>
        <Center flex={1}>
          <Grid justify="center" >
            {/* {configs.length > 0 ? rows : ''} */}
            <Grid.Col span={"content"}>
              <Button variant="default" type="button" onClick={open} radius="md" w={238} h={309}>
                <Stack w='100%' h='100%' justify="center" align="center" gap={0}>
                  <IconPlus size={50} stroke={1.5} />
                  <Text fw={700}>Nova estratégia</Text>
                </Stack>
              </Button>
            </Grid.Col>
          </Grid>
        </Center>
        <Paper pos='fixed' bottom={0} withBorder w='100vw'>
          <Flex justify='center' gap='md' p='sm'>
            <Button >Iniciar todos</Button>
            <Button bg='red'>Parar todos</Button>
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
        {/* <ModalCreateConfig onClose={close} /> */}
      </Modal>
    </>
  );
}
