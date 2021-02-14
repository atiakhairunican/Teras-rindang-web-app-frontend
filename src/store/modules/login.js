import axios from "axios"

const state = {
    users: null,
    isAuth: false,
}

const getters = {
    getUsers: (state) => {
        return state.users
    },
    getIsAuth: (state) => {
        if (state.isAuth != null) {
            return state.isAuth
        }
        return false
    },
}

const actions = {
    login({ commit }, data) {
        return new Promise((resolve, reject) => {
            axios({
                method : "post",
                url : process.env.VUE_APP_URL + "auth",
                headers : {
                    "Content-type" : "application/json"
                },
                data : data,
                })
                .then((res) => {
                    resolve(res.data)
                    
                    if (res.data.result[0].message != "Token created") {
                        return alert(res.data.result[0].message);
                    }
                    else {
                        commit('setAuth')
                        commit("setUsers", res.data.result[0])
                    }
                }).catch((err) => {
                    console.log(err)
                    reject(new Error(err))
                });
        })
    },
    logout({ commit }) {
        let check = confirm("Are you sure you want to loguot?")
        if (check) {
            commit("delUsers")
            commit("setAuth")
        }
    },
}

const mutations = {
    setUsers(state, user) {
        state.users = user
    },
    setAuth(state) {
        state.isAuth = !state.isAuth
    },
    delUsers(state) {
        state.users = null
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}
