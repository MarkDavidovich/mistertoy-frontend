import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, setFilterBy, setSortBy } from '../store/actions/toy.actions.js'

export function ToyIndex() {
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToys(filterBy, sortBy)
  }, [filterBy, sortBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onSetSort(sortBy) {
    setSortBy(sortBy)
  }

  async function onRemove(toyId) {
    try {
      await removeToy(toyId)
      showSuccessMsg('Toy removed')
    } catch (err) {
      showErrorMsg('Cannot remove toy', err)
    }
  }

  return (
    <div className='toy-container'>
      <section className='main-container'>
        {user && user.isAdmin && (
          <button className="add-btn">
            <Link to="/toy/edit">Add new toy</Link>
          </button>
        )}
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <ToySort sortBy={sortBy} onSetSort={onSetSort} />
      </section>
      {!isLoading && (
        <ToyList
          toys={toys}
          user={user}
          onRemove={onRemove}
        />
      )}
      {isLoading && <div>Loading...</div>}
    </div>
  )
}

