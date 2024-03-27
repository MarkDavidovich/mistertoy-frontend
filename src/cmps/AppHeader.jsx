import { NavLink } from 'react-router-dom'
import React from 'react'

export function AppHeader() {

  return (
    <header className="main-header">
      <section className="header-nav container">
        <h1>Toys app!</h1>
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/toy" >Toys</NavLink>
      </section>
    </header>
  )
}
