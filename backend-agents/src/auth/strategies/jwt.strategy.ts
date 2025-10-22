import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as JwtStrategyBase } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export type JwtPayload = {
	sub: string;
	email: string;
	role: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtStrategyBase) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET') ?? 'changeme',
		});
	}

	async validate(payload: JwtPayload) {
		// Attach to request.user
		return payload;
	}
}
