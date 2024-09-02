import * as yup from "yup";

export const SchemaStrategy = yup.object().shape({
  DIFF_SET: yup.number(),
  DIFF_POINT: yup.number(),
  MULTIP: yup.number().required("Multiplicador é obrigatório"),
  ODD_VALUE: yup.number().required("Valor Odd é obrigatório"),
  STOP_WIN: yup.number(),
  STOP_LOSS: yup.number(),
});
