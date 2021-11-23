import style from './index.module.scss'
import { useHistory } from 'react-router'
import { Button } from 'antd'
import { AiOutlineArrowLeft } from 'react-icons/ai'

interface BackButtonProps {
    route: string
}

const BackButton: React.FC<BackButtonProps> = ({ route }: any) => {
    const history = useHistory()
    return (
        <Button className={style.back_button} onClick={() => history.push(route)}>
            <AiOutlineArrowLeft />
            Quay lại
        </Button>
    )
}

export default BackButton
