import { ActionIcon } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { useRef } from "react";

export const useTimePickerControls = () => {
  const timeStartRef = useRef<HTMLInputElement>(null);
  const timeFinishRef = useRef<HTMLInputElement>(null);

  const pickerControlStart = (
    <ActionIcon variant="subtle" color="gray" onClick={() => timeStartRef.current?.showPicker()}>
      <IconClock size={16} stroke={1.5} />
    </ActionIcon>
  );

  const pickerControlFinish = (
    <ActionIcon variant="subtle" color="gray" onClick={() => timeFinishRef.current?.showPicker()}>
      <IconClock size={16} stroke={1.5} />
    </ActionIcon>
  );

  return { timeStartRef, timeFinishRef, pickerControlStart, pickerControlFinish };
};
