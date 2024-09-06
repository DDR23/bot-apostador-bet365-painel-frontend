import { Button, Flex, NumberInput, Overlay, Paper, SegmentedControl, SimpleGrid, Stack, Switch, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TypeStrategyTenisCreate } from "../../../../types/TypeStrategyTenis";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaStrategyTenisCreate } from "../../../../schemas/SchemaStrategyTenis";
import GetSocket from "../../../../utils/GetSocket";
import ProviderNotification from "../../../../utils/ProviderNotification";
import { IconBrandSupabase, IconCoin, IconPingPong, IconScoreboard } from "@tabler/icons-react";
import ProviderDevice from "../../../../utils/ProviderDevice";

interface Props {
  configId?: string;
  onClose: () => void;
}

export default function ModalCreateStrategy({ configId, onClose }: Props) {
  const socket = GetSocket();
  const { isDesktop } = ProviderDevice();
  const [isLoading, setIsLoading] = useState(false);
  const [isSetContent, setIsSetContent] = useState<'diff' | 'exato'>('diff')
  const [isPointContent, setIsPointContent] = useState<'diff' | 'exato'>('diff')
  const [stopVisible, setStopVisible] = useState(true);
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<TypeStrategyTenisCreate>({
    mode: 'onChange',
    resolver: yupResolver(SchemaStrategyTenisCreate),
    defaultValues: {
      STRATEGY_DIFF_SET_TYPE: 'diff',
      // STRATEGY_DIFF_SET: 0,
      // STRATEGY_DIFF_SET_PLAYER1: 0,
      // STRATEGY_DIFF_SET_PLAYER2: 0,
      STRATEGY_DIFF_POINT_TYPE: 'diff',
      // STRATEGY_DIFF_POINT: 0,
      // STRATEGY_DIFF_POINT_PLAYER1: 0,
      // STRATEGY_DIFF_POINT_PLAYER2: 0,
      // STRATEGY_MULTIPLIER: 0,
      // STRATEGY_STOP: false,
      // STRATEGY_STOP_WIN: 0,
      // STRATEGY_STOP_LOSS: 0,
    }
  });

  useEffect(() => {
    const handleConfigCreated = (response: { title: string, message: string }) => {
      const { title, message } = response;
      ProviderNotification({ title, message });
      if (title !== 'Erro') onClose();
      setIsLoading(false);
    };

    socket.on('CONFIG_POST_RES', handleConfigCreated);
    return () => {
      socket.off('CONFIG_POST_RES', handleConfigCreated);
    };
  }, [socket]);

  const onSubmit = (data: TypeStrategyTenisCreate) => {
    setIsLoading(true);
    const updatedData = {
      ...data,
      STRATEGY_CONFIG: configId
    }
    console.log(updatedData)
    // socket.emit('CONFIG_POST', data);
  };

  const setDiffContent = () => {
    return (
      <Controller
        name={'STRATEGY_DIFF_SET'}
        control={control}
        render={({ field }) => (
          <NumberInput
            {...field}
            placeholder="Diferença de set"
            allowDecimal={false}
            min={0}
            max={2}
            leftSection={<IconScoreboard size={20} />}
          />
        )}
      />
    );
  };

  const setExatoContent = () => {
    return (
      <SimpleGrid cols={{ base: 2 }} spacing={10}>
        <Controller
          name={'STRATEGY_DIFF_SET_PLAYER1'}
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              placeholder="Player 1"
              allowDecimal={false}
              min={0}
              max={2}
              leftSection={<IconScoreboard size={20} />}
            />
          )}
        />
        <Controller
          name={'STRATEGY_DIFF_SET_PLAYER2'}
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              placeholder="Player 2"
              allowDecimal={false}
              min={0}
              max={2}
              leftSection={<IconScoreboard size={20} />}
            />
          )}
        />
      </SimpleGrid>
    );
  };

  const pointDiffContent = () => {
    return (
      <Controller
        name={'STRATEGY_DIFF_POINT'}
        control={control}
        render={({ field }) => (
          <NumberInput
            {...field}
            placeholder="Diferença de ponto"
            allowDecimal={false}
            min={0}
            max={10}
            leftSection={<IconPingPong size={20} />}
          />
        )}
      />
    );
  };

  const pointExatoContent = () => {
    return (
      <SimpleGrid cols={{ base: 2 }} spacing={10}>
        <Controller
          name={'STRATEGY_DIFF_POINT_PLAYER1'}
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              placeholder="Player 1"
              allowDecimal={false}
              min={0}
              max={30}
              leftSection={<IconPingPong size={20} />}
            />
          )}
        />
        <Controller
          name={'STRATEGY_DIFF_POINT_PLAYER2'}
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              placeholder="Player 2"
              allowDecimal={false}
              min={0}
              max={30}
              leftSection={<IconPingPong size={20} />}
            />
          )}
        />
      </SimpleGrid>
    );
  };

  const stopContent = () => {
    return (
      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={10} pos='static' mt='xs'>
        <Controller
          name={'STRATEGY_DIFF_POINT_PLAYER1'}
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              placeholder="Player 1"
              allowDecimal={false}
              min={0}
              max={30}
              leftSection={<IconPingPong size={20} />}
            />
          )}
        />
        <Controller
          name={'STRATEGY_DIFF_POINT_PLAYER2'}
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              placeholder="Player 2"
              allowDecimal={false}
              min={0}
              max={30}
              leftSection={<IconPingPong size={20} />}
            />
          )}
        />
      </SimpleGrid>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={10}>

        {/* SET */}
        <Paper withBorder p='xs' maw={280}>
          <Stack gap='xs'>
            <Text size="xs" c='dimmed' fw={900}>SET</Text>
            <SegmentedControl
              withItemsBorders={false}
              color="green"
              size="xs"
              value={isSetContent}
              onChange={(value) => {
                setIsSetContent(value as 'diff' | 'exato');
                setValue('STRATEGY_DIFF_SET_TYPE', value as 'diff' | 'exato');
              }}

              data={[
                { label: 'Diferença', value: 'diff' },
                { label: 'Exato', value: 'exato' }
              ]}
            />
            {isSetContent === 'diff' && setDiffContent()}
            {isSetContent === 'exato' && setExatoContent()}
          </Stack>
        </Paper>

        {/* PONTO */}
        <Paper withBorder p='xs' maw={280}>
          <Stack gap='xs'>
            <Text size="xs" c='dimmed' fw={900}>PONTO</Text>
            <SegmentedControl
              withItemsBorders={false}
              color="green"
              size="xs"
              value={isPointContent}
              onChange={(value) => {
                setIsPointContent(value as 'diff' | 'exato');
                setValue('STRATEGY_DIFF_POINT_TYPE', value as 'diff' | 'exato')
              }}
              data={[
                { label: 'Diferença', value: 'diff' },
                { label: 'Exato', value: 'exato' }
              ]}
            />
            {isPointContent === 'diff' && pointDiffContent()}
            {isPointContent === 'exato' && pointExatoContent()}
          </Stack>
        </Paper>

        {/* ODD */}
        <Paper withBorder p='xs' maw={280}>
          <Stack gap='xs'>
            <Text size="xs" c='dimmed' fw={900}>ODD</Text>
            <Controller
              name={'STRATEGY_MULTIPLIER'}
              control={control}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  placeholder="Multiplicador"
                  min={0}
                  decimalScale={2}
                  leftSection={<IconBrandSupabase size={20} />}
                />
              )}
            />
          </Stack>
        </Paper>

        {/* ENTRADA */}
        <Paper withBorder p='xs' maw={280}>
          <Stack gap='xs'>
            <Text size="xs" c='dimmed' fw={900}>ENTRADA</Text>
            <Controller
              name={'STRATEGY_ENTRY_VALUE'}
              control={control}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  placeholder="Valor de Entrada"
                  min={1}
                  decimalScale={2}
                  decimalSeparator=","
                  thousandSeparator="."
                  prefix="R$ "
                  leftSection={<IconCoin size={20} />}
                  error={errors.STRATEGY_ENTRY_VALUE?.message}
                />
              )}
            />
          </Stack>
        </Paper>

      </SimpleGrid>

      {/* STOP */}
      <Paper withBorder p='xs' mt='xs' pos='relative' maw={isDesktop ? '100%' : '280'}>
        <Flex>
          <Text size="xs" c='dimmed' fw={900} mr='xs' style={{ zIndex: '1000' }}>STOP</Text>
          <Switch size="xs" style={{ zIndex: '1000' }} onClick={() => setStopVisible((v) => !v)} />
        </Flex>
        {stopContent()}
        {stopVisible && <Overlay bg='#23232320' radius='sm' blur={2} backgroundOpacity={0.5} />}
      </Paper>


      <Flex mt='md' justify='flex-end'>
        <Button type="submit">Salvar</Button>
        {/* <Button type="submit" loading={isLoading}>Salvar</Button> */}
      </Flex>
    </form>
  );
}
