import { ActionIcon, Badge, Button, Divider, Flex, Grid, Group, Modal, Paper, SimpleGrid, Stack, Text, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAdjustmentsHorizontal, IconCoin, IconCoins, IconEdit, IconLock, IconPlayerPause, IconPlayerPlay, IconPlus, IconTrash, IconUser } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import MenuNavigation from "../../components/_ui/MenuNavigation";
import GetSocket from "../../utils/GetSocket";
import { useEffect, useState } from "react";
import { TypeConfig } from "../../types/TypeConfig";
import ModalDeleteConfig from "../../components/pages/configs/modals/ModalDeleteConfig";
import ModalEditConfig from "../../components/pages/configs/modals/ModalEditConfig";
import ProviderInitBot from "../../middleware/ProviderInitBot";
import ProviderDevice from "../../utils/ProviderDevice";
import { TypeStrategyTenis } from "../../types/TypeStrategyTenis";
import CardStrategiesTenis from "../../components/pages/account/CardStrategiesTenis";
import ModalCreateStrategyTenis from "../../components/pages/account/modals/ModalCreateStrategyTenis";
import FormatPrice from "../../utils/FormatPrice";
import ProviderStopBot from "../../middleware/ProviderStopBot";
import ProviderNotification from "../../utils/ProviderNotification";

export default function PageAccount() {
  const socket = GetSocket();
  const { id } = useParams()
  const { isDesktop } = ProviderDevice();
  const [opened, { open, close }] = useDisclosure(false);
  const [config, setConfig] = useState<TypeConfig>();
  const [strategies, setStrategies] = useState<TypeStrategyTenis[]>([]);
  const [modalContent, setModalContent] = useState<'create' | 'edit' | 'delete' | ''>('');

  const handleOpen = (content: 'create' | 'edit' | 'delete') => {
    setModalContent(content);
    open();
  };

  useEffect(() => {
    const handleConfigGetRes = (response: { data?: TypeConfig }) => {
      const { data } = response;
      setConfig(data);
    }

    const handleStrategiesGetAllByConfigRes = (response: { data?: TypeStrategyTenis[] }) => {
      const { data } = response;
      setStrategies(data || [])
    }

    const handleStrategyPostRes = (response: { title: string, data?: TypeStrategyTenis | TypeStrategyTenis[] }) => {
      const { title, data } = response;
      if (title === 'Sucesso') {
        if (Array.isArray(data)) {
          setStrategies(data);
        } else if (data) {
          setStrategies(prevStrategies => {
            const updatedStrategies = prevStrategies.filter(strategy => strategy._id !== data._id);
            return [...updatedStrategies, data]
          });
        }
        socket.emit('CONFIG_GET', id);
      }
    }

    const handleConfigPutRes = (respose: { data?: TypeConfig }) => {
      const { data } = respose;
      if (data === undefined) return;
      setConfig(data);
    }

    const handleStrategyDelete = (response: { _id: string }) => {
      const { _id } = response;
      setStrategies(prevStrategies => {
        const updatedStrategies = prevStrategies.filter(strategy => strategy._id !== _id);
        return updatedStrategies;
      })
      socket.emit('CONFIG_GET', id);
    }

    // OUVE REPOSTA DE INÍCIO
    const handleScraperStartResOn = (response: { title: string, message: string }) => {
      const { title, message } = response;
      ProviderNotification({ title, message });
    };
    
    // OUVE RESPOSTA DE TÉRMINO
    const handleScraperStartResOff = (response: { title: string, message: string }) => {
      const { title, message } = response;
      ProviderNotification({ title, message });
    };

    // OUVE RESPOSTA DE PARADA
    const handleScraperStopRes = (response: { title: string, message: string }) => {
      const { title, message } = response;
      ProviderNotification({ title, message });
    };
    
    socket.emit('CONFIG_GET', id);
    socket.emit('STRATEGY_GETALL_BY_CONFIG', id);

    socket.on('CONFIG_GET_RES', handleConfigGetRes);
    socket.on('STRATEGY_GETALL_BY_CONFIG_RES', handleStrategiesGetAllByConfigRes);
    socket.on('STRATEGY_POST_RES', handleStrategyPostRes);
    socket.on('CONFIG_PUT_RES', handleConfigPutRes);
    socket.on('STRATEGY_DELETE_RES', handleStrategyDelete);
    socket.on('SCRAPER_START_RES_ON', handleScraperStartResOn);
    socket.on('SCRAPER_START_RES_OFF', handleScraperStartResOff);
    socket.on('SCRAPER_STOP_RES', handleScraperStopRes);
    return () => {
      socket.off('CONFIG_GET_RES', handleConfigGetRes);
      socket.off('STRATEGY_GETALL_BY_CONFIG_RES', handleStrategiesGetAllByConfigRes);
      socket.off('STRATEGY_POST_RES', handleStrategyPostRes);
      socket.off('CONFIG_PUT_RES', handleConfigPutRes);
      socket.off('STRATEGY_DELETE_RES', handleStrategyDelete);
      socket.off('SCRAPER_START_RES_ON', handleScraperStartResOn);
      socket.off('SCRAPER_START_RES_OFF', handleScraperStartResOff);
      socket.off('SCRAPER_STOP_RES', handleScraperStopRes);
    }
  }, [socket])

  const rows = strategies.map((strategy, index) => (
    <Grid.Col key={index} span={"content"}>
      <CardStrategiesTenis configStatus={config?.CONFIG_STATUS} strategy={strategy} />
    </Grid.Col>
  ));

  return (
    <>
      <Stack h="100%" mih='100vh' m='auto' justify="center" align="center" px={20} pt={80} gap={0}>
        <Paper pos='fixed' top={0} withBorder w='100vw' p='md' style={{ zIndex: '100', backgroundColor: 'Background' }}>
          <MenuNavigation />
        </Paper>
        <Paper withBorder p='sm' w='90vw' style={{ backgroundColor: 'Background' }}>
          <Stack gap='sm'>
            <Paper p='md'>
              <Group justify="space-between" mb='sm'>
                <Text fz='xs' c='dimmed'>ID: {config?._id}</Text>
                <Badge variant="dot" color={config?.CONFIG_STATUS ? 'green' : 'red'}>{config?.CONFIG_STATUS ? 'On' : 'Off'}</Badge>
              </Group>
              <SimpleGrid cols={{ base: 1, xs: 2 }} spacing='sm'>
                <Flex align='center'><IconUser size={20} /><Text fw={700} ml={5} inline>Usuário:</Text><Text inline ml={10}>{config?.CONFIG_USER}</Text></Flex>
                <Flex align='center'><IconLock size={20} /><Text fw={700} ml={5} inline>Senha:</Text><Text inline ml={10}>{config?.CONFIG_PASSWORD}</Text></Flex>
                <Flex align='center'><IconPlayerPlay size={20} /><Text fw={700} ml={5} inline>Início:</Text><Text inline ml={10}>{config?.CONFIG_TIME_START}</Text></Flex>
                <Flex align='center'><IconPlayerPause size={20} /><Text fw={700} ml={5} inline>Final:</Text><Text inline ml={10}>{config?.CONFIG_TIME_FINISH}</Text></Flex>
              </SimpleGrid>
              <Divider my='md' />
              <Group mt="md" gap={10}>
                <Button variant='filled' w='7rem' color={!config?.CONFIG_STATUS ? 'green' : 'red'} style={{ flex: 1 }} onClick={() => {
                  !config?.CONFIG_STATUS ? ProviderInitBot(config!) : ProviderStopBot(config!)
                }}>
                  {!config?.CONFIG_STATUS ? 'Iniciar' : 'Parar'}
                </Button>
                <Tooltip color="dimmed" label='Editar configuração'>
                  <ActionIcon disabled={config?.CONFIG_STATUS} onClick={() => handleOpen('edit')} variant="default" size={36}>
                    <IconEdit size={20} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip color="dimmed" label='Deletar configuração'>
                  <ActionIcon disabled={config?.CONFIG_STATUS} onClick={() => handleOpen('delete')} variant="default" c={config?.CONFIG_STATUS ? '#e0313150' : '#e03131'} size={36}>
                    <IconTrash size={20} />
                  </ActionIcon>
                </Tooltip>
              </Group>
              <SimpleGrid cols={{ base: 1, xs: 3 }} spacing='sm'>
              </SimpleGrid>
            </Paper>
            <Paper p='md'>
              <SimpleGrid cols={{ base: 1, xs: 3 }} spacing='sm'>
                <Flex align='center'><IconAdjustmentsHorizontal size={20} /><Text fw={700} ml={5} inline>Estrategias:</Text><Text inline ml={10}>{config?.CONFIG_STRATEGIES.length}</Text></Flex>
                <Flex align='center'><IconCoin size={20} /><Text fw={700} ml={5} inline>Entradas:</Text><Text inline ml={10}>{FormatPrice(config?.CONFIG_ENTRIES)}</Text></Flex>
                <Flex align='center'><IconCoins size={20} /><Text fw={700} ml={5} inline>Resultado:</Text><Text inline ml={10}>{FormatPrice(config?.CONFIG_RESULT)}</Text></Flex>
              </SimpleGrid>
            </Paper>
          </Stack>
        </Paper>
        <Flex flex={1} py='md'>
          <Grid justify="center" >
            {strategies.length > 0 ? rows : ''}
            <Grid.Col span={"content"}>
              <Button variant="default" type="button" onClick={() => handleOpen('create')} radius="md" w={isDesktop ? '238' : '90vw'} h={isDesktop ? '309' : '120'}>
                <Stack w='100%' h='100%' justify="center" align="center" gap={0}>
                  <IconPlus size={50} stroke={1.5} />
                  <Text fw={700}>Nova estratégia</Text>
                </Stack>
              </Button>
            </Grid.Col>
          </Grid>
        </Flex>
      </Stack>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={modalContent !== 'delete'}
        title={modalContent === 'edit' ? 'Editar dados da BET365 - TÊNIS' : modalContent === 'create' ? 'Adicionar estratégia BET365 - TÊNIS' : ''}
        size='auto'
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}
      >
        {modalContent === 'create' && <ModalCreateStrategyTenis configId={id} onClose={close} />}
        {modalContent === 'edit' && <ModalEditConfig configId={id} onClose={close} />}
        {modalContent === 'delete' && <ModalDeleteConfig configId={id} onClose={close} />}
      </Modal>
    </>
  );
}
