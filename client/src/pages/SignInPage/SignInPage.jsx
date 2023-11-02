import React, { useState, useEffect } from 'react';
import { Image } from 'antd';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

import * as UserService from '../../services/UserService.js';
import imageLogoLogin from '../../assets/images/logo-login.png';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent.jsx";
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent.jsx';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.jsx';
import { useMutationHooks } from '../../hooks/useMutationHook.js';
import { updateUser } from '../../redux/slides/userSlide.js';
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from './style.js';

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate('/');
      }
      localStorage.setItem('access_token', `${data?.access_token}`);
      localStorage.setItem('refresh_token', `${data?.refresh_token}`);
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    }
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    const refreshToken = localStorage.getItem('refresh_token');
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    console.log('logingloin');
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.53)',
        height: '100vh',
      }}>
      <div
        style={{
          width: '800px',
          height: '445px',
          borderRadius: '6px',
          background: '#fff',
          display: 'flex',
        }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập vào tạo tài khoản</p>
          <InputFormComponent
            style={{ marginBottom: '10px' }}
            placeholder='abc@gmail.com'
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
              }}>
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputFormComponent
              placeholder='password'
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          {data?.status === 'ERR' && (
            <span style={{ color: 'red' }}>{data?.message}</span>
          )}
          {/* <LoadingComponent isLoading={isLoading}> */}
          <ButtonComponent
            htmlType='submit'
            disabled={!email.length || !password.length}
            onClick={handleSignIn}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px',
            }}
            textbutton={'Đăng nhập'}
            styleTextButton={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: '700',
            }}></ButtonComponent>
          {/* </LoadingComponent> */}
          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{' '}
            <WrapperTextLight onClick={handleNavigateSignUp}>
              {' '}
              Tạo tài khoản
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogoLogin}
            preview={false}
            alt='image-logo'
            height='203px'
            width='203px'
          />
          <h4>Mua sắm tại Dwatch</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
