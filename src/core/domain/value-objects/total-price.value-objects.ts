export class TotalPriceValueObject {
  private readonly value: number;

  constructor(value: number) {
    this.validateValue(value);
    this.value = value;
  }

  private validateValue(value: number): void {
    if (value < 0) {
      throw new Error('O preço total deve ser um valor positivo.');
    }
  }

  getValue(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toFixed(2);
  }
}
