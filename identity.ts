import { v4 as uuidv4 } from 'uuid';

export default class Identity {
    playerId: string;
    nickname: string;
    role?: string;

    constructor() {
        this.playerId = uuidv4();
        this.nickname = '';
        this.role = '';
    }

    setNickname(nickname:string) {
        this.nickname = nickname;
    }
}