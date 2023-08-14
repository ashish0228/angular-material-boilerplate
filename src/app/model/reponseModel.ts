export interface responseModel {
  message?: string;
  status?: number;
  error?: [];
  data?: any
}


export interface Request {
  path: string,
  data?: any
}