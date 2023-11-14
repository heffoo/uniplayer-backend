import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegistrationDto } from './dto/registration.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { AuthStatusDto } from './dto/auth-status.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  register(@Body() registrationDto: RegistrationDto) {
    return this.authService.register(registrationDto);
  }

  @Post('signin')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    const token = await this.authService.signIn(signInDto);
    response.cookie('access_token', token, { httpOnly: true, secure: false });
    return;
  }

  @Post('signout')
  async signOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (request.cookies['access_token']) {
      response.clearCookie('access_token', { httpOnly: true, secure: false });
    }
    return;
  }

  @Post('status')
  async getStatus(
    @Req() request: Request,
  ) {
    if (request.cookies['access_token']) {
      return plainToInstance(AuthStatusDto, {
        signedIn: true
      });
    } else {
      return plainToInstance(AuthStatusDto, {
        signedIn: false
      });
    }
  }
}
