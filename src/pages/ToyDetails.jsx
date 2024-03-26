import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const { toys } = useSelector(storeState => storeState.toyModule)

  const navigate = useNavigate()

  useEffect(() => {
    console.log('carId:', toyId)
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    const currentToy = toys.filter(toy => toy._id === toyId)[0]
    console.log('toys:', toys)
    console.log(currentToy)
    if (!currentToy) navigate('/toy')
    setToy(currentToy)

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