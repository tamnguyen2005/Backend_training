import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(200)
  async login(@Body() request: LoginDTO) {
    return await this.authService.login(request);
  }
  @Post('register')
  async register(@Body() request: RegisterDTO) {
    return await this.authService.register(request);
  }
}
