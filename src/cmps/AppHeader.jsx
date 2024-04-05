import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { LoginSignup } from './LoginSignup.jsx'
import { logout } from '../store/actions/user.actions'
import { loadToys, setFilterBy, setSortBy } from '../store/actions/toy.actions.js'
import { useEffect } from 'react'

import React from 'react'

export function AppHeader() {

  
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  const navigate = useNavigate()

  async function onLogout() {
    try {
      await logout()
      showSuccessMsg('You have logged out')
      navigate('/')
    } catch (err) {
      showErrorMsg('Cannot log out', err)
    }
  }

  return (
    <header className="app-header">
      <h1>Toy Store.</h1>
      <nav className="nav-container">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/toy" className="toys-link">
          Our Toys
        </NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
      {user && (
        <section className="user-info">
          {/* <p>
            {user.fullname} <span>${user.score.toLocaleString()}</span>
          </p> */}
          <button onClick={onLogout}>Logout</button>
        </section>
      )}
      {!user && (
        <section className="user-info">
          <LoginSignup />
        </section>
      )}
    </header>
  )
}
