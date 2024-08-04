export class GetOneUserCommand {
  constructor(public readonly filter: { cpf?: string; email?: string }) {}
}
