import { IconAdjustmentsHorizontal, IconCoin, IconCoins, IconEdit, IconLock, IconPlayerPause, IconPlayerPlay, IconTrash, IconUser } from '@tabler/icons-react';
import { Card, Text, Group, Badge, Button, ActionIcon, Flex, Stack, Tooltip, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ModalDeleteConfig from './modals/ModalDeleteConfig';

export function CardConfigs() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card withBorder radius="md" p="md" bg='none'>
        <Card.Section withBorder p='sm'>
          <Group justify="flex-end" mb='sm'>
            <Badge variant="dot" color={status ? 'green' : 'red'}>{status ? 'on' : 'off'}</Badge>
          </Group>
          <Stack gap={7}>
            <Flex align='center'><IconUser size={20} /><Text fw={700} ml={5} inline>Usuário:</Text><Text inline ml={10}>nome</Text></Flex>
            <Flex align='center'><IconLock size={20} /><Text fw={700} ml={5} inline>Senha:</Text><Text inline ml={10}>senha</Text></Flex>
            <Flex align='center'><IconAdjustmentsHorizontal size={20} /><Text fw={700} ml={5} inline>Estrategias:</Text><Text inline ml={10}>estrategia</Text></Flex>
            <Flex align='center'><IconPlayerPlay size={20} /><Text fw={700} ml={5} inline>Início:</Text><Text inline ml={10}>inico</Text></Flex>
            <Flex align='center'><IconPlayerPause size={20} /><Text fw={700} ml={5} inline>Final:</Text><Text inline ml={10}>final</Text></Flex>
            <Flex align='center'><IconCoin size={20} /><Text fw={700} ml={5} inline>Entradas:</Text><Text inline ml={10}>entradas</Text></Flex>
            <Flex align='center'><IconCoins size={20} /><Text fw={700} ml={5} inline>Resultado:</Text><Text inline ml={10}>result</Text></Flex>
          </Stack>
        </Card.Section>
        <Group mt="md" gap={10}>
          <Button variant='filled' w='7rem' color={!status ? 'green' : 'red'} style={{ flex: 1 }}>
            {!status ? 'Iniciar' : 'Parar'}
          </Button>
          <Tooltip label='Editar configuração'>
            <ActionIcon component='a' href={`account/${1}`} variant="default" size={36}>
              <IconEdit size={20} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label='Deletar configuração'>
            <ActionIcon onClick={open} variant="default" c='#e03131' size={36}>
              <IconTrash size={20} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Card>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }}
      >
        <ModalDeleteConfig />
      </Modal>
    </>
  );
}
