/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Radio, Select, Space } from "antd";
import moment from "moment";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import React, {useEffect, useMemo, useRef, useState } from "react";

import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import {
  renderOptions,
  renderOptions3,
} from "../../util";
import * as ProductService from "../../services/ProductService";
import * as SupplierService from "../../services/SupplierService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import { UPLOAD_BASE_URL } from "../../config";
import "./styles.css";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [types, setTypes] = useState([""]);
  const [brands, setBrands] = useState([]);
  const [suppliers, setSuppliers] = useState([""]);
  const [brandShow, setBrandShow] = useState([]);
  const [calibers, setCalibers] = useState([""]);
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
    newCaliber: "",
    discount: "",
    category: "",
    description: "",
    caliber: "",
    waterResistant: "",
    size: "",
    glass: "",
    supplier: "",
  });
  const access_token = localStorage.getItem("access_token");
  const [stateProduct, setStateProduct] = useState(inittial());
  const [previewImage, setPreviewImage] = useState([]);
  const [stateProductDetails, setStateProductDetails] = useState(inittial());

  const [form] = Form.useForm();
  const [form1] = Form.useForm();

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

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const getAllBrands = async () => {
    const res = await ProductService.getAllBrands();
    if (res) {
      setBrandShow(res);
    }
  };
  useEffect(() => {
    getAllBrands();
  }, []);
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
        waterResistant: res?.data?.waterResistant,
        size: res?.data?.size,
        glass: res?.data?.glass,
        supplier: res?.data?.supplier,
      });
    }
    setIsLoadingUpdate(false);
  };

  const convertImages = useMemo(() => {
    return stateProductDetails?.images.map((path) => {
      return {
        name: path,
        url: `${UPLOAD_BASE_URL}/${path}`,
      };
    });
  }, [stateProductDetails?.images]);

  useEffect(() => {
    if (!isModalOpen) {
      form1.setFieldsValue(stateProductDetails);
      form1.setFieldsValue({
        image: stateProductDetails?.images,
      });
    } else {
      form1.setFieldsValue(inittial());
    }
  }, [form1, stateProductDetails, isModalOpen]);
  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetails);
      form.setFieldsValue({
        image: stateProductDetails?.images,
      });
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
  const getAllCaliberProduct = async () => {
    try {
      const res = await ProductService.getAllCaliberProduct();
      if (res) {
        setCalibers(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllBrandProduct = async () => {
    const data = {
      supplierId: stateProduct.supplier,
    };
    try {
      const res = await SupplierService.getAllBrandsProduct(data, access_token);
      if (res) {
        setBrands(res[0].brands);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllSupplier = async () => {
    try {
      const res = await SupplierService.getAllSupplier(null,access_token);
      if (res) {
        setSuppliers(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (stateProduct.supplier) {
      getAllBrandProduct();
    }
  }, [stateProduct.supplier]);
  useEffect(() => {
    getAllTypeProduct();
    getAllCaliberProduct();
    getAllSupplier();
  }, [isModalOpen, isOpenDrawer]);
  const { data, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

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
  };
  const handleReset = (clearFilters) => {
    clearFilters();
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
  });

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
      ...getColumnSearchProps("brand"),
    },
    {
      title: "Bộ máy",
      dataIndex: "caliber",
      sorter: (a, b) => a.caliber.length - b.caliber.length,
      ...getColumnSearchProps("caliber"),
    },
    {
      title: "Giá bán",
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
      render: (text) => (
        <span>
          {Number(text).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Kiểu dây",
      dataIndex: "type",
      sorter: (a, b) => a.type.length - b.type.length,
      ...getColumnSearchProps("type"),
    },
    {
      title: "Ngày nhập",
      dataIndex: "createdAt",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    },

    {
      title: "",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return {
        ...product,
        key: product._id,
        brand: brandShow.filter((item) => item._id === product.brand._id)[0]?.name,
      };
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
      waterResistant: "",
      size: "",
      glass: "",
      supplier: "",
    });
    form1.resetFields();
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
    }, 1000);
  };

  const handleCancel = () => {
    setPreviewImage([]);
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
      waterResistant: "",
      size: "",
      glass: "",
      supplier: "",
    });
    form.resetFields();
  };

  const onFinish = async () => {
    const data = new FormData();
    data.append("name", stateProduct.name);
    data.append("price", stateProduct.price);
    data.append(
      "type",
      stateProduct.type === "add_type"
        ? stateProduct.newType
        : stateProduct.type
    );
    data.append("brand", stateProduct.brand);
    data.append("quantity", stateProduct.quantity);
    data.append("waterResistant", stateProduct.waterResistant);
    data.append("size", stateProduct.size);
    data.append("glass", stateProduct.glass);
    data.append("supplier", stateProduct.supplier);
    data.append("category", stateProduct.category);
    data.append("description", stateProduct.description);
    data.append(
      "caliber",
      stateProduct.caliber === "add_caliber"
        ? stateProduct.newCaliber
        : stateProduct.caliber
    );
    stateProduct.images.map((image) => data.append("images", image));
    try {
      const res = await ProductService.createProduct(data, access_token);
      if (res) {
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

  const handleOnchangeAvatarDetails = async (event) => {
    if (event.file.status === "removed") {
    } else {
      try {
        const data = new FormData();
        data.append("images", event.file);
        const res = await ProductService.uploadFile(data, access_token);
        if (res) {
          setStateProductDetails({
            ...stateProductDetails,
            images: [...stateProductDetails.images, res.images[0]],
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onUpdateProduct = async () => {
    const data = new FormData();
    data.append("name", stateProductDetails.name);
    data.append("price", stateProductDetails.price);
    data.append(
      "type",
      stateProductDetails.type === "add_type"
        ? stateProductDetails.newType
        : stateProductDetails.type
    );
    data.append("brand", stateProductDetails.brand);
    data.append("quantity", stateProductDetails.quantity);
    data.append("category", stateProductDetails.category);
    data.append("description", stateProductDetails.description);
    data.append(
      "caliber",
      stateProductDetails.caliber === "add_caliber"
        ? stateProductDetails.newCaliber
        : stateProductDetails.caliber
    );
    data.append("waterResistant", stateProductDetails.waterResistant);
    data.append("size", stateProductDetails.size);
    data.append("glass", stateProductDetails.glass);
    data.append("supplier", stateProductDetails.supplier);
    stateProductDetails.images.map((image) => data.append("images", image));
    try {
      const res = await ProductService.updateProduct(
        rowSelected,
        access_token,
        data
      );
      if (res) {
        message.success("Apply product successfully!");
        setIsOpenDrawer(false);
        queryProduct.refetch();
        setIsLoadingUpdate(true);
      }
    } catch (error) {
    } finally {
      setIsLoadingUpdate(false);
    }
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
    const newList = uniqueFiles.map((file) => file.originFileObj);
    setPreviewImage(uniqueFiles);
    setStateProduct({
      ...stateProduct,
      images: newList,
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
      (item) => item !== file.name
    );
    setStateProductDetails({
      ...stateProductDetails,
      images: newFileList,
    });
  };
  const handleChangeSelect = (value) => {
    setStateProductDetails({
      ...stateProductDetails,
      type: value,
    });
  };
  // const handleChangeSelect3 = (value) => {
  //   setStateProductDetails({
  //     ...stateProductDetails,
  //     brand: value,
  //   });
  // };
  const handleChangeSelectCaliber1 = (value) => {
    setStateProductDetails({
      ...stateProductDetails,
      caliber: value,
    });
  };
  const handleChangeSelect2 = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value,
    });
  };
  const handleChangeSelect1 = (value) => {
    setStateProduct({
      ...stateProduct,
      brand: value,
    });
  };
  const handleChangeSelectSupplier = (value) => {
    setStateProduct({
      ...stateProduct,
      supplier: value,
    });
  };
  const handleChangeSelectWaterResistant = (value) => {
    setStateProduct({
      ...stateProduct,
      waterResistant: value,
    });
  };
  const handleChangeSelectSize = (value) => {
    setStateProduct({
      ...stateProduct,
      size: value,
    });
  };
  const handleChangeSelectGlass = (value) => {
    setStateProduct({
      ...stateProduct,
      glass: value,
    });
  };
  // const handleChangeSelectSupplierDetails = (value) => {
  //   setStateProductDetails({
  //     ...stateProductDetails,
  //     supplier: value,
  //   });
  // };
  const handleChangeSelectWaterResistantDetails = (value) => {
    setStateProductDetails({
      ...stateProductDetails,
      waterResistant: value,
    });
  };
  const handleChangeSelectSizeDetails = (value) => {
    setStateProductDetails({
      ...stateProductDetails,
      size: value,
    });
  };
  const handleChangeSelectGlassDetails = (value) => {
    setStateProductDetails({
      ...stateProductDetails,
      glass: value,
    });
  };
  const handleChangeSelectCaliber = (value) => {
    setStateProduct({
      ...stateProduct,
      caliber: value,
    });
  };
  const waterResistant = [
    { value: "3", label: "3ATM (30m)" },
    { value: "5", label: "5ATM (50m)" },
    { value: "10", label: "10ATM (100m)" },
    { value: "20", label: "20ATM (200m)" },
  ];
  const brandSelect = brands?.map((brand) => ({
    value: brand._id,
    label: brand.name,
  }));
  const supplierSelect =
    suppliers?.map((supplier) => ({
      value: supplier._id,
      label: supplier.name,
    })) || [];
  const size = [
    { value: "20", label: "20mm" },
    { value: "23", label: "23mm" },
    { value: "25", label: "25mm" },
    { value: "30", label: "30mm" },
    { value: "35", label: "35mm" },
    { value: "37", label: "37mm" },
    { value: "39", label: "39mm" },
    { value: "40", label: "40mm" },
    { value: "41", label: "41mm" },
  ];
  const glass = [
    { value: "acrylic", label: "Acrylic Crystal" },
    { value: "mineral", label: "Mineral Crystal" },
    { value: "hardlex", label: "Hardlex Crystal" },
    { value: "sapphire", label: "Sapphire Crystal" },
  ];

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          keyselected="product"
          createProduct={() => setIsModalOpen(true)}
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
        <Form name="basic" onFinish={onFinish} autoComplete="on" form={form}>
          <div className="form1">
            <div className="form1-1">
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên của đồng hồ !" }]}
              >
                <InputComponent
                  value={stateProduct["name"]}
                  onChange={handleOnchange}
                  name="name"
                />
              </Form.Item>

              <Form.Item
                label="Loại dây"
                name="type"
                rules={[{ required: true, message: "Vui lòng nhập loại dây của đồng hồ !" }]}
              >
                <Select
                  name="type"
                  value={stateProduct.type}
                  onChange={handleChangeSelect2}
                  options={renderOptions(types?.types)}
                  placeholder="Select type"
                />
              </Form.Item>
              {stateProduct.type === "add_type" && (
                <Form.Item
                  label="Loại dây mới"
                  name="newType"
                  rules={[
                    { required: true, message: "Vui lòng nhập loại dây mới của đồng hồ !" },
                  ]}
                >
                  <InputComponent
                    value={stateProduct.newType}
                    onChange={handleOnchange}
                    name="newType"
                    // placeholder={"New type"}
                  />
                </Form.Item>
              )}
              <Form.Item
                label="Số lương"
                name="quantity"
                rules={[
                  { required: true, message: "Vui lòng nhập số lượng đồng hồ !" },

                  {
                    pattern: /^[0-9]*$/,
                    message: "Vui lòng nhập số!",
                  },
                ]}
              >
                <InputComponent
                  value={stateProduct.quantity}
                  onChange={handleOnchange}
                  name="quantity"
                />
              </Form.Item>
              <Form.Item
                label="Giá bán"
                name="price"
                rules={[
                  { required: true, message: "Vui lòng nhập giá bán của đồng hồ !" },
                  {
                    pattern: /^[0-9]*$/,
                    message: "Vui lòng nhập số!",
                  },
                ]}
              >
                <InputComponent
                  value={stateProduct.price}
                  onChange={handleOnchange}
                  name="price"
                />
              </Form.Item>

              <Form.Item
                label="Danh mục"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập danh mục của đồng hồ!",
                  },
                ]}
              >
                <Radio.Group name="category" onChange={handleOnchange}>
                  <Radio value={"Nam"}> Đồng hồ nam</Radio>
                  <Radio value={"Nữ"}>Đồng hồ nữ</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả của đồng hồ !",
                  },
                ]}
              >
                <InputComponent
                  value={stateProduct.description}
                  onChange={handleOnchange}
                  name="description"
                />
              </Form.Item>
            </div>
            <div className="form1-2">
              <Form.Item
                label="Bộ máy"
                name="caliber"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập bộ máy của đồng hồ !",
                  },
                ]}
              >
                <Select
                  name="caliber"
                  value={stateProduct.caliber}
                  onChange={handleChangeSelectCaliber}
                  options={renderOptions3(calibers?.calibers)}
                  placeholder="Caliber"
                />
              </Form.Item>
              {stateProduct.caliber === "add_caliber" && (
                <Form.Item
                  label="Bộ máy mới"
                  name="newCaliber"
                  rules={[
                    { required: true, message: "Vui lòng nhập bộ máy mới của đồng hồ !" },
                  ]}
                >
                  <InputComponent
                    value={stateProduct.newCaliber}
                    onChange={handleOnchange}
                    name="newCaliber"
                  />
                </Form.Item>
              )}
              <Form.Item
                label="Nhà cung cấp"
                name="supplier"
                rules={[
                  { required: true, message: "Vui lòng nhập nhà cung cấp của đồng hồ !" },
                ]}
              >
                <Select
                  name="supplier"
                  value={stateProduct.supplier}
                  onChange={handleChangeSelectSupplier}
                  options={supplierSelect}
                  placeholder="Supplier"
                />
              </Form.Item>
              <Form.Item
                label="Thương hiệu"
                name="brand"
                rules={[
                  { required: true, message: "Vui lòng nhập thương hiệu của đồng hồ !" },
                ]}
              >
                <Select
                  name="brand"
                  value={stateProduct.brand}
                  onChange={handleChangeSelect1}
                  options={brandSelect}
                  placeholder="Brand"
                />
              </Form.Item>
              <Form.Item
                label="Chịu nước"
                name="waterResistant"
                rules={[
                  { required: true, message: "Vui lòng nhập độ Chịu nước của đồng hồ !" },
                ]}
              >
                <Select
                  name="waterResistant"
                  value={stateProduct.waterResistant}
                  onChange={handleChangeSelectWaterResistant}
                  options={waterResistant}
                  placeholder="Water Resistant"
                />
              </Form.Item>
              <Form.Item
                label="Kích cỡ"
                name="size"
                rules={[
                  { required: true, message: "Vui lòng nhập kích cỡ của đồng hồ !" },
                ]}
              >
                <Select
                  name="size"
                  value={stateProduct.size}
                  onChange={handleChangeSelectSize}
                  options={size}
                  placeholder="Size"
                />
              </Form.Item>
              <Form.Item
                label="Mặt kính"
                name="glass"
                rules={[
                  { required: true, message: "Vui lòng nhập mặt kính của đồng hồ !" },
                ]}
              >
                <Select
                  name="glass"
                  value={stateProduct.glass}
                  onChange={handleChangeSelectGlass}
                  options={glass}
                  placeholder="Glass"
                />
              </Form.Item>
            </div>
          </div>
          <Form.Item
            label="Ảnh"
            name="image"
            rules={[
              { required: true, message: "Vui lòng thêm ảnh của đồng hồ !" },
            ]}
          >
            <WrapperUploadFile
              beforeUpload={() => false}
              listType="picture-card"
              onRemove={onRemove}
              onChange={handleFileChange}
              maxCount={6}
              fileList={previewImage}
            >
              {stateProduct.images?.length >= 6 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </WrapperUploadFile>
          </Form.Item>

          <Form.Item className="form1-submit">
            <Button htmlType="submit">Thêm sản phẩm</Button>
          </Form.Item>
        </Form>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form1}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên của đồng hồ!" }]}
            >
              <InputComponent
                value={stateProductDetails["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Loại dây"
              name="type"
              rules={[{ required: true, message: "Vui lòng nhập loại dây của đồng hồ !" }]}
            >
              <Select
                name="type"
                value={stateProductDetails.type}
                onChange={handleChangeSelect}
                options={renderOptions(types?.types)}
              />
            </Form.Item>
            {stateProductDetails.type === "add_type" && (
              <Form.Item
                label="Loại dây mới"
                name="newType"
                rules={[{ required: true, message: "Vui lòng nhập loại dây mới của đồng hồ !" }]}
              >
                <InputComponent
                  value={stateProductDetails.newType}
                  onChange={handleOnchangeDetails}
                  name="newType"
                />
              </Form.Item>
            )}
            <Form.Item
              label="Số lương"
              name="quantity"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng đồng hồ !" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.quantity}
                onChange={handleOnchangeDetails}
                name="quantity"
              />
            </Form.Item>
            <Form.Item
              label="Giá bán"
              name="price"
              rules={[
                { required: true, message: "Vui lòng nhập giá bán của sản phẩm!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.price}
                onChange={handleOnchangeDetails}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Bộ máy"
              name="caliber"
              rules={[
                { required: true, message: "Vui lòng nhập bộ máy của đồng hồ !" },
              ]}
            >
              <Select
                name="caliber"
                value={stateProductDetails.caliber}
                onChange={handleChangeSelectCaliber1}
                options={renderOptions3(calibers?.calibers)}
              />
            </Form.Item>
            {stateProductDetails.caliber === "add_caliber" && (
              <Form.Item
                label="Bộ máy mới"
                name="newCaliber"
                rules={[
                  { required: true, message: "Vui lòng nhập bộ máy mới của đồng hồ !" },
                ]}
              >
                <InputComponent
                  value={stateProductDetails.newCaliber}
                  onChange={handleOnchangeDetails}
                  name="newCaliber"
                />
              </Form.Item>
            )}

            <Form.Item
              label="Chịu nước"
              name="waterResistant"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập độ Chịu nước của đồng hồ",
                },
              ]}
            >
              <Select
                name="waterResistant"
                value={stateProductDetails.waterResistant}
                onChange={handleChangeSelectWaterResistantDetails}
                options={waterResistant}
                placeholder="Water Resistant"
              />
            </Form.Item>
            <Form.Item
              label="Kích cỡ"
              name="size"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập kích cỡ của đồng hồ !",
                },
              ]}
            >
              <Select
                name="size"
                value={stateProductDetails.size}
                onChange={handleChangeSelectSizeDetails}
                options={size}
                placeholder="Size"
              />
            </Form.Item>
            <Form.Item
              label="Mặt kính"
              name="glass"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mặt kính của đồng hồ !",
                },
              ]}
            >
              <Select
                name="glass"
                value={stateProductDetails.glass}
                onChange={handleChangeSelectGlassDetails}
                options={glass}
                placeholder="Glass"
              />
            </Form.Item>
            <Form.Item
              label="Ảnh"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Vui lòng thêm ảnh của đồng hồ !",
                  validator: (_, value) => {
                    if (stateProductDetails?.images.length > 0) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Please input your count image!");
                  },
                },
              ]}
            >
              <WrapperUploadFile
                beforeUpload={() => false}
                listType="picture-card"
                onRemove={onRemoveDetails}
                onChange={handleOnchangeAvatarDetails}
                maxCount={6}
                fileList={convertImages}
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
              <Button htmlType="submit">Sửa sản phẩm</Button>
            </Form.Item>
          </Form>
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
