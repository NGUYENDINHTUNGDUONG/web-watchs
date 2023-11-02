import React, { useMemo, useState } from "react";
import { Menu } from "antd";
import { useQueries } from '@tanstack/react-query';
import {
  LineChartOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { getItem } from "../../util/utils";
import { useSelector } from "react-redux";

import CustomizedContent from '../../components/AdminComponent/CustomizedContent';
import Loading from '../../components/LoadingComponent/LoadingComponent';
import AdminUser from "../../components/AdminComponent/AdminUser";
import AdminProduct from "../../components/AdminComponent/AdminProduct";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import * as UserService from '../../services/UserService'
import * as OrderService from '../../services/OrderService'
import * as ProductService from '../../services/ProductService'

const AdminPage = () => {
  const user = useSelector((state) => state?.user)

  const items = [
    getItem('Bảng điều khiển', 'dashboard', <LineChartOutlined />),
    getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />),
    getItem('Sản phẩm', 'products', <AppstoreOutlined />),
    getItem('Người dùng', 'users', <TeamOutlined />),

  ];

  const [keySelected, setKeySelected] = useState('');
  // const getAllOrder = async () => {
  //   const res = await OrderService.getAllOrder(user?.access_token)
  //   return {data: res?.data, key: 'orders'}
  // }

  // const getAllProducts = async () => {
  //   const res = await ProductService.getAllProduct()
  //   console.log('res1', res)
  //   return {data: res?.data, key: 'products'}
  // }

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    console.log('res', res)
    return {data: res?.data, key: 'users'}
  }

  const queries = useQueries({
    queries: [
      // {queryKey: ['products'], queryFn: getAllProducts, staleTime: 1000 * 60},
      {queryKey: ['users'], queryFn: getAllUsers, staleTime: 1000 * 60},
      // {queryKey: ['orders'], queryFn: getAllOrder, staleTime: 1000 * 60},
    ]
  })
  const memoCount = useMemo(() => {
    const result = {}
    try {
      if(queries) {
        queries.forEach((query) => {
          result[query?.data?.key] = query?.data?.data?.length
        })
      }
    return result
    } catch (error) {
      return result
    }
  },[queries])
  const COLORS = {
   users: ['#e66465', '#9198e5'],
   products: ['#a8c0ff', '#3f2b96'],
   orders: ['#11998e', '#38ef7d'],
  };

  const renderPage = (key) => {
    switch (key) {
      case 'dashboard':
      case 'users':
        return (
          <AdminUser />
        )
      case 'products':
        return (
          <AdminProduct />
        )
      // case 'orders':
      //   return (
      //     <OrderAdmin />
      //   )
      default:
        return <></>
    }
  }


  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
  }
  return (
    <>
      <div style={{ display: 'flex',overflowX: 'hidden' }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh'
          }}
          items={items}
          onClick={handleOnCLick}
        />
        <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
          <Loading isLoading={memoCount && Object.keys(memoCount) &&  Object.keys(memoCount).length !== 3}>
            {!keySelected && (
              <CustomizedContent data={memoCount} colors={COLORS} setKeySelected={setKeySelected} />
            )}
          </Loading>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage;
