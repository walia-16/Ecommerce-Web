import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

{/* we get a props from latest collection and destructuring directly by using {}*/}
const ProductItem = ({id,image,name,price}) => {

  const {currency} = useContext(ShopContext)

{/* By using backticks (`) and ${}, we can dynamically add the value of id directly into the string. but in these case It’s a URL path in the form of a string, where ${id} dynamically inserts the id value. When used inside a <Link to={`/product/${id}`}> component in React Router, it becomes a clickable link that navigates to the /product/{id} page. */}
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out'  src={image[0]} alt="" />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem