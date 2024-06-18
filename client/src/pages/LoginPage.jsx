import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Logo, FormRow } from '../components'

import { toast } from 'react-toastify'

import { registerUser, loginUser } from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
}

const LoginPage = () => {
  const [values, setValues] = useState(initialState)
  const { isLoading, user } = useSelector((store) => store.user)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues((prevData) => {
      return { ...prevData, [name]: value }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = values

    if (!email || !password) {
      toast.error('Please Fill Out All Fields')
      return
    }
    dispatch(loginUser({ email, password }))
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        <FormRow
          name="email"
          value={values.email}
          type="email"
          handleChange={handleChange}
        />
        <FormRow
          name="password"
          value={values.password}
          type="password"
          handleChange={handleChange}
        />
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(loginUser({ email: 'test@gmail.com', password: 'secret' }))
          }}
        >
          {isLoading ? 'loading...' : 'admin demo'}
        </button>
        <button type="submit" className="btn btn-block primary-btn">
          {isLoading ? 'loading...' : 'submit'}
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
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

export default LoginPage
