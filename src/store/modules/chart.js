const state = {
    chart : [],
    show : true,
    showOverlay : false,
}

const getters = {
    allChart : (state) => {
        return state.chart
    },
    calculated(state) {
        let price = 0
        for (const key in state.chart) {
            price += Number(state.chart[key].product.price_product) * state.chart[key].count
        }
        return price
    },
    quantity(state) {
        let count = 0
        for (const key in state.chart) {
            count += state.chart[key].count
        }
        return count
    },
}

const actions = {
    add({commit, state}, prod) {
        let indexItem
        let isExist = state.chart.filter((item, index) => {
            console.log("qty",item);
            if(item.product.id_product == Number(prod.id_product)) {
                indexItem = index
                return true
            }
            else {
                return false
            }
        })
        if (isExist.length) {
            commit("incrementCount", indexItem)
        }
        else {
            state.show = false
            state.showOverlay = false
            commit('addChart', {product: prod, count: 1})
        }
    },
}

const mutations = {
    addChart(state, data) {
        state.chart.push(data)
    },
    incrementCount(state, idx) {
        state.chart[idx].count++
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}