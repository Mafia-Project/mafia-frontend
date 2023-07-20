import { observable } from 'mobx';

const nickNameStore = observable({
    nickname: "우진",
    setNickname(nickname) {
        this.nickname = nickname;
    }
});

const usersStore = observable({
    users: [],
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