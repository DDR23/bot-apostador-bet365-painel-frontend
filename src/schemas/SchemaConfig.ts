import * as yup from "yup";

export const SchemaConfig = yup.object().shape({
  USER: yup.string().required("Nome de usuário é obrigatório"),
  PASSWORD: yup.string().required("Senha é obrigatória"),
  TIME_START: yup.string().required("Hora de início é obrigatória"),
  TIME_FINISH: yup.string().required("Hora de término é obrigatória"),
  STOP_WIN: yup.number(),
  STOP_LOSS: yup.number(),
  ESTRATEGIES: yup.array().of(
    yup.object().shape({
      DIFF_SET: yup.number(),
      DIFF_POINT: yup.number(),
      MULTIP: yup.number().required("Multiplicador é obrigatório"),
      ODD_VALUE: yup.number().required("Valor Odd é obrigatório"),
    })
  ),
});
