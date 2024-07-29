import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        example: 'hamburger',
        description: `Products's name`,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: '1',
        description: `Product categories`,
    })
    @IsNumber()
    categoryId: number;

    @ApiProperty({
        example: '1',
        description: `Product categories`,
    })
    @IsNumber()
    price: number;


    @ApiProperty({
        example: 'A Burger with prime beef and plenty of cheddar',
        description: `Products's description`,
    })
    @IsString()
    @IsNotEmpty()
    description: string;


}
