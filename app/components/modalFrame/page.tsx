import Styles from './ModalFrame.module.sass';

interface ModalProps {
    confirm: () =>  void,
    cancel: () => void
}
const ModalFrame = ({confirm, cancel}: ModalProps) => {
    return (
        <div className={Styles.ModalBackground}>
            <div className={Styles.ModalFrame} >
                <h2>Вы действительно хотите перейти на внешний ресурс?</h2>
                <div className={Styles.Buttons}>
                    <button onClick={cancel}>Отказаться</button>
                    <button onClick={confirm}>Перейти</button>
                </div>
            </div>
        </div>
    )
}
export default ModalFrame;