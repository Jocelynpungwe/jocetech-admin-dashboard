import styled from 'styled-components'

const StatItem = ({ count, title, icon, color, bcg }) => {
  return (
    <Wrapper color={color} bcg={bcg} className="wrapper-container">
      <h5 className="title">{title}</h5>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
    </Wrapper>
  )
}
const Wrapper = styled.article`
  border-bottom: 5px solid var(--black);
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .count {
    display: block;
    font-weight: 700;
    font-size: 2rem;
    color: var(--black);
  }

  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
`
export default StatItem
