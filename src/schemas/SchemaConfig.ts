import * as yup from "yup";

export const SchemaConfig = yup.object().shape({
  USER: yup.string().required("Nome de usuário é obrigatório"),
  PASSWORD: yup.string().required("Senha é obrigatória"),
  TIME_START: yup.string().required("Hora de início é obrigatória"),
  TIME_FINISH: yup.string().required("Hora de término é obrigatória"),
  STOP_WIN: yup.number().positive("O valor deve ser positivo").nullable(),
  STOP_LOSS: yup.number().positive("O valor deve ser positivo").nullable(),
  ESTRATEGIES: yup.array().of(
    yup.object().shape({
      DIFF_SET: yup.number().nullable(),
      DIFF_POINT: yup.number().nullable(),
      MULTIP: yup.number().required("Multiplicador é obrigatório").positive("O valor deve ser positivo"),
      ODD_VALUE: yup.number().required("Valor Odd é obrigatório").positive("O valor deve ser positivo"),
    })
  ),
});
