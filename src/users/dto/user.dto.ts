import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import {  IsUserEmailAlreadyExist } from "./user.validation";

export class CreateUserDto {


     first_name: any;
     last_name: any;
    
    @IsEmail()
    @IsNotEmpty()
    @IsUserEmailAlreadyExist()
    @ApiProperty({ example: 'string' })  
     email: any;

     @ApiProperty({ example: 'string' })  
     password: any;
    
}
