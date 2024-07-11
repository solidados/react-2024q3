export class CustomError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
  }
}

export const errorHandler = (error: unknown, code: number): CustomError => {
  if (error instanceof Error) {
    return new CustomError(error.message, code || 500);
  }
  return new CustomError('An unknown error occurred', code || 500);
};
