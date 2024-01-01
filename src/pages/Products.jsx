import React, { useState } from "react";
import "./Products.css";

const Products = () => {
  const productsPerPage = 5; // Number of products to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "Description 1",
      price: 20,
      quantity: 5,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description 2",
      price: 30,
      quantity: 3,
      category: "Clothing",
    },
    // Add more initial products as needed
  ]);

  const [productForm, setProductForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productForm.id !== null) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productForm.id ? { ...productForm } : product
        )
      );
    } else {
      setProducts((prevProducts) => [
        ...prevProducts,
        { ...productForm, id: Date.now() },
      ]);
    }

    setProductForm({
      id: null,
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
    });
  };

  const handleDelete = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleEdit = (product) => {
    setProductForm({ ...product });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="product-container">
      <h1 className="product-heading">Quản Lý Hàng Hóa</h1>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="product-form">
        <label>
        Tên mục hàng:
          <input
            type="text"
            name="name"
            value={productForm.name}
            onChange={handleFormChange}
            className="product-input"
          />
        </label>
        <label>
        Mô tả mục hàng:
          <input
            type="text"
            name="description"
            value={productForm.description}
            onChange={handleFormChange}
            className="product-input"
          />
        </label>
        <label>
          Giá
          <input
            type="number"
            name="price"
            value={productForm.price}
            onChange={handleFormChange}
            className="product-input"
          />
        </label>
        <label>
        Số lượng:
          <input
            type="number"
            name="quantity"
            value={productForm.quantity}
            onChange={handleFormChange}
            className="product-input"
          />
        </label>
        <label>
        Loại mục hàng:
          <input
            type="text"
            name="category"
            value={productForm.category}
            onChange={handleFormChange}
            className="product-input"
          />
        </label>
        <button className="edit product-submit" type="submit">
          Lưu
        </button>
      </form>

      {/* Product List */}
      <table className="product-table">
        <thead>
          <tr>
            <th className="product-cell">ID</th>
            <th className="product-cell">Tên mục hàng</th>
            <th className="product-cell">Mô tả</th>
            <th className="product-cell">Giá</th>
            <th className="product-cell">Số lượng</th>
            <th className="product-cell">Loại</th>
            <th className="product-cell">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td className="product-cell">{product.id}</td>
              <td className="product-cell">{product.name}</td>
              <td className="product-cell">{product.description}</td>
              <td className="product-cell">${product.price}</td>
              <td className="product-cell">{product.quantity}</td>
              <td className="product-cell">{product.category}</td>
              <td className="product-cell">
                <button
                  className="edit product-action"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="edit product-action"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(products.length / productsPerPage),
        }).map((_, index) => (
          <button
            className="edit pagination-button"
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
