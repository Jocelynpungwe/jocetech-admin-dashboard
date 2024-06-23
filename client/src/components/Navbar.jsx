import React from 'react'
import styled from 'styled-components'
import { FaUserCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import Logo from './Logo'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser, toggleSideBar } from '../features/user/userSlice'

const Navbar = () => {
  const { user, isSideBarOpen } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [showLogout, setShowLogout] = useState(false)

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSideBar())}
        >
          <FiMenu />
        </button>
        <div>
          {isSideBarOpen && (
            <div className="logo-nav">
              <Logo />
            </div>
          )}
          <div className="logo">
            <Logo />
          </div>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout((prevData) => !prevData)}
          >
            <FaUserCircle />
            {user.name}
            {showLogout ? <FaCaretDown /> : <FaCaretUp />}
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(logoutUser('Logout Successful...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);

  .profile-picture {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--black);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  background: var(--white);
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-500);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--actual-white);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .logo-nav {
    display: none;
    margin: 0;
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    z-index: 999;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-nav {
      display: block;
    }
  }
`
export default Navbar
