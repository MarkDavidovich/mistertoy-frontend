import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
// import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'

export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToys()
      .catch(err => {
        showErrorMsg('Cannot load toys!', err)
      })
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onRemoveToy(toyId) {
    removeToyOptimistic(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch(err => {
        showErrorMsg('Cannot remove toy', err)
      })
  }

  function onAddToy() {
    const toyToSave = toyService.getEmptyToy()
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Car added (id: ${savedToy._id})`)
      })
      .catch(err => {
        showErrorMsg('Cannot add car', err)
      })
  }

  function onEditToy(toy) {
    const price = +prompt('New price?')
    const toyToSave = { ...toy, price }

    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch(err => {
        showErrorMsg('Cannot update toy', err)
      })
  }

  // function addToCart(toy) {
  //   console.log(`Adding ${toy.name} to Cart`)
  //   dispatch({ type: ADD_TOY_TO_CART, toy })
  //   showSuccessMsg('Added to Cart')
  // }

  return (
    <div>
      <h3>Toys App</h3>
      <main>
        <Link to="/toy/edit">Add Toy</Link>
        <button className='add-btn' onClick={onAddToy}>Add Random Toy</button>
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        {!isLoading
          ? <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
            onEditToy={onEditToy}
          // addToCart={addToCart}
          />
          : <div>Loading...</div>
        }
        <hr />
      </main>
    </div>
  )
}
