import { useEffect, useState } from 'react'
import {
  updateSingleUser,
  updateUserPassword,
} from '../../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'
import { UserInfo, FormRow } from '../../components'
const initialState = {
  name: '',
  email: '',
  oldPassword: '',
  newPassword: '',
}

const SettingsPage = () => {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector((store) => store.user)
  const [userInfo, setUserInfo] = useState(initialState)
  const [isResetPassword, setIsResetPassword] = useState(false)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserInfo((prevData) => {
      return { ...prevData, [name]: value }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, oldPassword, newPassword } = userInfo

    if (isResetPassword) {
      if (!oldPassword || !newPassword) {
        toast.error('Please Fill Out Both Password Fields')
        return
      }
      dispatch(updateUserPassword({ oldPassword, newPassword }))
    } else {
      if (!email || !name) {
        toast.error('Please Fill Out All Fields')
        return
      }
      dispatch(updateSingleUser({ email, name }))
    }
    setUserInfo(initialState)
  }

  return (
    <Wrapper>
      <div className="wrapper-container customer-info">
        <h3 className="title">Settings</h3>
        <UserInfo {...user} page="single-customers" />
        <form onSubmit={onSubmit}>
          {!isResetPassword ? (
            <>
              <h5>Update User Info</h5>
              <div className="form-row">
                <label htmlFor="name" className="form-label">
                  name
                </label>
                <input
                  name="name"
                  value={userInfo.name}
                  type="text"
                  handleChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <label htmlFor="email" className="form-label">
                  email
                </label>
                <input
                  name="email"
                  value={userInfo.email}
                  type="email"
                  handleChange={handleChange}
                  className="form-input"
                />
              </div>
            </>
          ) : (
            <>
              <h5>Reset Password</h5>
              <div className="form-row">
                <label htmlFor="oldPassword" className="form-label">
                  Old Password
                </label>
                <input
                  FormRow
                  name="oldPassword"
                  value={userInfo.oldPassword}
                  type="password"
                  handleChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  name="newPassword"
                  value={userInfo.newPassword}
                  type="password"
                  handleChange={handleChange}
                  className="form-input"
                />
              </div>
            </>
          )}
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block secondary-btn"
              disabled={isLoading}
              onClick={() => {
                setUserInfo(initialState)
                setIsResetPassword(!isResetPassword)
              }}
            >
              {isLoading
                ? 'loading...'
                : isResetPassword
                ? 'Update User'
                : 'Reset Password'}
            </button>
            <button
              type="submit"
              className="btn btn-block"
              disabled={isLoading}
            >
              {isLoading ? 'loading...' : 'Update Info'}
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  form {
    padding: 2rem;
    background-color: var(--white);
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
  }

  .btn {
    margin: 1rem 0;
  }

  @media (min-width: 768px) {
    .btn-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 0.7rem;
    }
  }
`

export default SettingsPage
