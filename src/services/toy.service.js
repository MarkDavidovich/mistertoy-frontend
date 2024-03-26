import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

//! This service does not use http

const STORAGE_KEY = 'toyDB'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter
}

function query(filterBy = {}) {
  return storageService.query(STORAGE_KEY)
    .then(toys => {
      if (!filterBy.txt) filterBy.txt = ''
      if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
      const regExp = new RegExp(filterBy.txt, 'i')
      return toys.filter(toy =>
        regExp.test(toy.name) &&
        toy.price <= filterBy.maxPrice
      )
    })
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  // return Promise.reject('Not now!')
  return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    // when switching to backend - remove the next line
    // toy.owner = userService.getLoggedinUser()
    return storageService.post(STORAGE_KEY, toy)
  }
}

function getEmptyToy() {
  return {
    name: _getRandomToyName(),
    price: utilService.getRandomIntInclusive(50, 200),
    labels: _getRandomToyLabels(),
    createdAt: Date.now(),
    inStock: true,
  }
}

function getDefaultFilter() {
  return { txt: '', maxPrice: '' }
}

function _getRandomToyName() {
  const toyNames = [
    "Turbo Twister",
    "Robo-Racer",
    "Skate Surfer",
    "Mega Mech",
    "Dino Dash",
    "Galactic Gadget",
    "Speedy Space",
    "Jungle Jumper",
    "Magic Marble",
    "Adventure Aviator",
    "Pirate's Plunder",
    "Rainbow Rocket",
    "Zoom Zephyr",
    "Construction Crew",
    "Monster Truck"
  ]

  const randomToyIdx = utilService.getRandomIntInclusive(0, toyNames.length - 1)
  return toyNames[randomToyIdx]
}

function _getRandomToyLabels() {
  const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered'
  ]

  const labelsLength = utilService.getRandomIntInclusive(1, 4)
  const randLabels = []

  for (let i = 0; i < labelsLength; i++) {
    const randIdx = utilService.getRandomIntInclusive(0, labels.length - 1)
    const randLabel = labels[randIdx]
    randLabels.push(randLabel)
  }

  return randLabels
}
