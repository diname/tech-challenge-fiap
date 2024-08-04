export class GetTokenCommand {
  constructor(
    public readonly identify: {
      cpf?: string;
      email?: string;
      password?: string;
    },
  ) {}
}
