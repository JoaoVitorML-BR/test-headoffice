import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { isValidCPF } from '../validators/cpf.validator';

@ValidatorConstraint({ name: 'isCPF', async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
    validate(cpf: string): boolean {
        return isValidCPF(cpf);
    }

    defaultMessage(): string {
        return 'CPF inválido';
    }
}

export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCPFConstraint,
        });
    };
}
