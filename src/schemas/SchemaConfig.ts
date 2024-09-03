import * as yup from "yup";

export const SchemaConfig = yup.object().shape({
  CONFIG_USER: yup.string().required("Nome de usuário é obrigatório"),
  CONFIG_PASSWORD: yup.string().required("Senha é obrigatória"),
  CONFIG_TIME_START: yup.string().required("Hora de início é obrigatória"),
  CONFIG_TIME_FINISH: yup.string().required("Hora de término é obrigatória"),
  CONFIG_STATUS: yup.boolean().optional()
});
