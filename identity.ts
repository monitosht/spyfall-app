import { v4 as uuidv4 } from 'uuid';

export default class Identity {
    playerId: string;
    nickname: string;

    constructor() {
        this.playerId = uuidv4();
        this.nickname = '';
    }

    setNickname(nickname:string) {
        this.nickname = nickname;
    }
}