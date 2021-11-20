import style from './index.module.scss'
import { Modal } from 'antd'

const AddModal = ({ children, ...props }: any) => {
    return (
        <Modal className={style.modal_wrapper} {...props}>
            {children}
        </Modal>
    )
}

export default AddModal
