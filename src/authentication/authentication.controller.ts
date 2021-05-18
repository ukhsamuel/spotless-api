import { Controller, Body, Post, UseGuards, Request, HttpException, HttpStatus, Get, Query, Param, Response, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { BaseController, ApiUserDto } from '../utils/api.response';
import { LoginDto } from './auth.login.dto';
import { CreateUserDto } from '../users/dto/user.dto'
import {
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('authentication')
export class AuthenticationController {
    sendResponse = BaseController.sendResponse;
    constructor(private authService: AuthenticationService ) {}

    // @UseGuards(AuthGuard('local'))
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'success' })
    @ApiResponse({ status: 201, description: 'created' })
    @ApiResponse({ status: 403, description: 'forbidden' })
    @Post('signin')
    async login(@Request() req, @Body() loginDto: LoginDto) {
      console.log(loginDto);
       const user =  await this.authService.login(loginDto);
         return this.sendResponse(user);
       
    }
    
    @ApiResponse({ status: 200, description: 'success' })
    @ApiResponse({ status: 201, description: 'created' })
    @ApiResponse({ status: 400, description: 'bad request' })
    @Post('signup')
    async signUp(@Body() user: CreateUserDto) {
       try {
        const _user = await this.authService.create(user);
        return this.sendResponse(_user, 'User registration successful');
         
       } catch (error) {
           console.log(error)
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
       }
        
    }


}
