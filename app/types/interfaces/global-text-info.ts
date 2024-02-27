export interface IGlobalHandler {
  text: string;
  status?: ETextStatus;
}

export enum ETextStatus {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}
