import { Modal } from 'antd'
import React from 'react'

const ModalComponent = ({ title = 'Modal',footer, isOpen = false, children, ...rests }) => {
    return (
        <Modal title={title} footer={footer} open={isOpen} {...rests}>
            {children}
        </Modal>
    )
}

export default ModalComponent