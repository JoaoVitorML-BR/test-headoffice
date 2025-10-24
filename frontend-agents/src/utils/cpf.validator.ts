export const cleanCPF = (cpf: string | undefined | null): string => {
    if (!cpf) return '';
    return cpf.replace(/\D/g, '');
};

export const isValidCPF = (cpf: string): boolean => {
    const cleaned = cleanCPF(cpf);

    if (cleaned.length !== 11) return false;

    if (/^(\d)\1{10}$/.test(cleaned)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleaned.charAt(i)) * (10 - i);
    }
    let firstDigit = 11 - (sum % 11);
    if (firstDigit >= 10) firstDigit = 0;

    if (parseInt(cleaned.charAt(9)) !== firstDigit) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleaned.charAt(i)) * (11 - i);
    }
    let secondDigit = 11 - (sum % 11);
    if (secondDigit >= 10) secondDigit = 0;

    if (parseInt(cleaned.charAt(10)) !== secondDigit) return false;

    return true;
};

export const formatCPF = (cpf: string | undefined | null): string => {
    const cleaned = cleanCPF(cpf);

    if (cleaned.length === 0) return '';

    if (cleaned.length <= 3) {
        return cleaned;
    } else if (cleaned.length <= 6) {
        return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    } else if (cleaned.length <= 9) {
        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    } else {
        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
    }
};

export const maskCPF = (value: string): string => {
    const cleaned = cleanCPF(value);
    const limited = cleaned.slice(0, 11);
    return formatCPF(limited);
};
