import { ActionIcon, Card, Divider, Flex, Group, Modal, SimpleGrid, Stack, Text, Tooltip } from "@mantine/core";
import { TypeStrategyTenis } from "../../../types/TypeStrategyTenis";
import { IconTrash } from "@tabler/icons-react";
import ProviderDevice from "../../../utils/ProviderDevice";
import { useDisclosure } from "@mantine/hooks";
import ModalDeleteStrategyTenis from "./modals/ModalDeleteStrategyTenis";
import FormatPrice from "../../../utils/FormatPrice";

interface Props {
  configStatus?: boolean;
  strategy: TypeStrategyTenis
}

export default function CardStrategiesTenis({ configStatus, strategy }: Props) {
  const { isDesktop } = ProviderDevice();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card withBorder radius="md" p="md" bg='none' w={isDesktop ? '350' : '90vw'}>
        <Card.Section withBorder p='sm'>
          <Stack gap={7}>
            {strategy.STRATEGY_DIFF_SET_TYPE === 'diff' ? (
              <>
                <Text size="xs" c='dimmed'>Set: DIFERENÇA</Text>
                <Flex align='center'><Text fw={700} ml={5} c='dimmed' size="sm" inline>Set:</Text><Text inline ml={10}>{strategy.STRATEGY_DIFF_SET}</Text></Flex>
              </>
            ) : strategy.STRATEGY_DIFF_SET_TYPE === 'exato' && (
              <>
                <Text size="xs" c='dimmed'>Set: EXATO</Text>
                <SimpleGrid cols={{ base: 2 }}>
                  <Flex align='center'><Text fw={700} ml={5} c='dimmed' size="sm" inline>Jogador 1:</Text><Text inline ml={10}>{strategy.STRATEGY_DIFF_SET_PLAYER1}</Text></Flex>
                  <Flex align='center'><Text fw={700} ml={5} c='dimmed' size="sm" inline>Jogador 2:</Text><Text inline ml={10}>{strategy.STRATEGY_DIFF_SET_PLAYER2}</Text></Flex>
                </SimpleGrid>
              </>
            )}
            <Divider />
            {strategy.STRATEGY_DIFF_POINT_TYPE === 'diff' ? (
              <>
                <Text size="xs" c='dimmed'>Pontos: DIFERENÇA</Text>
                <Flex align='center'><Text fw={700} ml={5} c='dimmed' size="sm" inline>Pontos:</Text><Text inline ml={10}>{strategy.STRATEGY_DIFF_POINT}</Text></Flex>
              </>
            ) : strategy.STRATEGY_DIFF_POINT_TYPE === 'exato' && (
              <>
                <Text size="xs" c='dimmed'>Pontos: EXATO</Text>
                <SimpleGrid cols={{ base: 2 }}>
                  <Flex align='center'><Text fw={700} ml={5} c='dimmed' size="sm" inline>Jogador 1:</Text><Text inline ml={10}>{strategy.STRATEGY_DIFF_POINT_PLAYER1}</Text></Flex>
                  <Flex align='center'><Text fw={700} ml={5} c='dimmed' size="sm" inline>Jogador 2:</Text><Text inline ml={10}>{strategy.STRATEGY_DIFF_POINT_PLAYER2}</Text></Flex>
                </SimpleGrid>
              </>
            )}
            <Divider />
            <Text size="xs" c='dimmed'>ODD e valor da entrada</Text>
            <SimpleGrid cols={{ base: 2 }}>
              <Flex align='center'><Text fw={700} ml={5} c='dimmed' size="sm" inline>ODD:</Text><Text inline ml={10}>{strategy.STRATEGY_MULTIPLIER}</Text></Flex>
              <Flex align='center'><Text fw={700} ml={5} c='dimmed' size="sm" inline>Entrada:</Text><Text inline ml={10}>{FormatPrice(strategy.STRATEGY_ENTRY_VALUE)}</Text></Flex>
            </SimpleGrid>
            <Divider />
            <Text size="xs" c='dimmed'>Stops</Text>
            <SimpleGrid cols={{ base: 2 }}>
              <Flex align='center'><Text fw={700} ml={5} c='dimmed' size="sm" inline>Loss:</Text><Text inline ml={10}>{strategy.STRATEGY_STOP ? `${strategy.STRATEGY_STOP_LOSS}%` : '---'}</Text></Flex>
              <Flex align='center'><Text fw={700} ml={5} c='dimmed' size="sm" inline>Win:</Text><Text inline ml={10}>{strategy.STRATEGY_STOP ? `${strategy.STRATEGY_STOP_WIN}%` : '---'}</Text></Flex>
            </SimpleGrid>
          </Stack>
        </Card.Section>
        <Group mt="md" gap={10} justify="flex-end">
          <Tooltip color="dimmed" label='Deletar estrategia'>
            <ActionIcon disabled={configStatus} onClick={open} variant="default" c={configStatus ? '#e0313150' : '#e03131'} size={36}>
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
        <ModalDeleteStrategyTenis strategy={strategy} onClose={close} />
      </Modal>
    </>
  );
}
