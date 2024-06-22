import { useEffect, useState } from 'react'
import {
  updateSingleUser,
  updateUserPassword,
} from '../../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components'
import { Loading, Error, UserInfo, FormRow } from '../../components'
const initialState = {
  name: '',
  email: '',
  oldPassword: '',
  newPassword: '',
}

const SettingsPage = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((store) => store.user)
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
      <div className="customer-info">
        <h3>Single Customer Info</h3>
        <UserInfo {...user} page="single-customers" />
        <form className="form" onSubmit={onSubmit}>
          {!isResetPassword ? (
            <>
              <h3>Update User Info</h3>
              <FormRow
                name="name"
                value={userInfo.name}
                type="text"
                handleChange={handleChange}
              />
              <FormRow
                name="email"
                value={userInfo.email}
                type="email"
                handleChange={handleChange}
              />
            </>
          ) : (
            <>
              <h3>Reset Password</h3>
              <FormRow
                name="oldPassword"
                labelText="Old Password"
                value={userInfo.oldPassword}
                type="password"
                handleChange={handleChange}
              />
              <FormRow
                name="newPassword"
                labelText="New Password"
                value={userInfo.newPassword}
                type="password"
                handleChange={handleChange}
              />
            </>
          )}
          <button
            type="button"
            className="btn btn-block secondary-btn"
            onClick={() => {
              setUserInfo(initialState)
              setIsResetPassword(!isResetPassword)
            }}
          >
            Reset Password
          </button>
          <button type="submit" className="btn btn-block primary-btn">
            Update Info
          </button>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-chocolate);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
`

export default SettingsPage
