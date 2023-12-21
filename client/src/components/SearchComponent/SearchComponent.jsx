import React, { useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { searchProduct } from '../../services/ProductService'
import { useNavigate } from 'react-router-dom'

const SearchComponent = props => {
  const navigate = useNavigate()
  const [term, setTerm] = useState('')
  const [products, setProducts] = useState([])
  const {
    size,
    placeholder,
    textbutton,
    bordered = false,
    backgroundColorInput = '#fff',
    backgroundColorButton = '#000',
    colorButton = '#fff'
  } = props

  useEffect(() => {
    if (term?.trim()?.length > 0) {
      searchProduct(term?.trim()).then(({ data }) => {
        setProducts(data)
      })
    } else {
      setProducts([])
    }
  }, [term])
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        backgroundColor: '#fff',
        position: 'relative'
      }}
    >
      <div className='relative w-full'>
        <InputComponent
          value={term}
          onChange={e => {
            setTerm(e.target.value)
          }}
          size={size}
          placeholder={placeholder}
          bordered={bordered}
          style={{ backgroundColor: backgroundColorInput }}
          {...props}
        />
        {products?.length > 0 && (
          <div className='absolute top-11 z-[100000] w-full bg-white shadown-md  h-min p-1 rounded-md'>
            {products.map(product => (
              <div
                className='w-full p-1 cursor-pointer flex hover:bg-gray-200 gap-2 rounded mb-1 item-center'
                onClick={() => {
                  navigate('/product-details/' + product._id)
                }}
              >
                <img
                  src={product.images[0]}
                  alt=''
                  className='w-[30px] h-[30px] block object-cover rounded'
                />
                <div className='flex flex-col justify-center'>
                  <p className='text-sm '>{product.name}</p>
                  <p className='text-[12px] text-red-500 leading-[0.7]'>
                    {product.price} đ
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ButtonComponent
        size={size}
        styleButton={{
          background: backgroundColorButton,
          border: !bordered && 'none',
          borderRadius: '0'
        }}
        icon={<SearchOutlined color={colorButton} style={{ color: '#fff' }} />}
        textbutton={textbutton}
        styleTextButton={{ color: colorButton }}
      />
    </div>
  )
}

export default SearchComponent
