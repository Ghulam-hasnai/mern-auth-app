import React, { useEffect, useState } from "react";

function Home() {
  const [loggedUser, setLoggedUser] = useState("");
  const [products, setProducts] = useState([]);
  const userName = localStorage.getItem("loggedUser");

  
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:8000/products", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const result = await response.json();
      setProducts(result);
    }
    setLoggedUser(userName);
    fetchProducts();
  }, []);
  
  console.log(products);

  return (
    <div className="container">
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <h4 className="my-4">{loggedUser}</h4>
        <ul>
        {products.map(item =><li>{item.name} : {item.price}</li> )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
