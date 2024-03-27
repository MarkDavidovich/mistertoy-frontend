import { ToyPreview } from "./ToyPreview.jsx"
import { NavLink } from 'react-router-dom'

export function ToyList({ toys, onRemoveToy, onEditToy, }) {
  console.log('List rendered')

  return (
    <div className="toy-list">
      {toys.map(toy =>
        <div className="toy-card" key={toy._id} >
          <ToyPreview toy={toy} onRemove={onRemove} />

          <section className="toy-prev-btns">
            <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink>
            <NavLink to={`/toy/details/${toy._id}`}>Details</NavLink>
          </section>
        </div>
      )}
    </div>
  )
}
