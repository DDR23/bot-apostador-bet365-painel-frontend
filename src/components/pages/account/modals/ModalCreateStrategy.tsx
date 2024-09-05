import { Button } from "@mantine/core";

interface Props {
  configId?: string;
  onClose: () => void;
}

export default function ModalCreateStrategy({ configId, onClose }: Props) {
  console.log(configId)
  return (
    <>
      <Button onClick={onClose}>Salvar</Button>
    </>
  );
}
