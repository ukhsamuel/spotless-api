import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {

  @ApiProperty({ example: 'string' })  
  @IsString()
  readonly email: string;
  
  @ApiProperty({ example: 'string' })
  @IsString()
  readonly password: string;
}
