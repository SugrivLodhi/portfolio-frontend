import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthResponse } from './dto/auth-response.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput): Promise<AuthResponse> {
    const user = await this.usersService.create(registerInput);
    const token = this.jwtService.sign({ 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    });
    
    return {
      user,
      token,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(loginInput.email);
    
    if (!user || !(await bcrypt.compare(loginInput.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    });

    return {
      user,
      token,
    };
  }

  async validateUser(payload: any) {
    return this.usersService.findOne(payload.sub);
  }
}