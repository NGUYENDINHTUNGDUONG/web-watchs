import { Button, Table } from "antd";
import React, { useState } from "react";
// import Loading from "../../components/LoadingComponent/LoadingComponent";
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from "react";
import "./styles.css";

const TableComponent = (props) => {
  const {
    data: dataSource = [],
    isLoading = false,
    columns = [],
    createUser,
    createProduct,
    createCoupon,
    createSupplier,
    createBrand,
    keyselected,
  } = props;
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== "action");
    return arr;
  }, [columns]);

  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true,
      })
      .saveAs("Excel.xlsx");
  };

  return(
      <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Button onClick={exportExcel}>Xuất excel</Button>
        {keyselected === "users" ? (
          <Button onClick={createUser}>Thêm người dùng</Button>
        ) : keyselected === "product" ? (
          <Button onClick={createProduct}>Thêm sản phẩm</Button>
        ) : keyselected === "coupon" ? (
          <Button onClick={createCoupon}>Thêm mã giảm giá</Button>
        ) : keyselected === "suppliers" ? (
          <div>
            <Button onClick={createBrand} className="mr-3">Thêm thương hiệu</Button>
            <Button onClick={createSupplier}>Thêm nhà cung cấp</Button>
          </div>
        ) : null}
      </div>
      <Table
        className="table-custom"
        pagination={{
          pageSize: 7,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </div>
  );
};

export default TableComponent;
