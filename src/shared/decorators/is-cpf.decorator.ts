import { ValidationOptions, registerDecorator } from 'class-validator';
import { cpf } from 'cpf-cnpj-validator';

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          if (typeof value !== 'string' || !/^\d{11}$/.test(value)) {
            return false;
          }
          return cpf.isValid(value, true);
        },
        defaultMessage(): string {
          return 'CPF Inválido';
        },
      },
    });
  };
}
