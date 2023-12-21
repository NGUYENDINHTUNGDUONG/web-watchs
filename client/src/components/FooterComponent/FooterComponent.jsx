import React from "react";
import { WrapperHeader } from "./style";
import { PhoneOutlined, MessageOutlined, SettingOutlined } from "@ant-design/icons";

const FooterComponent = () => {
  return (
    <div>
      <div className="px-[130px] py-5 bg-black">
        <div className="grid grid-cols-4">
          <div className="text-white">
            <div className="bg-red-600 p-2 pl-10 text-xl rounded-lg mb-4 flex gap-x-10">
              <PhoneOutlined className="text-[32px]" />
              <div>
                0919 95 32 80 <br /> TƯ VẤN BÁN HÀNG
              </div>
            </div>

            <div className="bg-red-600 p-2 pl-10 text-xl rounded-lg mb-4 flex gap-x-10">
              <MessageOutlined className="text-[32px]" />
              <div>
                0247 306 3555 <br />
                HỖ TRỢ DỊCH VỤ
              </div>
            </div>

            <div className="bg-red-600 p-2 pl-10 text-xl rounded-lg mb-4 flex gap-x-10">
              <SettingOutlined className="text-[32px]" />
              <div>
                0247 306 3555 <br />
                TƯ VẤN KỸ THUẬT
              </div>
            </div>
          </div>
          <div className="text-white pl-10 text-[20px]">
            <div className="mb-2">CHĂM SÓC KHÁCH HÀNG</div>
            <div className="text-gray-500 mb-2">Chính sách đổi trả</div>
            <div className="text-gray-500 mb-2">Chính sách bảo hành</div>
            <div className="text-gray-500">Tra cứu bảo hành</div>
          </div>
          <div className="text-white pl-10 text-[20px]">
            <div className="mb-2">VỀ DWATCH</div>
            <div className="text-gray-500 mb-2">Giới thiệu đồng hồ Dwatch</div>
            <div className="text-gray-500 mb-2">Triết lý kinh doanh</div>
            <div className="text-gray-500 mb-2">Giấy chứng nhận và giải thưởng</div>
            <div className="text-gray-500">Khách hàng nói gì về chúng tôi</div>
          </div>
          <div className="text-white pl-10 text-[20px] ">
          <div className="mb-2">TIỆN ÍCH </div>
            <div className="text-gray-500 mb-2">Tin tức</div>
            <div className="text-gray-500 mb-2">Kiến thức đồng hồ</div>
            <div className="text-gray-500 mb-2">Thông tin liên hệ</div>
            <div className="text-gray-500">Tuyển dụng</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
