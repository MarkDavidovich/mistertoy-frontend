import {
  combineReducers,
  compose,
  legacy_createStore as createStore
} from "redux"

import { toyReducer } from "./reducers/toy.reducer.js"
//TODO add user reducer

const rootReducer = combineReducers({
  toyModule: toyReducer,
  //TODO add user module
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store