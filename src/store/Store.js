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
        this.users = [];
    },
    addAll(users) {
        this.users = this.users.concat(users);
    },
    get sortedUsers() {
        return this.users.slice().sort((a, b) => a.nickname.localeCompare(b.nickname));
    }
});

const indexStore = () => ({ 
    nickNameStore,
    usersStore,
});

export default indexStore;