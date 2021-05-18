import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthenticationService) {
        super();
    }

    async validate(username: string, password: string): Promise<any>{
        //console.log(req);
        const user = await this.authService.validateUser(username, password);

        if (!user) {
            throw new HttpException({message: 'Invalid Details'}, HttpStatus.FORBIDDEN);
        }
        return user;
    }
}