import Vue from 'vue'
import Vuex from 'vuex'
import doAsync from './async-util'
import * as types from './mutation-types'

Vue.use(Vuex)

const state = {
    'getInfoAsyncData' : [
        {"x": 0, "y": 0, "w": 6, "h": 8, "i": "pictures", "maxH": 10, "maxW": 12},
        {"x": 6, "y": 0, "w": 6, "h": 2, "i": "title", "maxH": 10, "maxW": 12},
        {"x": 6, "y": 2, "w": 6, "h": 3, "i": "description", "maxH": 10, "maxW": 12},
        {"x": 6, "y": 5, "w": 6, "h": 1, "i": "price", "maxH": 10, "maxW": 12},
        {"x": 6, "y": 6, "w": 6, "h": 1, "i": "availabilty", "maxH": 10, "maxW": 12},
        {"x": 6, "y": 7, "w": 6, "h": 1, "i": "add_cart", "maxH": 10, "maxW": 12}
    ]
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

/*const getTitleOnly = (response) => {
    return response.data.title
}*/

const wellFormated = (response) => {
    if(typeof response == 'object' && 'data' in response && Array.isArray(response.data)){
        //on vérifie le premier élément
        if('x' in response.data[0] && 'y' in response.data[0] && 'w' in response.data[0] && 'h' in response.data[0] && 'i' in response.data[0] && 'max-v' in response.data[0] && 'max-h' in response.data[0]){
            return response.data
        }
    }

    return [];


}

const actions = {
    getAsync(store, payload) {
        return doAsync(
            store, {
                url :payload.url, method: 'GET', data: {}, mutationTypes: types.GET_INFO_ASYNC, callback: wellFormated
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
