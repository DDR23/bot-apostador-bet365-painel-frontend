export interface EstrategiesTenis {
  _id?: number;
  DIFF_SET?: number | null;
  DIFF_POINT?: number | null;
  MULTIP: number;
  ODD_VALUE: number;
}

export interface TypeConfigTenis {
  _id?: number;
  USER: string;
  PASSWORD: string;
  TIME_START: string;
  TIME_FINISH: string;
  STOP_WIN?: number | null;
  STOP_LOSS?: number | null;
  ESTRATEGIES?: EstrategiesTenis[];
  STATUS?: boolean;
}
