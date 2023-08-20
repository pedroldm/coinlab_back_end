export class AuthenticationError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
      super(message);
      this.name = 'AuthenticationError';
      this.statusCode = statusCode;
    }
}