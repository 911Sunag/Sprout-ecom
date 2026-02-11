import Navbar from './Navbar'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import Promotions from './Promotions'

const Header = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const searchTerm = useSelector((state: RootState) => state.products.searchTerm);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className='min-h-screen'>
        <Promotions />
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 space-y-5 p-0'>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              unit={product.unit}
              rating={product.rating}
              onSale={product.onSale}
              description={product.description}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default Header