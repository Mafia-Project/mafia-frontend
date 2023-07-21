import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});

export const voteApi = (id, voter, target) => {
    instance.post(`/rooms/${id}/vote`,
        {
            voter,
            target
        }).then((res) => { }
        ).catch((error) => {
            console.log(error);
        });
}

export const timeReductionApi = (id, nickname, time) => {
    instance.post(`/rooms/${id}/games/time-reduction`, {
        nickname,
        time
    })
    .catch(error => {
        console.error(error);
    });
}

export const gameStartApi = (id) => {
    instance.post(`/rooms/${id}/start-game`)
    .catch(error => {
        console.error(error);
    });
}

export const gameJobEventApi = (id, nickname, target, job) => {
    instance.post(`/rooms/${id}/games`, {
        nickname,
        target,
        job
    }).catch(error => {
        console.error(error);
    })
}

export const gameNightEndApi = (id) => {
    instance.post(`/rooms/${id}/night-end`).catch(error => {
        console.error(error);
    })
}

export const gameVoteResultApi = (id) => {
    instance.get(`/rooms/${id}/vote`).catch(error => {
        console.error(error);
    })
}
