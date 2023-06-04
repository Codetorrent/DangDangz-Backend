import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRequest } from 'src/entities';
import { Repository } from 'typeorm';
import { v4 } from 'uuid'

@Injectable()
export class AuthService {
    constructor(
        // TypeORM 에서 제공하는 Repository 가져오기
        @InjectRepository(AuthRequest)
        // 클라이언트에서 요청이 들어오면 AuthRequest 객체 push
        private authRequestRepository: Repository<AuthRequest>
    ) {}

    // 이더리움 기반 address 생성하기
    async generateAuthRequest(address: string) {
        // 새로운 AuthRequest 생성
        const authRequest = new AuthRequest()

        authRequest.address = address
        // uuid 의 v4 함수를 통해 랜덤한 nonce 생성
        authRequest.nonce = v4()
        // 만료기간 == 현재 시간 기준 + 10분 => ms 기준
        authRequest.expiredAt = new Date(new Date().getTime() + 10 * 60 * 1000)
    
        // DB 에 저장하여 return
        return await this.authRequestRepository.save(authRequest)
    }

    // AuthRequest 객체로부터 서명메세지를 생성하는 함수
    generateSignatureMessage(authRequest: AuthRequest) {
        return `Welcome to DangDangz World !!! \n\nWallet Address:\n${authRequest.address}\n\nNonce:${authRequest.nonce}`
    }
}
