export class GetOneUserCommand {
  constructor(public readonly fields: { cpf?: string; email?: string }) {}
}
