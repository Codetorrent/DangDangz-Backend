import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRequest } from 'src/entities';

@Module({
  // TypeORM 에서 AuthRequest entities 사용 선언
  imports: [TypeOrmModule.forFeature([AuthRequest])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
