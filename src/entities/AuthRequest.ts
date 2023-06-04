import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthRequest {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 40 })
    // Wallet address => 20byte
    address: string

    @Column({ length: 36 })
    // Random
    nonce: string

    @Column({ default: false })
    // 인증이 되었는지에 대한 여부 true or false
    verified: boolean

    @Column()
    // 만료기간
    expiredAt: Date
}