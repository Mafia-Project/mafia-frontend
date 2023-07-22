import { observable } from 'mobx';

const nickNameStore = observable({
    nickname: "",
    setNickname(nickname) {
        this.nickname = nickname;
    }
});

const usersStore = observable({
    users: [],
    removeAll() {
        if (this.users) return;
        this.users = [];
    },
    addAll(users) {
        this.users = users;
    },
    get sortedUsers() {
        if(!this.users) return [];
        return this.users.slice().sort((a, b) => a.nickname.localeCompare(b.nickname));
    },
    get findAliveByNickname(){
        return (nickname) => {
            const foundUser = this.users.find(user => user.nickname === nickname);
            return foundUser;
        }
    },
    findJobByNickname(nickname) {
        const foundUser = this.users.find(user => user.nickname === nickname);
        return foundUser ? foundUser.job : null;
    },
    findKilledByNickname(nickname) {
        const foundUser = this.users.find(user => user.nickname === nickname);
        return foundUser ? foundUser.killed : null;
    },
});


const voteStore = observable({
    votes: [],
    removeAll() {
        this.votes = [];
    },
    addAll(votes) {
        this.votes = this.votes.concat(votes);
    },
    get findVoteNumByNickname() {
        return (nickname) => {
            const foundVote = this.votes.find(vote => vote.nickname === nickname);
            return foundVote ? foundVote.voteNum : 0;
        }
    }
});

const gameRoomInfoStore = observable({
    roomKey: '',
    time: 0,
    dayNight: 'afternoon',
    timerId: null,
    voteAble: false,
    apiAble: false,
    
    setRoomKey(roomKey) {
        this.roomKey = roomKey;
    },
    setTime(time) {
        this.time = time;
    },
    setDayNight(dayNight) {
        this.dayNight = dayNight;
    },
    setVoteAble(voteAble){
        this.voteAble = voteAble;
    },
    setApiAble(apiAble){
        this.apiAble = apiAble;
    },

    // 타이머 시작
    startTimer() {
        this.timerId = setInterval(() => {
            if (this.time > 0) {
                this.time--;
            } else {
                this.stopTimer();
            }
        }, 1000); // 1초씩 --
    },
    // 타이머 종료
    stopTimer() {
        clearInterval(this.timerId);
    },
});

const indexStore = () => ({ 
    nickNameStore,
    usersStore,
    voteStore,
    gameRoomInfoStore,
});

export default indexStore;