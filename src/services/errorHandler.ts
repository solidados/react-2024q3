export class CustomError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
  }
}

export const errorHandler = (error: unknown): CustomError => {
  if (error instanceof Error) {
    const customError = error as CustomError;
    return new CustomError(customError.message, customError.code || 500);
  }
  return new CustomError('An unknown error occurred', 500);
};
