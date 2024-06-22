import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../../features/user/userSlice'
import styled from 'styled-components'
import { Error, Loading, UserInfo } from '../../components'

const CustomersPage = () => {
  const dispatch = useDispatch()
  const {
    allUser,
    isLoading: loading,
    isError: error,
  } = useSelector((store) => store.user)
  useEffect(() => {
    dispatch(getAllUser())
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error />
  }
  console.log(allUser)
  return (
    <Wrapper>
      <h3>All Customers</h3>
      {allUser.map((user, index) => {
        return <UserInfo {...user} key={index} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: var(--white);
  padding: 2rem;
`

export default CustomersPage
