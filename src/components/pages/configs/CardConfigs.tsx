import { IconAdjustmentsHorizontal, IconCoin, IconCoins, IconEdit, IconLock, IconPlayerPause, IconPlayerPlay, IconTrash, IconUser } from '@tabler/icons-react';
import { Card, Text, Group, Badge, Button, ActionIcon, Flex, Stack } from '@mantine/core';
import { ConfigDetails } from '../../../types/ConfigDetails';

export function CardConfigs({ user, password, strategy, start, finish, entries, result, status }: ConfigDetails) {
  return (
    <Card withBorder radius="md" p="md" bg='none'>
      <Card.Section withBorder p='sm'>
        <Group justify="flex-end" mb='sm'>
          <Badge variant="dot" color={status ? 'green' : 'red'}>{status ? 'on' : 'off'}</Badge>
        </Group>
        <Stack gap={7}>
          <Flex align='center'><IconUser size={20} /><Text fw={700} ml={5} inline>Usuário:</Text><Text inline ml={10}>{user}</Text></Flex>
          <Flex align='center'><IconLock size={20} /><Text fw={700} ml={5} inline>Senha:</Text><Text inline ml={10}>{password}</Text></Flex>
          <Flex align='center'><IconAdjustmentsHorizontal size={20} /><Text fw={700} ml={5} inline>Estrategias:</Text><Text inline ml={10}>{strategy}</Text></Flex>
          <Flex align='center'><IconPlayerPlay size={20} /><Text fw={700} ml={5} inline>Início:</Text><Text inline ml={10}>{start}</Text></Flex>
          <Flex align='center'><IconPlayerPause size={20} /><Text fw={700} ml={5} inline>Final:</Text><Text inline ml={10}>{finish}</Text></Flex>
          <Flex align='center'><IconCoin size={20} /><Text fw={700} ml={5} inline>Entradas:</Text><Text inline ml={10}>{entries}</Text></Flex>
          <Flex align='center'><IconCoins size={20} /><Text fw={700} ml={5} inline>Resultado:</Text><Text inline ml={10}>{result}</Text></Flex>
        </Stack>
      </Card.Section>
      <Group mt="md" gap={10}>
        <Button variant='filled' w='7rem' color={!status ? 'green' : 'red'} style={{ flex: 1 }}>
          {!status ? 'Iniciar' : 'Parar'}
        </Button>
        <ActionIcon variant="default" size={36}>
          <IconEdit size={20} />
        </ActionIcon>
        <ActionIcon variant="default" c='red' size={36}>
          <IconTrash size={20} />
        </ActionIcon>
      </Group>
    </Card>
  );
}