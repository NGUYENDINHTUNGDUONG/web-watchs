import React from 'react'
import { WrapperTextLight } from '../../pages/SignInPage/style'
import imageLogoLogin from "../../assets/images/logo-login.png";
import { Button, Form, Image, Input } from 'antd'

const ProfileComponent = () => {
  return (
    <div><div className="flex gap-x-10 m-5">
    <div>
      <p className="text-3xl font-bold text-orange-600 mb-5">Xin chào</p>
      <p>Thông tin tài khoản</p>
      <div className="mt-5">
        
      </div>
      {/* </LoadingComponent> */}
      
    </div>
    <div>
      <Image
        src={imageLogoLogin}
        preview={false}
        alt="image-logo"
        height="203px"
        width="203px"
      />
      <p className="text-xl font-bold mt-10 text-center">
        Mua sắm tại Dwatch
      </p>
    </div>
    
  </div></div>
  )
}

export default ProfileComponent