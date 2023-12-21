import React from 'react'
import { Button, Result } from 'antd';

const NotFoundPage = () => {
  return (
    <Result
    status="404"
    title="404"
    subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
    extra={ <Button
      className="bg-blue-400"

    >
      Back Home
    </Button>}
  />
);
}

export default NotFoundPage