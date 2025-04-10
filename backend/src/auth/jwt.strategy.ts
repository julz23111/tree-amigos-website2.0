import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SUPER_SECRET_JWT_KEY', // Use env variables in production!
    });
  }

  async validate(payload: any) {
    // Returns an object to attach to req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}