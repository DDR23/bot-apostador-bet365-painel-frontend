import { IconAdjustmentsHorizontal, IconCoin, IconCoins, IconLock, IconPlayerPause, IconPlayerPlay, IconReceipt, IconTrash, IconUser } from '@tabler/icons-react';
import { Card, Text, Group, Badge, Button, ActionIcon, Flex, Stack, Tooltip, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ModalDeleteConfig from './modals/ModalDeleteConfig';
import { TypeConfig } from '../../../types/TypeConfig';
import ProviderInitBot from '../../../utils/ProviderInitBot';
import ProviderDevice from '../../../utils/ProviderDevice';
import FormatPrice from '../../../utils/FormatPrice';
import ProviderStopBot from '../../../utils/ProviderStopBot';

interface Props {
  config: TypeConfig;
}

export function CardConfigs({ config }: Props) {
  const { isDesktop } = ProviderDevice();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card withBorder radius="md" p="md" bg='none' w={isDesktop ? '238' : '90vw'}>
        <Card.Section withBorder p='sm'>
          <Group justify="flex-end" mb='sm'>
            <Badge variant="dot" color={config.CONFIG_STATUS ? 'green' : 'red'}>{config.CONFIG_STATUS ? 'on' : 'off'}</Badge>
          </Group>
          <Stack gap={7}>
            <Flex align='center'><IconUser size={20} /><Text fw={700} ml={5} inline>Usuário:</Text><Text inline ml={10}>{config.CONFIG_USER}</Text></Flex>
            <Flex align='center'><IconLock size={20} /><Text fw={700} ml={5} inline>Senha:</Text><Text inline ml={10}>{config.CONFIG_PASSWORD}</Text></Flex>
            <Flex align='center'><IconAdjustmentsHorizontal size={20} /><Text fw={700} ml={5} inline>Estrategias:</Text><Text inline ml={10}>{config.CONFIG_STRATEGIES.length}</Text></Flex>
            <Flex align='center'><IconPlayerPlay size={20} /><Text fw={700} ml={5} inline>Início:</Text><Text inline ml={10}>{config.CONFIG_TIME_START}</Text></Flex>
            <Flex align='center'><IconPlayerPause size={20} /><Text fw={700} ml={5} inline>Final:</Text><Text inline ml={10}>{config.CONFIG_TIME_FINISH}</Text></Flex>
            <Flex align='center'><IconCoin size={20} /><Text fw={700} ml={5} inline>Entradas:</Text><Text inline ml={10}>{FormatPrice(config.CONFIG_ENTRIES)}</Text></Flex>
            <Flex align='center'><IconCoins size={20} /><Text fw={700} ml={5} inline>Resultado:</Text><Text inline ml={10}>{FormatPrice(config.CONFIG_RESULT)}</Text></Flex>
          </Stack>
        </Card.Section>
        <Group mt="md" gap={10}>
          <Button variant='filled' w='7rem' color={!config.CONFIG_STATUS ? 'green' : 'red'} style={{ flex: 1 }} onClick={() => {
                  !config?.CONFIG_STATUS ? ProviderInitBot(config!) : ProviderStopBot(config!)
                }}>
            {!config.CONFIG_STATUS ? 'Iniciar' : 'Parar'}
          </Button>
          <Tooltip color="dimmed" label='Detalhes da configuração'>
            <ActionIcon component='a' href={`account/${config._id}`} variant="default" size={36}>
              <IconReceipt size={20} />
            </ActionIcon>
          </Tooltip>
          <Tooltip color="dimmed" label='Deletar configuração'>
            <ActionIcon disabled={config.CONFIG_STATUS} onClick={open} variant="default" c={config.CONFIG_STATUS ? '#e0313150' : '#e03131'} size={36}>
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
        <ModalDeleteConfig configId={config._id} onClose={close} />
      </Modal>
    </>
  );
}
