import axios from 'axios'

const state = {
    product: null,
    CoffeeShop : JSON.parse(localStorage.getItem('CoffeShop'))
}

const getters = {
    getProd : (state) => {
        return state.product
    }
}

const actions = {
    faching({commit, state}) {
        axios({
            method : "get",
            url : process.env.VUE_APP_URL + "product",
            headers : {
                "Content-type" : "application/json",
                authtoken: state.CoffeeShop.Login.users.token,
            },
        })
        .then((res) => {
            commit("setProd", res.data.result)
        }).catch((err) => {
            console.log(err)
        });
    },
    sortName({commit, state}) {
        axios({
            method : "get",
            url : `${process.env.VUE_APP_URL}product/search/ordered?orderBy=name_product&order=ASC`,
            headers : {
                authtoken: state.CoffeeShop.Login.users.token,
            },
        })
        .then((res) => {
            commit("setProd", res.data.result)
        }).catch((err) => {
            console.log(err)
        });
    },
    sortPrice({commit, state}) {
        this.sorby = "Price"
        axios({
            method : "get",
            url : `${process.env.VUE_APP_URL}product/search/ordered?orderBy=price_product&order=ASC`,
            headers : {
                authtoken: state.CoffeeShop.Login.users.token,
            },
        })
        .then((res) => {
            commit("setProd", res.data.result)
        }).catch((err) => {
            console.log(err)
        });
    },
    sortCategory({commit, state}) {
        this.sorby = "Category"
        axios({
            method : "get",
            url : `${process.env.VUE_APP_URL}product/search/ordered?orderBy=id_category&order=ASC`,
            headers : {
                authtoken: state.CoffeeShop.Login.users.token,
            },
        })
        .then((res) => {
            commit("setProd", res.data.result)
        }).catch((err) => {
            console.log(err)
        });
    },
}

const mutations = {
    setProd(state, prod) {
        state.product = prod
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}