import * as yup from "yup";

export const SchemaConfig = yup.object().shape({
  CONFIG_USER: yup.string().required("Nome de usuário é obrigatório"),
  CONFIG_PASSWORD: yup.string().required("Senha é obrigatória"),
  CONFIG_TIME_START: yup.string().optional(),
  CONFIG_TIME_FINISH: yup.string().optional()
});

export const SchemaConfigEdit = yup.object().shape({
  CONFIG_USER: yup.string().optional(),
  CONFIG_PASSWORD: yup.string().optional(),
  CONFIG_TIME_START: yup.string().optional(),
  CONFIG_TIME_FINISH: yup.string().optional(),
  CONFIG_STATUS: yup.boolean().optional()
});
