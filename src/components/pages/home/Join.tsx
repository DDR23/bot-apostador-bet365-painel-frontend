import { Button, Stack, TextInput } from "@mantine/core";
import { useRef } from "react";
import io from 'socket.io-client';

export default function Join() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const username = inputRef.current?.value;
    if (!username?.trim()) return;

    // Conectando ao servidor WebSocket
    const socket = io('http://localhost:8080');

    // Envia uma chamada pro servidor
    socket.emit('chamada-teste', username);
  };

  return (
    <Stack>
      <TextInput
        label='username'
        ref={inputRef}
        placeholder='Digite seu nome'
      />
      <Button onClick={handleSubmit}>Entrar</Button>
    </Stack>
  );
}
