import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { GET_TOY_BY_ID } from "../store/reducers/toy.reducer.js"

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('carId:', toyId)
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    const toy = dispatch({ GET_TOY_BY_ID, toyId })

    if (!toy) {
      console.log('could not get toy details')
      navigate('/toy')
    }
    setToy(toy)

    // toyService.getById(toyId)
    //   .then(toy => setToy(toy))
    //   .catch(err => {
    //     console.log('Had issues in toy details', err)
    // navigate('/toy')
    //   })
  }

  if (!toy) return <div>Loading...</div>
  return (
    <section className="toy-details">
      <h1>Toy name : {toy.name}</h1>
      <h5>Price: ${toy.price}</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
      <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
      <Link to={`/toy`}>Back</Link>
      {/* <p>
        <Link to="/toy/lqIQG">Next Car</Link>
      </p> */}
    </section>
  )
}