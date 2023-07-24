import { observable } from 'mobx';

const myInfoStore = observable({
    nickname: "",
    alive: true,
    job: "",
    setMyInfo(myInfo){
        this.nickname = myInfo.nickname;
        this.alive = !myInfo.killed;
        this.job = myInfo.job;
    },
    setNickname(nickname) {
        this.nickname = nickname;
    },
    setAlive(alive) {
        this.alive = alive;
    },
    setJob(job){
        this.job = job;
    }
});

const myJobStore = observable({
    job: "",
    setJob(job) {
        this.job = job;
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
    findHostByNickname(nickname) {
        const foundUser = this.users.find(user => user.nickname === nickname);
        return foundUser ? foundUser.host : false;
    },
    setStart(users){

    }
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
    isStart: false,
    dayNight: 'afternoon',
    timerId: null,
    voteAble: false,
    apiAble: true,
    abilityAble: true,
    
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
    setIsStart(isStart){
        this.isStart = isStart;
    },
    setApiAble(apiAble){
        this.apiAble = apiAble;
    },
    setAbilityAble(abilityAble){
        this.abilityAble = abilityAble;
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
    setStart(users){
        this.setDayNight('night');
        this.stopTimer();
        this.setTime(users.filter(player => !player.killed).length * 7);
        this.setApiAble(true);
        this.setIsStart(true);
        this.startTimer();
    
    },
    setNIGHTEND(users){
        this.dayNight = 'afternoon';
        this.stopTimer();
        this.time = users.filter(player => !player.killed).length * 20;
        this.setVoteAble(true);
        this.setApiAble(true);
        this.setAbilityAble(true);
        this.startTimer();
    },
    setVoteResult(users){
        this.setDayNight('night');
        this.stopTimer();
        this.setTime(users.filter(player => !player.killed).length * 7);
        this.setApiAble(true);
        this.startTimer();
    },
    setEnd(){
        this.setDayNight('afternoon');
        this.stopTimer();
        this.setTime(0);
        this.setIsStart(false);
        this.setVoteAble(false);
    }
});

const timeReductionStore = observable({
    flag: true,
    isButtonClicked: true,
    getFlag() {
        return this.flag;
    },
    setFlag(flag) {
        this.flag = flag;
    },
    getIsButtonClicked() {
        return this.isButtonClicked;
    },
    setIsButtonClicked(isButtonClicked) {
        this.isButtonClicked = !isButtonClicked;
    },
});

const indexStore = () => ({ 
    myJobStore,
    myInfoStore,
    usersStore,
    voteStore,
    gameRoomInfoStore,
    timeReductionStore
});

export default indexStore;