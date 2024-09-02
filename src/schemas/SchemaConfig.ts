import * as yup from "yup";

export const SchemaConfig = yup.object().shape({
  USER: yup.string().required("Nome de usuário é obrigatório"),
  PASSWORD: yup.string().required("Senha é obrigatória"),
  TIME_START: yup.string().required("Hora de início é obrigatória"),
  TIME_FINISH: yup.string().required("Hora de término é obrigatória")
});
