export interface IGlobalTextInfo {
  text: string
  status?: ETextStatus,
}

export enum ETextStatus {
  SUCCESS = 'success',
  ERROR = 'error'
}
