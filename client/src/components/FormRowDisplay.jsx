import { useRef } from 'react'
import styled from 'styled-components'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { handleRemove } from '../features/product/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import Error from './Error'

const FormRowDisplay = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  imageArray,
  placeholder,
  handleSubmit,
  btnText,
}) => {
  const dispatch = useDispatch()

  return (
    <Wrapper className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <div
        className={
          name === 'image'
            ? 'form-image-container'
            : name === 'valueColor'
            ? 'form-color-container'
            : 'form-box-container'
        }
        style={{ marginBottom: '1rem' }}
      >
        {imageArray.length > 0 &&
          imageArray.map((c, index) => {
            const valueReturn =
              name === 'image' ? (
                <div key={index}>
                  <button
                    type="button"
                    className="close-btn btn-danger"
                    data-removeimage={c}
                    onClick={(e) =>
                      dispatch(
                        handleRemove({
                          name,
                          data: e.currentTarget.dataset.removeimage,
                        })
                      )
                    }
                  >
                    <IoIosCloseCircleOutline />
                  </button>
                  <img src={c} alt="new product" />
                </div>
              ) : name === 'valueColor' ? (
                <div key={index}>
                  <button
                    type="button"
                    className="close-btn btn-danger"
                    data-removecolor={c}
                    onClick={(e) =>
                      dispatch(
                        handleRemove({
                          name,
                          data: e.currentTarget.dataset.removecolor,
                        })
                      )
                    }
                  >
                    <IoIosCloseCircleOutline />
                  </button>
                  <div
                    style={{ backgroundColor: c }}
                    className="color-span"
                  ></div>
                </div>
              ) : name === 'valueBox' ? (
                <div key={c} className="box-value-info">
                  <p>
                    <span key={c} style={{ color: 'var(--primary-900)' }}>
                      {c.substring(0, 3)}
                    </span>
                    {c.substring(3)}
                  </p>
                  <button
                    type="button"
                    className="close-btn btn-danger"
                    data-removebox={c}
                    onClick={(e) =>
                      dispatch(
                        handleRemove({
                          name,
                          data: e.currentTarget.dataset.removebox,
                        })
                      )
                    }
                  >
                    <IoIosCloseCircleOutline />
                  </button>
                </div>
              ) : (
                ''
              )
            return valueReturn
          })}
      </div>
      {type === 'file' ? (
        <input
          id={name}
          type={type}
          value={value}
          name={name}
          accept="image/*"
          onChange={handleChange}
          className="form-input"
        />
      ) : (
        <>
          <input
            id={name}
            type={type}
            value={value}
            name={name}
            onChange={handleChange}
            className="form-input"
            placeholder={placeholder}
          />
          <button
            type="button"
            className="secondary-btn"
            style={{ marginTop: '0.6rem' }}
            onClick={handleSubmit}
          >
            {btnText}
          </button>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .form-image-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;
  }

  .form-color-container {
    display: flex;
  }

  .color-span {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    margin-right: 0.4rem;
    border: 2px solid var(--grey-100);
  }

  .image-input {
    height: 350px;
  }

  .form-box-container {
    p {
      margin: 0;
      margin-bottom: 0.7rem;
    }
  }

  .box-value-info {
    display: flex;
    column-gap: 5px;
    .close-btn {
      margin-bottom: 8px;
    }
  }

  .close-btn {
    background-color: transparent;
    border: none;
    color: var(--red-dark);
  }
`

export default FormRowDisplay
