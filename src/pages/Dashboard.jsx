import React from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import StatusCard from "../components/status-card/StatusCard";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
import statusCards from "../assets/JsonData/status-card-data.json";

const chartOptions = {
  series: [
    {
      name: "Khách hàng trực tuyến",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Khách hàng cửa hàng",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const topCustomers = {
  head: ["Người dùng", "Tổng đơn hàng", "Tổng chi tiêu"],
  body: [
    {
      username: "John Doe",
      order: "490",
      price: "$15,870",
    },
    {
      username: "Frank Iva",
      order: "250",
      price: "$12,251",
    },
    {
      username: "Anthony Baker",
      order: "120",
      price: "$10,840",
    },
    {
      username: "Frank Iva",
      order: "110",
      price: "$9,251",
    },
    {
      username: "Anthony Baker",
      order: "80",
      price: "$8,840",
    },
  ],
};

const renderCustomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCustomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  header: ["Mã đơn hàng", "Người dùng", "Tổng giá", "Ngày", "Trạng thái"],
  body: [
    {
      id: "#OD1711",
      user: "John Doe",
      date: "17 Tháng 6, 2021",
      price: "$900",
      status: "Vận chuyển",
    },
    {
      id: "#OD1712",
      user: "Frank Iva",
      date: "1 Tháng 6, 2021",
      price: "$400",
      status: "Đã thanh toán",
    },
    {
      id: "#OD1713",
      user: "Anthony Baker",
      date: "27 Tháng 6, 2021",
      price: "$200",
      status: "Chờ xử lý",
    },
    {
      id: "#OD1712",
      user: "Frank Iva",
      date: "1 Tháng 6, 2021",
      price: "$400",
      status: "Đã thanh toán",
    },
    {
      id: "#OD1713",
      user: "Anthony Baker",
      date: "27 Tháng 6, 2021",
      price: "$200",
      status: "Hoàn trả",
    },
  ],
};

const orderStatus = {
  "Vận chuyển": "primary",
  "Chờ xử lý": "warning",
  "Đã thanh toán": "success",
  "Hoàn trả": "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  return (
    <div>
      <h2 className="page-header">Bảng điều khiển</h2>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {statusCards.map((item, index) => (
              <div className="col-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            {/* Biểu đồ */}
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>Top khách hàng</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCustomerHead(item, index)}
                bodyData={topCustomers.body}
                renderBody={(item, index) => renderCustomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">Xem tất cả</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>Đơn hàng mới nhất</h3>
            </div>
            <div className="card__body">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">Xem tất cả</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
