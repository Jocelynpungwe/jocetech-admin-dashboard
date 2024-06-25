import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filtersUpdate, getAllUser } from '../../features/user/userSlice'
import styled from 'styled-components'
import { Error, Loading, UserInfo } from '../../components'

const CustomersPage = () => {
  const dispatch = useDispatch()
  const {
    searchUser,
    text,
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
  console.log(searchUser)
  return (
    <Wrapper className="wrapper-container">
      <h3 className="title">All Customers</h3>
      <form>
        <input
          type="text"
          name="text"
          value={text}
          placeholder="search"
          onChange={(e) => dispatch(filtersUpdate(e.target.value))}
          className="search-input"
        />
      </form>
      {searchUser.map((user, index) => {
        return <UserInfo {...user} key={index} />
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .search-input {
    padding: 0.5rem;
    background: var(--grey-50);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    margin-bottom: 1rem;
  }
`

export default CustomersPage
