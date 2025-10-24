export function cleanCPF(cpf: string): string {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '');
}

export function isValidCPF(cpf: string): boolean {
    if (!cpf) return false;

    const cleanedCPF = cleanCPF(cpf);

    if (cleanedCPF.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cleanedCPF)) return false;

    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanedCPF.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanedCPF.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanedCPF.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanedCPF.substring(10, 11))) return false;

    return true;
}

export function formatCPF(cpf: string): string {
    const cleaned = cleanCPF(cpf);
    if (cleaned.length !== 11) return cpf;

    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
