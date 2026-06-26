import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly userRepo: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}
  async findByEmail(email: string): Promise<Auth | null> {
    return await this.userRepo.findOne({ where: { email } });
  }
  async login(request: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.findByEmail(request.email);
    if (!user)
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    const isMatch = await bcrypt.compare(request.password, user.passwordHashed);
    if (!isMatch)
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    const payload = { sub: user.id, email: user.email, name: user.fullName };
    return { accessToken: this.jwtService.sign(payload) };
  }
  async register(request: RegisterDTO): Promise<{ message: string }> {
    const user = await this.findByEmail(request.email);
    if (user) throw new BadRequestException('Email này đã được sử dụng');
    const passwordHash = await bcrypt.hash(request.password, 10);
    const newUser = this.userRepo.create({
      fullName: request.fullName,
      email: request.email,
      phoneNumber: request.phoneNumber,
      passwordHashed: passwordHash,
    });
    await this.userRepo.save(newUser);
    return { message: 'Đăng ký tài khoản thành công' };
  }
}
