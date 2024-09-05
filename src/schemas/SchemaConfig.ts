import * as yup from "yup";

export const SchemaConfigCreate = yup.object().shape({
  CONFIG_USER: yup.string().required("Nome de usuário é obrigatório"),
  CONFIG_PASSWORD: yup.string().required("Senha é obrigatória")
});

export const SchemaConfigUpdate = yup.object().shape({
  CONFIG_USER: yup.string().optional(),
  CONFIG_PASSWORD: yup.string().optional(),
  CONFIG_TIME_START: yup.string().optional(),
  CONFIG_TIME_FINISH: yup.string().optional(),
  CONFIG_STATUS: yup.boolean().optional()
});
