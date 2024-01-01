import React, { useState } from "react";
import "./Inventory.css";

const Inventory = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Item 1",
      description: "Description 1",
      quantity: 10,
      category: "Electronics",
      status: "In Stock", // Thêm trạng thái hàng tồn vào đây
    },
    {
      id: 2,
      name: "Item 2",
      description: "Description 2",
      quantity: 0,
      category: "Clothing",
      status: "Out of Stock",
    },
    // Thêm các mục khác nếu cần
  ]);

  const [itemForm, setItemForm] = useState({
    id: null,
    name: "",
    description: "",
    quantity: "",
    category: "",
    status: "In Stock",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setItemForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (itemForm.id !== null) {
      setInventory((prevInventory) =>
        prevInventory.map((item) =>
          item.id === itemForm.id ? { ...itemForm } : item
        )
      );
    } else {
      setInventory((prevInventory) => [
        ...prevInventory,
        { ...itemForm, id: Date.now() },
      ]);
    }

    setItemForm({
      id: null,
      name: "",
      description: "",
      quantity: "",
      category: "",
      status: "In Stock",
    });
  };

  const handleDelete = (itemId) => {
    setInventory((prevInventory) =>
      prevInventory.filter((item) => item.id !== itemId)
    );
  };

  const handleEdit = (item) => {
    setItemForm({ ...item });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInventory = inventory.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="inventory-container">
      <h1 className="inventory-heading">Quản Lý Hàng Tồn Kho</h1>

      {/* Form nhập thông tin mục hàng */}
      <form onSubmit={handleSubmit} className="inventory-form">
        <label>
          Tên mục hàng:
          <input
            type="text"
            name="name"
            value={itemForm.name}
            onChange={handleFormChange}
            className="inventory-input"
          />
        </label>
        <label>
          Mô tả mục hàng:
          <input
            type="text"
            name="description"
            value={itemForm.description}
            onChange={handleFormChange}
            className="inventory-input"
          />
        </label>
        <label>
          Số lượng:
          <input
            type="number"
            name="quantity"
            value={itemForm.quantity}
            onChange={handleFormChange}
            className="inventory-input"
          />
        </label>
        <label>
          Loại mục hàng:
          <input
            type="text"
            name="category"
            value={itemForm.category}
            onChange={handleFormChange}
            className="inventory-input"
          />
        </label>
        <label>
          Trạng thái:
          <select
            name="status"
            value={itemForm.status}
            onChange={handleFormChange}
            className="inventory-input"
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </label>
        <button className="edit inventory-submit" type="submit">
          Lưu
        </button>
      </form>

      {/* Danh sách hàng tồn */}
      <table className="inventory-table">
        <thead>
          <tr>
            <th className="inventory-cell">ID</th>
            <th className="inventory-cell">Tên mục hàng</th>
            <th className="inventory-cell">Mô tả</th>
            <th className="inventory-cell">Số lượng</th>
            <th className="inventory-cell">Loại</th>
            <th className="inventory-cell">Trạng thái</th>
            <th className="inventory-cell">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentInventory.map((item) => (
            <tr key={item.id}>
              <td className="inventory-cell">{item.id}</td>
              <td className="inventory-cell">{item.name}</td>
              <td className="inventory-cell">{item.description}</td>
              <td className="inventory-cell">{item.quantity}</td>
              <td className="inventory-cell">{item.category}</td>
              <td className="inventory-cell">{item.status}</td>
              <td className="inventory-cell">
                <button
                  className="edit inventory-action"
                  onClick={() => handleEdit(item)}
                >
                  Sửa
                </button>
                <button
                  className="edit inventory-action"
                  onClick={() => handleDelete(item.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(inventory.length / itemsPerPage),
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

export default Inventory;
