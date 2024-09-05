import * as yup from "yup";

export const SchemaStrategyTenis = yup.object().shape({
  STRATEGY_DIFF_SET_TYPE: yup.string(),
  STRATEGY_DIFF_SET: yup.number(),
  STRATEGY_DIFF_SET_PLAYER1: yup.number(),
  STRATEGY_DIFF_SET_PLAYER2: yup.number(),
  STRATEGY_DIFF_POINT_TYPE: yup.string(),
  STRATEGY_DIFF_POINT: yup.number(),
  STRATEGY_DIFF_POINT_PLAYER1: yup.number(),
  STRATEGY_DIFF_POINT_PLAYER2: yup.number(),
  STRATEGY_MULTIPLIER: yup.number(),
  STRATEGY_ENTRY_VALUE: yup.number().required("Valor das entradas é obrigatório"),
  STRATEGY_STOP: yup.boolean(),
  STRATEGY_STOP_WIN: yup.number(),
  STRATEGY_STOP_LOSS: yup.number()
});

export const SchemaStrategyTenisEdit = yup.object().shape({
  STRATEGY_DIFF_SET_TYPE: yup.string().optional(),
  STRATEGY_DIFF_SET: yup.number().optional(),
  STRATEGY_DIFF_SET_PLAYER1: yup.number().optional(),
  STRATEGY_DIFF_SET_PLAYER2: yup.number().optional(),
  STRATEGY_DIFF_POINT_TYPE: yup.string().optional(),
  STRATEGY_DIFF_POINT: yup.number().optional(),
  STRATEGY_DIFF_POINT_PLAYER1: yup.number().optional(),
  STRATEGY_DIFF_POINT_PLAYER2: yup.number().optional(),
  STRATEGY_MULTIPLIER: yup.number().optional(),
  STRATEGY_ENTRY_VALUE: yup.number().optional(),
  STRATEGY_STOP: yup.boolean().optional(),
  STRATEGY_STOP_WIN: yup.number().optional(),
  STRATEGY_STOP_LOSS: yup.number().optional()
});
