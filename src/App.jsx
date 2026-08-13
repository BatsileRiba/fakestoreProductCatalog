import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch('https://fakestoreapi.com/products'); //fetch data from the API

        if (!response.ok) {
          throw new Error('Network Error');
        }

        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) //filter products based on the search query, ignoring case
  );

  return (
    <div className="app">
      <h1>FakeStore Product Catalog.</h1>

      <input
        type="text"
        placeholder="Search our catalog..."
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />

      {loading && <p className="status">Loading...</p>}

      {error && (
        <p className="status error">
          Oopss, failed to load products. Please try refreshing the page :).
        </p> //show an error message if there was an error fetching the products
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="status">No products found.</p>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="products">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="price">R{product.price*15}</p>
              <p className="category">{product.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;