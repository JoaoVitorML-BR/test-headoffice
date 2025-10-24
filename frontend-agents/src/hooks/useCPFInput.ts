import { useState, useCallback } from 'react';
import { maskCPF, cleanCPF } from '../utils/cpf.validator';

export const useCPFInput = (initialValue: string = '') => {
    const [displayValue, setDisplayValue] = useState(maskCPF(initialValue));

    const handleChange = useCallback((value: string) => {
        const masked = maskCPF(value);
        setDisplayValue(masked);
        return cleanCPF(masked);
    }, []);

    const setValue = useCallback((value: string) => {
        setDisplayValue(maskCPF(value));
    }, []);

    return {
        displayValue,
        handleChange,
        setValue,
    };
};
