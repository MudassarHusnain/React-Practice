import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products', { headers: { Authorization: token } });
        console.log(response.data);
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      fetchProducts();
    }
  }, [token]); // Add token as a dependency to useEffect

  return (
    <div>
    {token?
      Array.isArray(products) && products.length > 0 ?
        <ol>
          {products.map((item, index) => (
            <li key={index}>
              <span>Name: {item.name}</span>
              <p>Price: {item.price}</p>
            </li>
          ))}
        </ol>
       :
        <p>No products available.</p>
      : <><p>Please Sign in First.</p>
        <button onClick={()=> navigate('/')}>Sign IN</button></>}
    </div>
  );
};

export default Products;
