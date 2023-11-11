import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegistrationDto } from './dto/registration.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';

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
}
