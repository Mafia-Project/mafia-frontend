import { observable } from 'mobx';

const nickNameStore = observable({
    nickname: "우진",
    setNickname(nickname) {
        this.nickname = nickname;
    }
});

const usersStore = observable({
    users: [
        {nickname: '우진', job: 'MAFIA', killed: false, host: true},
        {nickname: '주원', job: 'POLICE', killed: false, host: false},
        {nickname: '우현', job: 'DOCTOR', killed: true, host: false},
        {nickname: '희아', job: 'MAFIA', killed: true, host: false},
        {nickname: '승훈', job: 'CITIZEN', killed: false, host: false},
        {nickname: '민수B', job: 'CITIZEN', killed: false, host: false},
        {nickname: '민수A', job: 'CITIZEN', killed: false, host: false},
    ],
    removeAll() {
        this.users = [];
    },
    addAll(users) {
        this.users = this.users.concat(users);
    },
    get sortedUsers() {
        return this.users.slice().sort((a, b) => a.nickname.localeCompare(b.nickname));
    },
    get findAliveByNickname(){
        return (nickname) => {
            const foundUser = this.users.find(user => user.nickname === nickname);
            return foundUser.killed;
        }
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


const indexStore = () => ({ 
    nickNameStore,
    usersStore,
    voteStore,
});

export default indexStore;