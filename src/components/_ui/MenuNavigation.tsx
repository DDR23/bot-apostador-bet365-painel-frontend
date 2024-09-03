import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconArrowLeft, IconRefresh } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function MenuNavigation() {
  const navigate = useNavigate();
  const refresh = () => window.location.reload()
  const backspace = () => navigate(-1);

  return (
    <Group w='100%' gap='sm' justify="flex-start">
      <Tooltip color="dimmed" label='Voltar' position="bottom">
        <ActionIcon onClick={backspace} variant="filled" aria-label="Voltar">
          <IconArrowLeft size={20} />
        </ActionIcon>
      </Tooltip>
      <Tooltip color="dimmed" label='Recarregar' position="bottom">
        <ActionIcon onClick={refresh} variant="filled" aria-label="Recarregar">
          <IconRefresh size={20} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}