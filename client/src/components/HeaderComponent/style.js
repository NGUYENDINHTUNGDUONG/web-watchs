import styled from "styled-components";

export const WrapperHeader = styled.header`
  padding: 25px;
  background-color: #d70018;
  flex-wrap: nowrap;
`;
export const WrapperHeaderText = styled.span`
  font-size: 30px;
  color: white;
  font-weight: bold;
  text-align: left;
  display: flex;
  justify-content: center;
`;
export const WrapperHeaderTextSmall = styled.span`
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
`;
export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
`;
export const WrapperType = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  height: 44px;
  background-color: #303032;
  color: #fff;
  padding: 0 130px;
`;
export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;
