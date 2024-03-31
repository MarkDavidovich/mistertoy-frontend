import React from 'react'

export function ToyPreview({ toy, user, onRemove }) {
  const { name, inStock, price, labels, _id } = toy
  return (
    <>
      <button onClick={() => onRemove(_id)} className="btn-remove">X</button>
      <section className="toy-detail-preview">
        <div className='toy-name'>
          {name}
        </div>
        <div className='toy-labels'>
          {labels.map(label => (<span key={label}>{label}</span>))}
        </div>

        <img src={`https://robohash.org/${name}`} alt="toy" />

        <div>
          In Stock: {(inStock) ? 'Yes' : 'No'}
        </div>
        <div>
          Price: {`${price}`}
        </div>
        <div className="editing-toy-btn">
          {user && user.isAdmin && (
            <>
              <Link to={`/toy/edit/${_id}`}>
                <button size="small">Edit</button>
              </Link>
            </>
          )}
          <Link to={`/toy/details/${_id}`}>
            <button className='learn-btn' size="small">Learn More</button>
          </Link>
        </div>
      </section>
    </>
  )
}