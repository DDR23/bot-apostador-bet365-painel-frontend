import { useState } from "react";
import { Paper, SimpleGrid, Stack, Text, TextInput, Button, Center, ScrollArea, Flex, Divider } from "@mantine/core";
import { IconLock, IconPlayerPause, IconPlayerPlay, IconTrophy, IconUser, IconXboxX } from "@tabler/icons-react";
import PaperStrategyTenis from "../papers/PaperStrategyTenis";
import ProviderDevice from "../../../../utils/ProviderDevice";

export default function ModalCreateConfig() {
  const { isDesktop } = ProviderDevice();
  const [strategies, setStrategies] = useState<Array<{ id: number }>>([]);

  const addStrategy = () => {
    const newStrategy = { id: Date.now() };
    setStrategies([...strategies, newStrategy]);
  };

  const removeStrategy = (id: number) => {
    setStrategies(strategies.filter(strategy => strategy.id !== id));
  };

  return (
    <form>
      <ScrollArea h='auto' scrollbarSize={4}>
        <Stack mah='63vh' gap={10}>
          <Paper withBorder px={10} py={20}>
            <Text ta="center" pb={10}>Dados da BET365 - TÊNIS</Text>
            <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={10}>
              <TextInput placeholder="Nome de usuário" leftSection={<IconUser size={20} />} />
              <TextInput placeholder="Senha" leftSection={<IconLock size={20} />} />
              <TextInput placeholder="Inicio" leftSection={<IconPlayerPlay size={20} />} />
              <TextInput placeholder="Termino" leftSection={<IconPlayerPause size={20} />} />
              <TextInput placeholder="Stop Win" leftSection={<IconTrophy size={20} />} />
              <TextInput placeholder="Stop Loss" leftSection={<IconXboxX size={20} />} />
            </SimpleGrid>
          </Paper>
          <Center><Text ta='center' inline my={5}>Configurações das estrategias</Text></Center>
          {strategies.map(strategy => (
            <PaperStrategyTenis
              key={strategy.id}
              id={strategy.id}
              onRemove={removeStrategy}
            />
          ))}
        </Stack>
      </ScrollArea>
      <Divider/>
      <Flex mt='md' justify='space-between' direction={isDesktop ? 'row' : 'column'} gap={isDesktop ? '0' : '10'}>
        <Button bottom={0} onClick={addStrategy} color="green">Adicionar Estratégia</Button>
        <Flex gap={10}>
          <Button variant="default">Importar Configurações</Button>
          <Button>Salvar</Button>
        </Flex>
      </Flex>
    </form>
  );
}
