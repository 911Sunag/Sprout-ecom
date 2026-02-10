import Navbar from './Navbar'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

const Header = () => {
  const products = useSelector((state: RootState) => state.products.items);

  return (
    <>
      <Navbar/>
      <main className='min-h-screen'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 space-y-5 p-0'>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              unit={product.unit}
              rating={product.rating}
              onSale={product.onSale}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default Header