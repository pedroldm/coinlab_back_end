export class InvalidUser extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
      super(message);
      this.name = 'InvalidUser';
      this.statusCode = statusCode;
    }
}