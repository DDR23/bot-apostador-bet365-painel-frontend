import { Button, Stack, TextInput } from "@mantine/core";
import getSocket from "../../../utils/getSocket";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { notifications } from "@mantine/notifications";

interface JoinPostValues {
  USER_NAME?: string;
}

export default function Join() {
  const socket = getSocket();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<JoinPostValues>();

  const submitForm: SubmitHandler<JoinPostValues> = (formData) => {

    //EMIT == REQUEST
    const req = formData;
    if (!req.USER_NAME?.trim()) return;
    socket.emit('join_data_req', req);
    
    //ON == RESPONSE
    socket.on('join_data_res', (res) => {
      notifications.show({
        title: res.msgLogin.title,
        message: res.msgLogin.message,
        autoClose: 5000,
        color: 'green'
      });
      login();
      navigate('/dashboard');
    });
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Stack>
        <TextInput
          {...register('USER_NAME')}
          description='Username'
          required
        />
        <Button type="submit">Entrar</Button>
      </Stack>
    </form>
  );
}
