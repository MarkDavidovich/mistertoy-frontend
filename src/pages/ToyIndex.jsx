import { Link, useNavigate } from 'react-router-dom'
// useDispatch
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
// import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'

export function ToyIndex() {
  const navigate = useNavigate()
  // const [toysToDisplay, setToysToDisplay] = useState([])
  // const dispatch = useDispatch()
  const { toys, filterBy, isLoading } = useSelector(storeState => storeState.toyModule)

  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  // useEffect(() => {
  //   if (!toys) return
  //   setToysToDisplay(toys)
  // }, [toys])

  useEffect(() => {
    loadToys()
      .catch(err => {
        console.log('cannot load toys', err)
        // showErrorMsg('Cannot load toys!', err)
      })
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onRemoveToy(toyId) {
    removeToyOptimistic(toyId)
      .then(() => {
        console.log('toy removed')
        // showSuccessMsg('Toy removed')
      })
      .catch(err => {
        console.log('cannot remove toy', err)
        // showErrorMsg('Cannot remove toy', err)
      })
  }

  function onAddToy() {
    const toyToSave = toyService.getEmptyToy()
    saveToy(toyToSave)
      .then((savedToy) => {
        console.log(`car added (id: ${savedToy._id})`)
        // showSuccessMsg(`Car added (id: ${savedToy._id})`)
      })
      .catch(err => {
        console.log('cannot add car', err)
        // showErrorMsg('Cannot add car', err)
      })
  }

  function onEditToy(toy) {
    navigate(`/toy/edit/${toy._id}`)
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

