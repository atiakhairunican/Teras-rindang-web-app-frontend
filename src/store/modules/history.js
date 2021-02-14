import axios from 'axios'

const state = {
    history: null,
}

const getters = {
    getHistory : (state) => {
        return state.history
    },
}

const actions = {
    feching({commit}) {
        axios({
            method : "get",
            url : process.env.VUE_APP_URL + "history",
            headers : {
                "Content-type" : "application/json",
                authtoken: localStorage.getItem("access_token"),
            },
        })
        .then((res) => {
            commit("setHistory", res.data.result)
        }).catch((err) => {
            console.log(err)
        });
    },
}

const mutations = {
    setHistory(state, history) {
        state.history = history
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}