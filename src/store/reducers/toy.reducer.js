import { toyService } from "../../services/toy.service.js"


export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_LABLES = 'SET_LABLES'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORTBY = 'SET_SORTBY'
export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
  toys: [],
  filterBy: toyService.getDefaultFilter(),
  sortBy: toyService.getDefaultSort(),
  lables: ['Doll', 'Art', 'Battery Powered', 'Talking', 'Beauty', 'Girls', 'Animal', 'Trip', 'Sport', 'Ride']
}

export function toyReducer(state = initialState, action) {
  let toys

  switch (action.type) {
    case SET_TOYS:
      return { ...state, toys: action.toys }
    case REMOVE_TOY: {
      toys = state.toys.filter(toy => toy._id !== action.toyId)
      return { ...state, toys }
    }
    case ADD_TOY:
      toys = [...state.toys, action.toy]
      return { ...state, toys }
    case UPDATE_TOY:
      toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
      return { ...state, toys }
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...state.filterBy, ...action.filterBy }
      }
    case SET_SORTBY:
      return {
        ...state,
        sortBy: { ...state.sortBy, ...action.sortBy }
      }
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading }

    default:
      return state
  }
}