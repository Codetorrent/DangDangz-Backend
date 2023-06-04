// NestJS 의 Module 데코레이터를 가져옴으로 해당 클래스가 NestJS 모듈임을 선언
import { Module } from '@nestjs/common';
// NestJS 애플리케이션의 컨트롤러 => HTTP 요청을 처리
import { AppController } from './app.controller';
// NestJS 애플리케이션의 서비스 => 비즈니스 로직 처리
import { AppService } from './app.service';
// 환경변수관련
import { ConfigModule, ConfigService } from '@nestjs/config';
// NestJS에서 TypeORM 사용
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthRequest } from './entities';

@Module({
  // 환경변수 값을 사용 가능하게 import
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRootAsync({ // TypeORM 초기화
    imports: [ConfigModule, AuthModule],
    // ConfigService 를 사용하여 환경변수로부터 TypeORM 의 설정 값을 동적으로 가져옴
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DBNAME'),
      entitles: [AuthRequest],
      // 실행 시 DB 초기화 및 테이블 생성 옵션 => 실무에선 비추
      syschronzie: true,
    }),
    inject: [ConfigService]
  }), AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
// AppModule => root Module
export class AppModule {}
