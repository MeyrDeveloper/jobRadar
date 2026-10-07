import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
    getMessage() {
        return " Hello from shared"
    }
}
