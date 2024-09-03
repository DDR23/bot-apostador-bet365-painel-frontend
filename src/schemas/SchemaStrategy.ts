import * as yup from "yup";

export const SchemaStrategy = yup.object().shape({
  STRATEGY_DIFF_SET: yup.number(),
  STRATEGY_DIFF_POINT: yup.number(),
  STRATEGY_MULTIPLIER: yup.number(),
  STRATEGY_ENTRY_VALUE: yup.number().required("Valor das entradas é obrigatório"),
  STRATEGY_STOP_WIN: yup.number(),
  STRATEGY_STOP_LOSS: yup.number(),
  STRATEGY_CONFIG: yup.string()
});
