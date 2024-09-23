import { Button, Flex, Grid, Modal, Paper, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ModalCreateConfig from "../../components/pages/configs/modals/ModalCreateConfig";
import { useEffect, useState } from "react";
import GetSocket from "../../utils/GetSocket";
import { TypeConfig } from "../../types/TypeConfig";
import { CardConfigs } from "../../components/pages/configs/CardConfigs";
import ProviderDevice from "../../utils/ProviderDevice";
import ProviderNotification from "../../utils/ProviderNotification";

export default function PageConfigs() {
  const socket = GetSocket();
  const { isDesktop } = ProviderDevice();
  const [opened, { open, close }] = useDisclosure(false);
  const [configs, setConfigs] = useState<TypeConfig[]>([]);

  useEffect(() => {
    const handleConfigsGetAllRes = (response: { data?: TypeConfig[] }) => {
      const { data } = response;
      setConfigs(data || []);
    };

    const handleConfigPostRes = (response: { title: string, data?: TypeConfig | TypeConfig[] }) => {
      const { title, data } = response;
      if (title === 'Sucesso') {
        if (Array.isArray(data)) {
          setConfigs(data);
        } else if (data) {
          setConfigs(prevConfigs => {
            const updatedConfigs = prevConfigs.filter(config => config._id !== data._id);
            return [...updatedConfigs, data];
          });
        }
      }
    };

    const handleConfigPutRes = (response: { data?: TypeConfig }) => {
      const { data } = response;
      console.log(data)
      if (data) {
        setConfigs(prevConfigs =>
          prevConfigs.map(config =>
            config._id === data._id ? data : config
          )
        );
      }
    };

    const handleConfigDeleteRes = (response: { id: string }) => {
      const { id } = response;
      setConfigs(prevConfigs => {
        const updatedConfigs = prevConfigs.filter(config => config._id !== id);
        return updatedConfigs;
      });
    };

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

    socket.emit('CONFIG_GETALL');

    socket.on('CONFIG_GETALL_RES', handleConfigsGetAllRes);
    socket.on('CONFIG_POST_RES', handleConfigPostRes);
    socket.on('CONFIG_PUT_RES', handleConfigPutRes);
    socket.on('CONFIG_DELETE_RES', handleConfigDeleteRes);
    socket.on('SCRAPER_START_RES_ON', handleScraperStartResOn);
    socket.on('SCRAPER_START_RES_OFF', handleScraperStartResOff);
    socket.on('SCRAPER_STOP_RES', handleScraperStopRes);

    return () => {
      socket.off('CONFIG_GETALL_RES', handleConfigsGetAllRes);
      socket.off('CONFIG_POST_RES', handleConfigPostRes);
      socket.off('CONFIG_PUT_RES', handleConfigPutRes);
      socket.off('CONFIG_DELETE_RES', handleConfigDeleteRes);
      socket.off('SCRAPER_START_RES_ON', handleScraperStartResOn);
      socket.off('SCRAPER_START_RES_OFF', handleScraperStartResOff);
      socket.off('SCRAPER_STOP_RES', handleScraperStopRes);
    };
  }, [socket]);

  const rows = configs.map((config, index) => (
    <Grid.Col key={index} span={"content"}>
      <CardConfigs config={config} />
    </Grid.Col>
  ));

  return (
    <>
      <Stack h="100%" m='auto' justify="center" align="center" px={20} py={80}>
        <Grid justify="center">
          {configs.length > 0 ? rows : ''}
          <Grid.Col span={"content"}>
            <Button variant="default" type="button" onClick={open} radius="md" w={isDesktop ? '238' : '90vw'} h={isDesktop ? '309' : '120'}>
              <Stack w='100%' h='100%' justify="center" align="center" gap={0}>
                <IconPlus size={50} stroke={1.5} />
                <Text fw={700}>Nova Configuração</Text>
              </Stack>
            </Button>
          </Grid.Col>
        </Grid>
        <Paper pos='fixed' bottom={0} withBorder w='100vw' style={{ backgroundColor: 'Background' }}>
          <Flex justify='center' gap='md' p='sm'>
            <Button>Iniciar todos</Button>
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
        <ModalCreateConfig onClose={close} />
      </Modal>
    </>
  );
}
