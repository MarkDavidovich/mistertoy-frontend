// import { toyService } from "../../services/toy.service.js"
//! for now, I am using storageService instead of toyService, may need to change later
import { storageService } from "../../services/async-storage.service.js"
// import { showSuccessMsg } from "../../services/event-bus.service.js"
import { ADD_TOY, TOY_UNDO, REMOVE_TOY, SET_TOYS, SET_FILTER_BY, SET_IS_LOADING, UPDATE_TOY } from "../reducers/toy.reducer.js"
import { store } from "../store.js"

export function loadToys() {
  const filterBy = store.getState().toyModule.filterBy
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return storageService.query(filterBy)
    // return toyService.query(filterBy)
    .then(toys => {
      store.dispatch({ type: SET_TOYS, toys })
    })
    .catch(err => {
      console.log('toy action -> Cannot load toys', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function removeToy(toyId) {
  // return toyService.remove(toyId)
  return storageService.remove(toyId)
    .then(() => {
      store.dispatch({ type: REMOVE_TOY, toyId })
    })
    .catch(err => {
      console.log('toy action -> Cannot remove toy', err)
      throw err
    })
}

export function removeToyOptimistic(toyId) {
  store.dispatch({ type: REMOVE_TOY, toyId })
  // return toyService.remove(toyId)
  return storageService.remove(toyId)
    .then(() => {
      console.log('removed toy!')
      // showSuccessMsg('Removed toy!')
    })
    .catch(err => {
      store.dispatch({ type: TOY_UNDO })
      console.log('toy action -> Cannot remove toy', err)
      throw err
    })
}

export function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  // return toyService.save(toy)
  return storageService.save(toy)
    .then(savedToy => {
      store.dispatch({ type, toy: savedToy })
      return savedToy
    })
    .catch(err => {
      console.log('toy action -> Cannot save toy', err)
      throw err
    })
}

export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy })
}