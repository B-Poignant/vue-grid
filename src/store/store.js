import Vue from 'vue'
import Vuex from 'vuex'
import doAsync from './async-util'
import * as types from './mutation-types'

Vue.use(Vuex)

const state = {
}

const mutations = {}

/*
 * For each async mutation, dynamically add the three mutations:
 * SUCCESS - write the response to the store using the `stateKey` property
 * PENDING - set the `loadingKey` property in the store to true
 * FAILURE - Set `loadingKey` to false, and `errorCode` - for example 401, 404...
 *
 * stateKey, errorCode and loadingKey are prepended with the name of the action,
 * for example an action getData would lead to:
 *
 * mutations:
 *   GET_DATA_SUCCESS,
 *   GET_DATA_PENDING,
 *   GET_DATA_FAILURE
 *
 * state:
 *   getDataLoadingKey,
 *   getDataStateKey,
 *   getDataErrorCode
 *
 * Note we use Vue.set, simply doing state[loadingKey] will not work, because the property needs
 * to be present initially for it to be included in the Vue reactivity system. Vue.set allows us
 * to add a reactive property dynamically.
 */
Object.keys(types).forEach(type => {
    mutations[types[type].BASE] = (state, payload) => {
        switch (payload.type) {
            case types[type].PENDING:
                return Vue.set(state, types[type].loadingKey, payload.value)

            case types[type].SUCCESS:
                Vue.set(state, types[type].statusCode, payload.statusCode)
                return Vue.set(state, types[type].stateKey, payload.data)

            case types[type].FAILURE:
                return Vue.set(state, types[type].statusCode, payload.statusCode)
        }
    }
})

const getTitleOnly = (response) => {
    return response.data.title
}

const actions = {
    getAsync(store, payload) {
        return doAsync(
            store, {
                url :payload.url, method: 'GET', data: {}, mutationTypes: types.GET_INFO_ASYNC/*, callback: getTitleOnly*/
            })
    },
    postAsync(store, payload) {
        return doAsync(
            store, {
                url :payload.url, method: 'POST', data: payload.data, mutationTypes: types.POST_INFO_ASYNC/*, callback: getTitleOnly*/
            })
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})
