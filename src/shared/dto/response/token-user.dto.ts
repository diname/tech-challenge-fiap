import { ApiProperty } from '@nestjs/swagger';

export class TokenUserDto {
  @ApiProperty({
    example: '0dc56514-8deb-4a73-af11-29b13000dda9',
    description: `User id`,
  })
  userId: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBkYzU2NTE0LThkZWItNGE3My1hZjExLTI5YjEzMDAwZGRhOSIsImlhdCI6MTcyMjE5MTIwM30.ocYiSOtfDZD1jT8wHPppkX_EVsJ0ZYUbNAYZ_G5JNEo',
    description: `User access token`,
  })
  accessToken: string;
}
