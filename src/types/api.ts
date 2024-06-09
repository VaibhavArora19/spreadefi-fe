export type TBaseResponse = {
  statusCode: number;
  message: string;
};

export type TSuccessResponse<T> = TBaseResponse & {
  _id?: string;
  data: T;
};

export type TExceptionResponse = TBaseResponse & {
  error?: string;
};

export type TApiResponse<T> = TSuccessResponse<T> & TExceptionResponse;
