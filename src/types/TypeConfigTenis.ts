export interface EstrategiesTenis {
  _id?: number;
  DIFF_SET?: number;
  DIFF_POINT?: number;
  MULTIP: number;
  ODD_VALUE: number;
}

export interface TypeConfigTenis {
  _id?: number;
  USER: string;
  PASSWORD: string;
  TIME_START: string;
  TIME_FINISH: string;
  STOP_WIN?: number;
  STOP_LOSS?: number;
  ESTRATEGIES?: EstrategiesTenis[];
  STATUS?: boolean;
}
