import React from 'react'

export function ToyPreview({ toy, onRemove }) {
  return (<>
    <button onClick={() => onRemove(toy._id)} className="btn-remove">X</button>
    <div className='toy-name'>
      {toy.name}
    </div>
    <div className='toy-labels'>
      {toy.labels.map(label => (<span key={label}>{label}</span>))}
    </div>

    <img src={`https://robohash.org/${toy.name}`} alt="toy" />

    <div>
      In Stock: {(toy.inStock) ? 'Yes' : 'No'}
    </div>
    <div>
      Price: {`${toy.price}`}
    </div>
  </>
  )
}