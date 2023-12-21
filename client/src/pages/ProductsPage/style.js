import { Col } from "antd"
import styled from "styled-components"

export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    flex-wrap: wrap;
`

export const WrapperNavbar = styled(Col)`
    background: #fff; 
    padding: 10px;
    border-radius: 4px;
    height: fit-content;
    width: 200px;
`