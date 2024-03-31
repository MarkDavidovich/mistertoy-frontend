import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { toyService } from '../services/toy.service'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  async function loadToy() {
    try {
      const toy = await toyService.getById(toyId)
      setToy(toy)
    } catch (err) {
      showErrorMsg('Can\'t load toy', err)
      navigate('/toy')
    }
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  if (!toy) return <div>Loading...</div>
  return (
    <section className="toy-details">
      <h1>Toy name: {toy.name}</h1>
      <h5>Price: ${toy.price}</h5>
      <h2>Labels: {toy.labels.join(' | ')}</h2>
      <h2>Made at: {formatDate(toy.createdAt)}</h2>
      <h2>In stock: {(toy.inStock) ? 'yes' : 'no'}</h2>
      <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
      <Link to={`/toy`}>Back</Link>
    </section>
  )
}