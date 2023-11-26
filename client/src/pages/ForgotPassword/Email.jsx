import imageLogoLogin from "../../assets/images/logo-login.png";
import { Button, Image, Form, Input } from 'antd'
import React from 'react'

function Email() {
  return (
    <div className='flex gap-x-10'>
        <div>
        <p className='text-lg font-bold mb-5'>Nhập email của tài khoản</p>
        <Form>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Username!" },
                {
                  message: "Vui lòng nhập địa chỉ email hợp lệ!",
                },
                // {validator: (_, value)=>{

                // }}
              ]}
            >
              <Input
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="text-black">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div>
        <Image
          src={imageLogoLogin}
          preview={false}
          alt="image-logo"
          height="200px"
          width="200px"
        />
        <p className="text-xl font-bold mt-10 text-center">
          Mua sắm tại Dwatch
        </p>
      </div>
        
    </div>
  )
}

export default Email