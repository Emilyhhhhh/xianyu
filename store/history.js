export const state = () => ({
    historyList: [

    ]

})

export const mutations = {

    addHistory(state, data) {
        state.historyList.unshift(data)
    }

};