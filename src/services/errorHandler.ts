export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}

export const errorHandler = (error: unknown): CustomError => {
  if (error instanceof Error) {
    return new CustomError(error.message);
  }
  return new CustomError('An unknown error occurred');
};
