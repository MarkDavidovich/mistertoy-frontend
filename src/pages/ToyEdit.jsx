import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { saveToy } from "../store/actions/toy.actions"

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const navigate = useNavigate()
  const { toyId } = useParams()

  useEffect(() => {
    if (!toyId) return
    loadToy()
  }, [])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToyToEdit(toy)
    } catch (err) {
      showErrorMsg('Cannot load toy')
    }
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || 0
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }
    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
  }

  async function onSaveToy(ev) {
    ev.preventDefault()
    try {
      const savedToy = await saveToy(toyToEdit)
      showSuccessMsg(`Toy saved (id: ${savedToy._id})`)
      navigate('/toy')
      setToyToEdit(toyService.getEmptyToy())
    } catch (err) {
      console.log('Cannot save toy', err)
      showErrorMsg('Cannot save toy')
    }
  }

  if (!toyToEdit) return <div>Loading...</div>

  const { toyName, price, inStock } = toyToEdit


  return (
    <section className="toy-edit-container">
      <section className="toy-edit">
        <h2> {toyId ? 'Edit' : 'Add'} Toy</h2>
        <form onSubmit={onSaveToy} className="edit-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              required=""
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              placeholder="Toy name:"
              value={toyName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              required=""
              type="number"
              onChange={handleChange}
              name="price"
              id="price"
              placeholder="Toy price:"
              value={price}
            />
            <div className="form-group">
              <label htmlFor="available">Available:</label>
              <input
                type="checkbox"
                onChange={handleChange}
                name="inStock"
                id="available"
                checked={inStock}
              />
            </div>
          </div>
          <button className="form-submit-btn">Save</button>
        </form>
      </section>
    </section>
  )
}