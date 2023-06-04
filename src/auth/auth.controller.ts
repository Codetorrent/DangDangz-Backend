import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

// 클라이언트가 실제로 서버로부터 받은 요청을 처리하는 인터페이스 역할을 하는 콘트롤러
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // params 를 통해 address 를 가져옴
    @Get(':address')
    async getSignMessage(@Param() params) {
        const address = params.address;
    
        // ETH 지갑 주소는 16진수로 이루어진 20byte 문자열 => 40
        // 정규표현식(regex)을 사용하여 16진수임을 체크,
        // 만약 address 주소가 잘못 입력된 경우 
        if (!/^[0-9a-fA-F]{40}$/.test(address)) {
            // 에러 메세지 출력
            throw new HttpException('wrong address', HttpStatus.BAD_REQUEST)
        }
        
        // address 주소가 실제 ETH 지갑일 경우 authService 에서 generateAuthRequest 함수 실행 => constructor
        const authRequest = await this.authService.generateAuthRequest(address)
        
        return {
            // authService 의 generateSignatureMessage 함수 => 서명 관련 함수 가져오기
            message: this.authService.generateSignatureMessage(authRequest),
            expiredAt: authRequest.expiredAt,
        }
    }
}
