import React, { useState, useEffect } from "react";
import "./storage.css";

const Storage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "Jeans",
        category: "Clothing",
        storageLocation: "Closet A1",
      },
      {
        id: 2,
        name: "T-shirt",
        category: "Clothing",
        storageLocation: "Closet B2",
      },
      {
        id: 3,
        name: "Dress",
        category: "Clothing",
        storageLocation: "Wardrobe A3",
      },
      {
        id: 4,
        name: "Sweater",
        category: "Clothing",
        storageLocation: "Wardrobe B4",
      },
      {
        id: 5,
        name: "Shorts",
        category: "Clothing",
        storageLocation: "Drawer A5",
      },
      {
        id: 6,
        name: "Jacket",
        category: "Clothing",
        storageLocation: "Coat Rack B6",
      },
      {
        id: 7,
        name: "Skirt",
        category: "Clothing",
        storageLocation: "Drawer A7",
      },
      {
        id: 8,
        name: "Blouse",
        category: "Clothing",
        storageLocation: "Closet B8",
      },
    ];

    setProducts(mockData);
    setFilteredProducts(mockData);
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="storage-container">
      <h1 className="storage-heading">Storage Management</h1>
      <input
        type="text"
        placeholder="Search by category"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="storage-input"
      />
      <table className="storage-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Storage Location</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id} className="storage-row">
              <td className="storage-cell">{product.id}</td>
              <td className="storage-cell">{product.name}</td>
              <td className="storage-cell">{product.category}</td>
              <td className="storage-cell">{product.storageLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(filteredProducts.length / productsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className="edit pagination-button"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Storage;
