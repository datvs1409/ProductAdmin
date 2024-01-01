import React, { useState } from "react";
import "./SearchFilter.css";

const productsData = [
  {
    id: 1,
    name: "Máy quét mã vạch A",
    barcode: "123456",
    manufacturer: "Công ty ABC",
    type: "Máy quét",
    condition: "Mới",
    price: 100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    stockStatus: "Còn hàng",
    reviews: [{ user: "Người dùng 1", comment: "Sản phẩm tuyệt vời!" }],
  },
  {
    id: 2,
    name: "Máy in mã vạch B",
    barcode: "789012",
    manufacturer: "Tổ chức XYZ",
    type: "Máy in",
    condition: "Đã sử dụng",
    price: 50,
    description: "Máy in mã vạch đáng tin cậy cho nhiều ứng dụng.",
    stockStatus: "Còn hàng",
    reviews: [{ user: "Người dùng 2", comment: "Giá trị tốt cho tiền." }],
  },
  {
    id: 3,
    name: "Thiết bị đọc mã vạch C",
    barcode: "345678",
    manufacturer: "Công nghệ DEF",
    type: "Đầu đọc mã vạch",
    condition: "Mới",
    price: 80,
    description: "Đầu đọc mã vạch tiên tiến với khả năng quét nhanh.",
    stockStatus: "Hết hàng",
    reviews: [],
  },
  // Additional products
  {
    id: 4,
    name: "Máy in mã vạch D",
    barcode: "987654",
    manufacturer: "Tổ chức UVW",
    type: "Máy in",
    condition: "Mới",
    price: 120,
    description: "Máy in mã vạch chất lượng cao.",
    stockStatus: "Còn hàng",
    reviews: [{ user: "Người dùng 3", comment: "Sản phẩm đáng mua." }],
  },
  {
    id: 5,
    name: "Thiết bị đọc mã vạch E",
    barcode: "543210",
    manufacturer: "Công ty GHI",
    type: "Đầu đọc mã vạch",
    condition: "Đã sử dụng",
    price: 60,
    description: "Đầu đọc mã vạch nhỏ gọn và hiệu quả.",
    stockStatus: "Còn hàng",
    reviews: [{ user: "Người dùng 4", comment: "Đáng giá giá trị." }],
  },
  {
    id: 6,
    name: "Máy quét mã vạch F",
    barcode: "112233",
    manufacturer: "Công ty JKL",
    type: "Máy quét",
    condition: "Đã sử dụng",
    price: 70,
    description: "Máy quét mã vạch đa năng.",
    stockStatus: "Hết hàng",
    reviews: [],
  },
  {
    id: 7,
    name: "Máy in mã vạch G",
    barcode: "445566",
    manufacturer: "Tổ chức MNO",
    type: "Máy in",
    condition: "Mới",
    price: 90,
    description: "Máy in mã vạch tiện lợi.",
    stockStatus: "Còn hàng",
    reviews: [{ user: "Người dùng 5", comment: "Sản phẩm tốt." }],
  },
  {
    id: 8,
    name: "Thiết bị đọc mã vạch H",
    barcode: "778899",
    manufacturer: "Công nghệ PQR",
    type: "Đầu đọc mã vạch",
    condition: "Đã sử dụng",
    price: 40,
    description: "Đầu đọc mã vạch phổ biến.",
    stockStatus: "Còn hàng",
    reviews: [],
  },
  {
    id: 9,
    name: "Máy quét mã vạch I",
    barcode: "334455",
    manufacturer: "Công ty STU",
    type: "Máy quét",
    condition: "Mới",
    price: 110,
    description: "Máy quét mã vạch chất lượng.",
    stockStatus: "Hết hàng",
    reviews: [],
  },
  {
    id: 10,
    name: "Máy in mã vạch J",
    barcode: "667788",
    manufacturer: "Tổ chức VWX",
    type: "Máy in",
    condition: "Đã sử dụng",
    price: 55,
    description: "Máy in mã vạch tiện ích.",
    stockStatus: "Còn hàng",
    reviews: [{ user: "Người dùng 6", comment: "Sản phẩm đáng mua." }],
  },
  // Thêm sản phẩm khác nếu cần
];

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [barcodeFilter, setBarcodeFilter] = useState("");
  const [manufacturerFilter, setManufacturerFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // You can adjust this value based on your preference

  const filteredProducts = productsData.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (barcodeFilter === "" || product.barcode === barcodeFilter) &&
      (manufacturerFilter === "" || product.manufacturer === manufacturerFilter)
    );
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="search-filter-container">
      <h2>Search & Filter</h2>
      <input
        type="text"
        placeholder="Tìm kiếm theo tên sản phẩm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <input
        type="text"
        placeholder="Lọc theo mã vạch"
        value={barcodeFilter}
        onChange={(e) => setBarcodeFilter(e.target.value)}
        className="search-input"
      />
      <input
        type="text"
        placeholder="Lọc theo nhà sản xuất"
        value={manufacturerFilter}
        onChange={(e) => setManufacturerFilter(e.target.value)}
        className="search-input"
      />

      <table className="filtered-products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Barcode</th>
            <th>Nhà sản xuất</th>
            <th>Loại</th>
            <th>Tình trạng</th>
            <th>Giá</th>
            <th>Mô tả</th>
            <th>Trạng thái hàng tồn</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.barcode}</td>
              <td>{product.manufacturer}</td>
              <td>{product.type}</td>
              <td>{product.condition}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.stockStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
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

export default SearchFilter;
