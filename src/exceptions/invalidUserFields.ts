export class InvalidRegisterField extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidRegisterField"; // Nome da classe para identificação
    }
}