import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

  const navigate = useNavigate()

  const { toyId } = useParams()

  useEffect(() => {
    if (!toyId) return
    loadToy()
  }, [])

  function loadToy() {
    toyService.getById(toyId)
      .then(toy => setToyToEdit(toy))
      .catch(err => {
        showErrorMsg('Had issues in toy edit', err)
        navigate('/toy')
      })
  }

  function handleChange({ target }) {
    let { value, type, name: field } = target
    value = type === 'number' ? +value : value
    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
  }

  function onSave(ev) {
    ev.preventDefault()
    if (!toyToEdit.price) toyToEdit.price = 100
    const toyToSave = {
      ...toyToEdit,
      inStock: (toyToEdit.inStock) ? true : false
    }

    saveToy(toyToSave)
      .then(() => {
        showSuccessMsg('toy Saved!')
        navigate('/toy')
      })
      .catch(err => {
        showErrorMsg('Had issues in toy details', err)
      })
  }

  function isInStock() {
    return toyToEdit.inStock
  }

  if (!toyToEdit) return <div>Loading...</div>

  return (
    <form onSubmit={onSave} className="container edit-form" action="">
      <div>
        <label>
          <span>Name </span>
          <input
            className="edit-input name-input"
            value={toyToEdit.name}
            onChange={handleChange}
            type="text"
            name="name" />
        </label>
      </div>
      <div>
        <label>
          <span>Price </span>
          <input
            className="edit-input price-input"
            value={toyToEdit.price}
            onChange={handleChange}
            type="number"
            name="price" />
        </label>
      </div>
      <div>
        <select value={isInStock()} onChange={handleChange} name="inStock" className='edit-input'>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <button onClick={onSave} className="save-toy-btn">Save</button>
    </form>
  )
}