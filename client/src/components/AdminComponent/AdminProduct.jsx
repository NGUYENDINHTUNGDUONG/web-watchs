import { Button, Form, Select, Space } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useRef } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64, renderOptions } from "../../util";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useEffect } from "react";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalComponent";
import "./styles.css";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [types, setTypes] = useState([""]);
  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);
  const inittial = () => ({
    name: "",
    price: "",
    brand: "",
    rating: "",
    images: [],
    type: "",
    quantity: "",
    newType: "",
    discount: "",
    category: "",
    description: "",
    caliber: "",
  });
  const access_token = localStorage.getItem("access_token");
  const [stateProduct, setStateProduct] = useState(inittial());
  const [stateProductDetails, setStateProductDetails] = useState(inittial());

  const [form] = Form.useForm();

  const mutation = useMutationHooks((data) => {
    const {
      name,
      price,
      brand,
      rating,
      images,
      type,
      quantity,
      discount,
      category,
      description,
      caliber,
    } = data;
    const res = ProductService.createProduct(
      {
        name,
        price,
        brand,
        rating,
        images,
        type,
        quantity,
        discount,
        category,
        description,
        caliber,
      },
      access_token
    );
    return res;
  });
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = ProductService.deleteManyProduct(ids, token);
    return res;
  });

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        brand: res?.data?.brand,
        rating: res?.data?.rating,
        images: res?.data?.images,
        type: res?.data?.type,
        quantity: res?.data?.quantity,
        discount: res?.data?.discount,
        category: res?.data?.category,
        description: res?.data?.description,
        caliber: res?.data?.caliber,
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetails);
    } else {
      form.setFieldsValue(inittial());
    }
  }, [form, stateProductDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  const handleDelteManyProducts = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const getAllTypeProduct = async () => {
    try {
      const res = await ProductService.getAllTypesProduct();
      if (res) {
        setTypes(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTypeProduct();
  }, [isModalOpen]);
  const { data, isLoading, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  // const typeProduct = useQuery({
  //   queryKey: ["type-product"],
  //   queryFn: fetchAllTypeProduct,
  // });
  const { isLoading: isLoadingProducts, data: products } = queryProduct;
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 50",
          value: ">=",
        },
        {
          text: "<= 50",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 50;
        }
        return record.price <= 50;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">= 3",
          value: ">=",
        },
        {
          text: "<= 3",
          value: "<=",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return Number(record.rating) >= 3;
        }
        return Number(record.rating) <= 3;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  console.log(products?.data);
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDelected]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      price: "",
      brand: "",
      rating: "",
      images: [],
      type: "",
      quantity: "",
      discount: "",
      category: "",
      description: "",
      caliber: "",
    });
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
   mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
    setTimeout(() => {
      setIsModalOpenDelete(false);
    },1000)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      price: "",
      brand: "",
      rating: "",
      images: [],
      type: "",
      quantity: "",
      discount: "",
      category: "",
      description: "",
      caliber: "",
    });
    form.resetFields();
  };

  const onFinish = async () => {
    const data = new FormData();
    data.append("name", stateProduct.name);
    data.append("price", stateProduct.price);
    data.append("brand", stateProduct.brand);
    data.append("rating", stateProduct.rating);
    data.append(
      "type",
      stateProduct.type === "add_type"
        ? stateProduct.newType
        : stateProduct.type
    );
    data.append("quantity", stateProduct.quantity);
    data.append("discount", stateProduct.discount);
    data.append("category", stateProduct.category);
    data.append("description", stateProduct.description);
    data.append("caliber", stateProduct.caliber);
    data.append("images", stateProduct.images);
    try {
      const res = await ProductService.createProduct(data, access_token);
      if (res) {
        console.log("res", res);
        message.success("Create product successfully!");
        handleCancel();
        queryProduct.refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };



  const handleOnchangeAvatarDetails = ( event ) => {
    const uniqueFiles = event.fileList.reduce((accumulator, currentFile) => {
      const isUnique = accumulator.every(
        (file) => file.name !== currentFile.name
      );
      if (isUnique) {
        accumulator.push(currentFile);
      }
      return accumulator;
    }, []);

    setStateProductDetails({
      ...stateProductDetails,
      images: uniqueFiles,
    });
    
  };
  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: access_token , ...stateProductDetails },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const handleFileChange = (event) => {
    const uniqueFiles = event.fileList.reduce((accumulator, currentFile) => {
      const isUnique = accumulator.every(
        (file) => file.name !== currentFile.name
      );
      if (isUnique) {
        accumulator.push(currentFile);
      }
      return accumulator;
    }, []);

    setStateProduct({
      ...stateProduct,
      images: uniqueFiles,
    });
  };
  const onRemove = (file) => {
    const newFileList = stateProduct.images.filter(
      (item) => item.uid !== file.uid
    );

    setStateProduct({
      ...stateProduct,
      images: newFileList,
    });
  };
  const onRemoveDetails = (file) => {
    const newFileList = stateProductDetails.images.filter(
      (item) => item.uid !== file.uid
    );
    setStateProductDetails({
      ...stateProductDetails,
      images: newFileList,
    })
  }
  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value,
    });
  };
  console.log(stateProduct.images);
  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          handleDelteMany={handleDelteManyProducts}
          columns={columns}
          isLoading={isLoadingProducts}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <ModalComponent
        forceRender
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="modal1"
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="on"
          form={form}
        >
          <div className="form1">
            <div className="form1-1">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <InputComponent
                  value={stateProduct["name"]}
                  onChange={handleOnchange}
                  name="name"
                />
              </Form.Item>

              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please input your type!" }]}
              >
                <Select
                  name="type"
                  // defaultValue="lucy"
                  // style={{ width: 120 }}
                  value={stateProduct.type}
                  onChange={handleChangeSelect}
                  options={renderOptions(types?.types)}
                />
              </Form.Item>
              {stateProduct.type === "add_type" && (
                <Form.Item
                  label="New type"
                  name="newType"
                  rules={[
                    { required: true, message: "Please input your type!" },
                  ]}
                >
                  <InputComponent
                    value={stateProduct.newType}
                    onChange={handleOnchange}
                    name="newType"
                  />
                </Form.Item>
              )}
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  { required: true, message: "Please input your quantity!" },
                ]}
              >
                <InputComponent
                  value={stateProduct.quantity}
                  onChange={handleOnchange}
                  name="quantity"
                />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  { required: true, message: "Please input your count price!" },
                ]}
              >
                <InputComponent
                  value={stateProduct.price}
                  onChange={handleOnchange}
                  name="price"
                />
              </Form.Item>
              <Form.Item
                label="Rating"
                name="rating"
                rules={[
                  {
                    required: true,
                    message: "Please input your count rating!",
                  },
                ]}
              >
                <InputComponent
                  value={stateProduct.rating}
                  onChange={handleOnchange}
                  name="rating"
                />
              </Form.Item>
              <Form.Item
                label="Brand"
                name="brand"
                rules={[
                  { required: true, message: "Please input your count brand!" },
                ]}
              >
                <InputComponent
                  value={stateProduct.brand}
                  onChange={handleOnchange}
                  name="brand"
                />
              </Form.Item>

              <Form.Item
                label="Discount"
                name="discount"
                rules={[
                  {
                    required: true,
                    message: "Please input your discount of product!",
                  },
                ]}
              >
                <InputComponent
                  value={stateProduct.discount}
                  onChange={handleOnchange}
                  name="discount"
                />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input your count description!",
                  },
                ]}
              >
                <InputComponent
                  value={stateProduct.description}
                  onChange={handleOnchange}
                  name="description"
                />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please input your count category!",
                  },
                ]}
              >
                <InputComponent
                  value={stateProduct.category}
                  onChange={handleOnchange}
                  name="category"
                />
              </Form.Item>
            </div>
            <div className="form1-2">
              <Form.Item
                label="Caliber"
                name="caliber"
                rules={[
                  {
                    required: true,
                    message: "Please input your count caliber!",
                  },
                ]}
              >
                <InputComponent
                  value={stateProduct.caliber}
                  onChange={handleOnchange}
                  name="caliber"
                />
              </Form.Item>
              <Form.Item
                label="Image"
                name="image"
                rules={[
                  {
                    required: true,
                    message: "Please input your count image!",
                  },
                ]}
              >
                <WrapperUploadFile
                  beforeUpload={() => false}
                  listType="picture-card"
                  onRemove={onRemove}
                  onChange={handleFileChange}
                  maxCount={6}
                  fileList={stateProduct.images}
                >
                  {stateProduct.images?.length >= 6 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </WrapperUploadFile>
              </Form.Item>
            </div>
          </div>
          <Form.Item className="form1-submit">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
        <Loading isLoading={isLoadingUpdate }>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <InputComponent
                value={stateProductDetails["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <InputComponent
                value={stateProductDetails["type"]}
                onChange={handleOnchangeDetails}
                name="type"
              />
            </Form.Item>
            <Form.Item
              label="`Quantity`"
              name="quantity"
              rules={[
                { required: true, message: "Please input your quantity!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.quantity}
                onChange={handleOnchangeDetails}
                name="quantity"
              />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[
                { required: true, message: "Please input your count price!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.price}
                onChange={handleOnchangeDetails}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="brand"
              rules={[
                { required: true, message: "Please input your count brand!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.brand}
                onChange={handleOnchangeDetails}
                name="brand"
              />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                { required: true, message: "Please input your count rating!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.rating}
                onChange={handleOnchangeDetails}
                name="rating"
              />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Please input your discount of product!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails.discount}
                onChange={handleOnchangeDetails}
                name="discount"
              />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[
                { required: true, message: "Please input your count image!" },
              ]}
            >
             <WrapperUploadFile
                  beforeUpload={() => false}
                  listType="picture-card"
                  onRemove={onRemoveDetails}
                  onChange={handleOnchangeAvatarDetails}
                  maxCount={6}
                  fileList={stateProductDetails?.images}
                >
                  {stateProductDetails.images?.length >= 6 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
          <div>Bạn có chắc xóa sản phẩm này không?</div>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
