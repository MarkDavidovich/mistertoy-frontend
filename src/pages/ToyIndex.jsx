import { Link, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilterBy, setSortBy } from '../store/actions/toy.actions.js'


export function ToyIndex() {
  const navigate = useNavigate()
  const toys = useSelector(storeState => storeState.toyModule.toys)
  const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
  const sortBy = useSelector(storeState => storeState.toyModule.sortBy)

  useEffect(() => {
    loadToys(filterBy, sortBy)
      .then(() => {
        showSuccessMsg('Toys loaded successfully')
      })
      .catch((err) => {
        showErrorMsg('Could not low toys', err)
      })
  }, [filterBy, sortBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onSetSort(sortBy) {
    setSortBy(sortBy)
  }

  function onRemove(toyId) {
    removeToy(toyId)
      .then(() => {
        showSuccessMsg('Toy removed')
      })
      .catch(err => {
        showErrorMsg('Cannot remove toy', err)
      })
  }

  if (!toys || !toys.length) return <div>Loading...</div>

  return (
    <div className='toy-app'>
      <section className='main-control-container'>
        <Link to="/toy/edit" className='add-btn'>Add Toy</Link>
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        <ToySort sortBy={sortBy} onSetSort={onSetSort} />
      </section>
      <ToyList
        toys={toys}
        onRemove={onRemove}
      />
    </div>
  )
}

