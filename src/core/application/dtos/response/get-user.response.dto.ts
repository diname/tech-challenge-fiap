import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '@Shared/enums/user-role.enum';

export class GetUserResponseDto {
  @ApiProperty({
    description: 'O identificador único do usuário.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'O nome do usuário.',
    example: 'João da Silva',
  })
  name: string;

  @ApiProperty({
    description: 'O endereço de e-mail do usuário.',
    example: 'joao.silva@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'O CPF (Cadastro de Pessoas Físicas) do usuário.',
    example: '12345678900',
  })
  cpf: string;

  @ApiProperty({
    description: 'Os papéis atribuídos ao usuário.',
    example: ['ADMIN'],
    enum: UserRoleEnum,
    enumName: 'UserRoleEnum',
  })
  roles: UserRoleEnum[];
}
