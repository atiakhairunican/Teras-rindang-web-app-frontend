import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Product from './modules/product'
import History from './modules/history'
import Login from './modules/login'

Vue.use(Vuex)

const cartState = createPersistedState({
    key : 'CoffeShop',
    paths : ['Product.product', 'History.history', 'Login.users', 'Login.isAuth'],
})

export default new Vuex.Store({
    modules: {
        Product,
        History,
        Login,
    },
    plugins: [cartState],
})
