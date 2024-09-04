import { ActionIcon, Badge, Button, Center, Divider, Flex, Grid, Group, Modal, Paper, SimpleGrid, Stack, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAdjustmentsHorizontal, IconCoin, IconCoins, IconEdit, IconLock, IconPlayerPause, IconPlayerPlay, IconPlus, IconTrash, IconUser } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import MenuNavigation from "../../components/_ui/MenuNavigation";
import GetSocket from "../../utils/GetSocket";
import { useEffect, useState } from "react";
import { TypeConfig } from "../../types/TypeConfig";
import ModalDeleteConfig from "../../components/pages/configs/modals/ModalDeleteConfig";
import ModalEditConfig from "../../components/pages/configs/modals/ModalEditConfig";

export default function PageAccount() {
  const socket = GetSocket();
  const { id } = useParams()
  const [opened, { open, close }] = useDisclosure(false);
  const [config, setConfig] = useState<TypeConfig>();
  const [modalContent, setModalContent] = useState<'edit' | 'delete' | ''>('');

  const handleOpen = (content: 'edit' | 'delete') => {
    setModalContent(content);
    open();
  };
  console.log(config)

  useEffect(() => {
    const handleConfigGet = (response: { data?: TypeConfig }) => {
      const { data } = response;
      setConfig(data);
    }

    socket.emit('CONFIG_GET', id);
    socket.on('CONFIG_GET_RES', handleConfigGet);
    return () => {
      socket.off('CONFIG_GET_RES', handleConfigGet)
    }
  }, [socket])


  // const rows = configs.map((config, index) => (
  //   <Grid.Col key={index} span={"content"}>
  //     <CardConfigs config={config} />
  //   </Grid.Col>
  // ));

  return (
    <>
      <Stack h="100%" mih='100vh' m='auto' justify="center" align="center" px={20} py={80}>
        <Paper pos='fixed' top={0} withBorder w='100vw' p='md' style={{ zIndex: '100', backgroundColor: 'Background' }}>
          <MenuNavigation />
        </Paper>
        <Paper withBorder p='md' w='90vw' style={{ backgroundColor: 'Background' }}>
          <Stack gap='sm'>
            <Paper p='md'>
              <Group justify="flex-end" mb='sm'>
                <Badge variant="dot" color='green'>on</Badge>
              </Group>
              <SimpleGrid cols={{ base: 1, xs: 2 }} spacing='sm'>
                <Flex align='center'><IconUser size={20} /><Text fw={700} ml={5} inline>Usuário:</Text><Text inline ml={10}>{config?.CONFIG_USER}</Text></Flex>
                <Flex align='center'><IconLock size={20} /><Text fw={700} ml={5} inline>Senha:</Text><Text inline ml={10}>{config?.CONFIG_PASSWORD}</Text></Flex>
                <Flex align='center'><IconPlayerPlay size={20} /><Text fw={700} ml={5} inline>Início:</Text><Text inline ml={10}>{config?.CONFIG_TIME_START}</Text></Flex>
                <Flex align='center'><IconPlayerPause size={20} /><Text fw={700} ml={5} inline>Final:</Text><Text inline ml={10}>{config?.CONFIG_TIME_FINISH}</Text></Flex>
              </SimpleGrid>
              <Divider my='md' />
              <Group mt="md" gap={10}>
                <Button variant='filled' w='7rem' color='green' style={{ flex: 1 }}>
                  {!config?.CONFIG_STATUS ? 'Iniciar' : 'Parar'}
                </Button>
                <Tooltip color="dimmed" label='Editar configuração'>
                  <ActionIcon onClick={() => handleOpen('edit')} variant="default" size={36}>
                    <IconEdit size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip color="dimmed" label='Deletar configuração'>
                  <ActionIcon onClick={() => handleOpen('delete')} variant="default" c='#e03131' size={36}>
                    <IconTrash size={20} />
                  </ActionIcon>
                </Tooltip>
              </Group>
              <SimpleGrid cols={{ base: 1, xs: 3 }} spacing='sm'>
              </SimpleGrid>
            </Paper>
            <Paper p='md'>
              <SimpleGrid cols={{ base: 1, xs: 3 }} spacing='sm'>
                <Flex align='center'><IconAdjustmentsHorizontal size={20} /><Text fw={700} ml={5} inline>Estrategias:</Text><Text inline ml={10}>{config?.CONFIG_STRATEGIES?.length}</Text></Flex>
                <Flex align='center'><IconCoin size={20} /><Text fw={700} ml={5} inline>Entradas:</Text><Text inline ml={10}>{config?.CONFIG_ENTRIES}</Text></Flex>
                <Flex align='center'><IconCoins size={20} /><Text fw={700} ml={5} inline>Resultado:</Text><Text inline ml={10}>{config?.CONFIG_RESULT}</Text></Flex>
              </SimpleGrid>
            </Paper>
          </Stack>
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
        <Paper pos='fixed' bottom={0} withBorder w='100vw' style={{ backgroundColor: 'Background' }}>
          <Flex justify='center' gap='md' p='sm'>
            <Button>Iniciar</Button>
            <Button bg='red'>Parar</Button>
          </Flex>
        </Paper>
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={modalContent === 'edit'}
        title={modalContent === 'edit' ? 'Editar dados da BET365 - TÊNIS' : ''}
        size='auto'
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}
      >
        {modalContent === 'edit' && <ModalEditConfig onClose={close} />}
        {modalContent === 'delete' && <ModalDeleteConfig configId={id} onClose={close} />}
      </Modal>
    </>
  );
}
