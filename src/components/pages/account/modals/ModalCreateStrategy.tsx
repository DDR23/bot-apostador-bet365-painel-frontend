import { Button, Flex, NumberInput, Paper, SegmentedControl, SimpleGrid, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TypeStrategyTenisCreate } from "../../../../types/TypeStrategyTenis";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaStrategyTenisCreate } from "../../../../schemas/SchemaStrategyTenis";
import GetSocket from "../../../../utils/GetSocket";
import ProviderNotification from "../../../../utils/ProviderNotification";
import { IconScoreboard } from "@tabler/icons-react";

interface Props {
  configId?: string;
  onClose: () => void;
}

export default function ModalCreateStrategy({ configId, onClose }: Props) {
  const socket = GetSocket();
  const [isLoading, setIsLoading] = useState(false);
  const [isSetContent, setIsSetContent] = useState<'diff' | 'exato'>('diff')
  const [isPointContent, setIsPointContent] = useState<'diff' | 'exato'>('diff')
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<TypeStrategyTenisCreate>({
    mode: 'onChange',
    resolver: yupResolver(SchemaStrategyTenisCreate)
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
      STRATEGY_CONFIG: configId,
      STRATEGY_DIFF_SET_TYPE: data.STRATEGY_DIFF_SET_TYPE || 'diff',
      STRATEGY_DIFF_POINT_TYPE: data.STRATEGY_DIFF_POINT_TYPE || 'diff'
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
            leftSection={<IconScoreboard size={20} />}
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
              leftSection={<IconScoreboard size={20} />}
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
              leftSection={<IconScoreboard size={20} />}
            />
          )}
        />
      </SimpleGrid>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={10}>


        <Paper withBorder p='xs' maw={280}>
          <Stack gap='xs'>
            <Text size="sm" ta='center'>SET</Text>
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


        <Paper withBorder p='xs' maw={280}>
          <Stack gap='xs'>
            <Text size="sm" ta='center'>PONTO</Text>
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

        <Paper withBorder p='xs' maw={280}>
          <Controller
            name={'STRATEGY_ENTRY_VALUE'}
            control={control}
            render={({ field }) => (
              <NumberInput
                {...field}
                placeholder="Valor de Entrada"
                min={0}
                leftSection={<IconScoreboard size={20} />}
                error={errors.STRATEGY_ENTRY_VALUE?.message}
              />
            )}
          />
        </Paper>

      </SimpleGrid>
      <Flex mt='md' justify='flex-end'>
        <Button type="submit" loading={isLoading}>Salvar</Button>
      </Flex>
    </form>
  );
}
