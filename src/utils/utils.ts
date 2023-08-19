export class Utils {
    public static validateEmail(email: string): boolean {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    public static validateCPF(cpf: string):boolean {
        const cleanedCPF = cpf.replace(/\D/g, '');
    
        if (cleanedCPF.length !== 11) {
            return false;
        }
    
        if (/^(\d)\1+$/.test(cleanedCPF)) {
            return false;
        }
    
        const digits = cleanedCPF.split('').map(Number);
        const dv1 = this.calculateDigit(digits, 10);
        const dv2 = this.calculateDigit(digits, 11);
    
        return dv1 === digits[9] && dv2 === digits[10];
    }

    private static calculateDigit(digits: number[], factor: number): number {
        const total = digits
            .slice(0, factor)
            .map((digit, index) => digit * (factor - index))
            .reduce((sum, value) => sum + value, 0);
    
        const remainder = total % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }
}