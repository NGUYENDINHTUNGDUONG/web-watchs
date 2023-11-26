import { Button, Table } from "antd";
import React, { useState } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
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

  return (
    <Loading isLoading={isLoading}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <button onClick={exportExcel}>Export Excel</button>
        {keyselected === "users" ? (
          <Button onClick={createUser}>Thêm người dùng</Button>
        ) : (
          <Button onClick={createProduct}>Thêm sản phẩm</Button>
        )}
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
    </Loading>
  );
};

export default TableComponent;
