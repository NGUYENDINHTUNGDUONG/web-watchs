import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space
} from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import TableComponent from '../TableComponent/TableComponent'
import { WrapperHeader } from './style'
import * as ProductService from '../../services/ProductService'
import ModalComponent from '../ModalComponent/ModalComponent'
import InputComponent from '../InputComponent/InputComponent'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getListAddresses } from '../../redux/slides/orderSlide'
import { UPLOAD_BASE_URL } from '../../config'

export default function AdminSupplier () {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenBrand, setIsOpenBrand] = useState(false)
  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [districts, setDistricts] = useState()
  const [district, setDistrict] = useState()
  const [ward, setWard] = useState()
  const [wards, setWards] = useState()
  const [rowSelected, setRowSelected] = useState()
  const [suppliers, setSuppliers] = useState([])
  const [imageFile, setImageFile] = useState()
  const searchInput = useRef(null)
  const dispatch = useDispatch()

  const onCancel = () => {
    setIsOpen(false)
  }
  const onCancelBrand = () => {
    setIsOpenBrand(false)
  }
  const res = async () => {
    const res = await axios.get('https://provinces.open-api.vn/api/?depth=3')
    if (res) {
      dispatch(getListAddresses({ listCity: res.data }))
    }
  }
  useEffect(() => {
    res()
  }, [])
  const { RangePicker } = DatePicker
  const access_token = localStorage.getItem('access_token')
  const onFinish = async values => {
    const data = {
      email: values.email,
      name: values.name,
      address: [city, district, ward, address],
      taxCode: values.taxCode,
      phone: values.phone
    }
    const res = await ProductService.createSupplier(data, access_token)
    if (res) {
      form.resetFields()
      getAllSuppliers()
    }
    setIsOpen(false)
  }
  const onFinishBrand = async values => {
    const data = new FormData()
    data.append('image', imageFile)
    data.append('name', values.name)
    data.append('supplier', values.supplier)

    const res = await ProductService.createBrand(data, access_token)
    if (res) {
      form1.resetFields()
      getAllSuppliers()
      setIsOpenBrand(false)
    }
  }
  const listCity = useSelector(state => state.order.listCity)

  const getAllSuppliers = async () => {
    const res = await ProductService.getAllSupplier(null, access_token)
    setSuppliers(res)
  }
  const [image, setImage] = useState(null)

  const handleImageChange = e => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        setImage(reader.result)
      }
      setImageFile(file)
      reader.readAsDataURL(file)
    } else {
      // Clear the image if no file is selected
      setImage(null)
    }
  }
  useEffect(() => {
    getAllSuppliers()
  }, [])
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  }
  const handleReset = clearFilters => {
    clearFilters()
    // setSearchText('');
  }
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div
        style={{
          padding: 8
        }}
        onKeyDown={e => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    }
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
  })
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }}
          // onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }}
          // onClick={handleDetailsProduct}
        />
      </div>
    )
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name')
    },

    {
      title: 'Brands',
      dataIndex: 'brands',
      render: brands => {
        return brands.map(brand => brand.name).join(', ')
      }
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      render: text => '0' + text
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: text =>
        text &&
        listCity.filter(item => item?.code === text && text[0] && text[0])[0]
          ?.name +
          ' - ' +
          listCity
            ?.filter(item => item?.code === text[0])?.[0]
            ?.districts.filter(item => item?.code === text[1])?.[0]?.name +
          ' - ' +
          listCity
            ?.filter(item => item?.code === text[0])?.[0]
            ?.districts.filter(item => item?.code === text[1])?.[0]
            ?.wards.filter(item => item?.code === text[2])?.[0]?.name +
          ' - ' +
          text[3],

      sorter: (a, b) => a.address.length - b.address.length
    },
    {
      title: 'TaxCode',
      dataIndex: 'taxCode',
      sorter: (a, b) => a.taxCode - b.taxCode
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction
    }
  ]
  const items = suppliers.map(val => ({ value: val._id, label: val.name }))
  const dataTable =
    suppliers?.length &&
    suppliers?.map(coupon => {
      return {
        ...coupon,
        key: coupon._id
      }
    })

  useEffect(() => {
    if (city) {
      setDistricts(
        listCity.filter(element => element.code === city)[0]?.districts
      )
    }
  }, [city])
  useEffect(() => {
    if (district) {
      setWards(districts.filter(element => element.code === district)[0]?.wards)
    }
  }, [district])
  return (
    <div>
      <WrapperHeader>Quản lý mã nhà cung cấp</WrapperHeader>
      <div className='mt-6'>
        <TableComponent
          keyselected='suppliers'
          createSupplier={() => setIsOpen(true)}
          createBrand={() => setIsOpenBrand(true)}
          columns={columns}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                setRowSelected(record._id)
              }
            }
          }}
        />
      </div>
      <Modal
        open={isOpen}
        width={600}
        onCancel={onCancel}
        title='Thêm nhà cung cấp'
        footer={null}
      >
        <Form
          name='basic'
          className='grid grid-cols-2 gap-5'
          layout='vertical'
          onFinish={onFinish}
          form={form}
        >
          <div>
            <Form.Item
              label='Tên nhà cung cấp'
              name='name'
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                  type: 'email'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Phone'
              name='phone'
              rules={[{ required: true, message: 'Please input your phone!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='TaxCode'
              name='taxCode'
              rules={[
                { required: true, message: 'Please input your taxCode!' }
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label='Tỉnh/Thành phố'
              name='city'
              rules={[{ required: true, message: 'Please input your  city!' }]}
            >
              <Select
                placeholder='Tình/Thành phố'
                options={listCity?.map(city => ({
                  value: city.code,
                  label: city.name
                }))}
                onChange={value => {
                  setCity(value)
                }}
                value={city}
              ></Select>
            </Form.Item>
            <Form.Item
              label='Quận/Huyện'
              name='district'
              rules={[
                { required: true, message: 'Please input your  address!' }
              ]}
            >
              <Select
                placeholder='Quận/Huyện'
                options={districts?.map(city => ({
                  value: city.code,
                  label: city.name
                }))}
                onChange={value => {
                  setDistrict(value)
                }}
                value={district}
              ></Select>
            </Form.Item>
            <Form.Item
              label='Xã/Phường'
              name='ward'
              rules={[{ required: true, message: 'Please input your ward!' }]}
            >
              <Select
                placeholder='Xã/Phường'
                options={wards?.map(city => ({
                  value: city.code,
                  label: city.name
                }))}
                onChange={value => {
                  setWard(value)
                }}
                value={ward}
              ></Select>
            </Form.Item>
            <Form.Item
              label='Số nhà'
              name='address'
              rules={[
                { required: true, message: 'Please input your address!' }
              ]}
            >
              <Input
                placeholder='Số nhà'
                onChange={e => setAddress(e.target.value)}
                value={address}
              />
            </Form.Item>
          </div>
          <Form.Item>
            <Button htmlType='submit'>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
      <ModalComponent open={isOpenBrand} onCancel={onCancelBrand} footer={null}>
        <Form
          name='basic'
          className='grid grid-cols-2 gap-5'
          layout='vertical'
          onFinish={onFinishBrand}
          form={form1}
        >
          <div>
            <Form.Item
              label='Tên nhà cung cấp'
              name={'supplier'}
              rules={[
                { required: true, message: 'Please input your supplier!' }
              ]}
            >
              <Select options={items} placeholder='Chọn nhà cung cấp' />
            </Form.Item>
            <Form.Item
              className='mb-0'
              label='Tên thương hiệu'
              name='name'
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input placeholder='Tên thương hiệu' />
            </Form.Item>
          </div>
          <Form.Item
            className='mb-0'
            label='Logo'
            name='logo'
            rules={[
              {
                validator: (_, value) => {
                  if (image === null) {
                    return Promise.reject('Please input your logo!')
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <label
              htmlFor='fileInput'
              className='border rounded-lg p-2 cursor-pointer'
            >
              Choose File
            </label>
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            {image && (
              <img
                src={image}
                alt='Preview'
                style={{
                  maxWidth: '100%',
                  maxHeight: '80px',
                  marginTop: '20px'
                }}
              />
            )}
          </Form.Item>
          <Form.Item className='mb-0'>
            <Button htmlType='submit'>Submit</Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  )
}
