import { Modal } from 'antd'
import React from 'react'
interface IDeleteConfirmModal {
    title: string
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    handleOK: () => void
}

const DeleteConfirmModal: React.FC<IDeleteConfirmModal> = ({
    title,
    visible,
    setVisible,
    handleOK,
}) => {
    const hideModal = () => {
        setVisible(false)
    }

    return (
        <>
            <Modal
                // title={`Xác nhận xóa ${title}`}
                visible={visible}
                onOk={handleOK}
                onCancel={hideModal}
                okText="Xác nhận"
                cancelText="Đóng"
            >
                Xác nhận xóa {title} ?
            </Modal>
        </>
    )
}

export default DeleteConfirmModal
