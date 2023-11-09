import { Button, Table } from "antd";
import React, { useState } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from "react";

const TableComponent = (props) => {
  const {
    data: dataSource = [],
    isLoading = false,
    columns = [],
    createUser,
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
        ) : null}
      </div>
      <Table columns={columns} dataSource={dataSource} {...props} />
    </Loading>
  );
};

export default TableComponent;
