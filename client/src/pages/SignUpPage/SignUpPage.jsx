import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';

import * as UserService from '../../services/UserService';
import * as message from '../../components/Message/Message';
import imageLogoLogin from '../../assets/images/logo-login.png';
// import Loading from "../../components/LoadingComponent/LoadingComponent";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from '../SignInPage/style';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const mutation = useMutationHooks((data) => UserService.registerUser(data));

  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleNavigateSignIn();
    } else if (isError) {
      message.error();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeFullname = (value) => {
    setFullName(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };

  const handleNavigateSignIn = () => {
    navigate('/sign-in');
  };

  const handleSignUp = () => {
    mutation.mutate({
      fullName,
      email,
      password,
      confirmPassword,
      phone,
      address,
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
          height: '545px',
          borderRadius: '6px',
          background: '#fff',
          display: 'flex',
        }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập vào tạo tài khoản</p>
          <InputFormComponent
            style={{ marginBottom: '10px' }}
            placeholder='Full Name'
            value={fullName}
            onChange={handleOnchangeFullname}
          />
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
              style={{ marginBottom: '10px' }}
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
              }}>
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputFormComponent
              placeholder='comfirm password'
              type={isShowConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
            />
          </div>
          <InputFormComponent
            style={{ marginBottom: '10px' }}
            placeholder='phone number'
            value={phone}
            onChange={handleOnchangePhone}
          />
          <InputFormComponent
            style={{ marginBottom: '10px' }}
            placeholder='Address'
            value={address}
            onChange={handleOnchangeAddress}
          />
          {data?.status === 'ERR' && (
            <span style={{ color: 'red' }}>{data?.message}</span>
          )}
          {/* <Loading isLoading={isLoading}> */}
          <ButtonComponent
            htmlType='submit'
            disabled={
              !email.length || !password.length || !confirmPassword.length
            }
            onClick={handleSignUp}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px',
            }}
            textbutton={'Đăng ký'}
            styleTextButton={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: '700',
            }}></ButtonComponent>
          {/* </Loading> */}
          <p>
            Bạn đã có tài khoản?{' '}
            <WrapperTextLight onClick={handleNavigateSignIn}>
              {' '}
              Đăng nhập
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogoLogin}
            preview={false}
            alt='iamge-logo'
            height='203px'
            width='203px'
          />
          <h4>Mua sắm tại LTTD</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
