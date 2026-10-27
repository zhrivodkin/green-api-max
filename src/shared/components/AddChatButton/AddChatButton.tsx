import {useState} from "react";
import CheckAccountModal from "../CheckAccountModal/CheckAccountModal.tsx";

type Props = {
  size?: 'small' | 'medium';
};

const AddChatButton = ({ size = 'medium' }: Props) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const showCheckAccountModal = () => {
    setIsFormVisible(true);
  };

  const hideCheckAccountModal = () => {
    setIsFormVisible(false);
  };

  return (
    <>
      {isFormVisible && (
        <CheckAccountModal onClose={hideCheckAccountModal} />
      )}
      <button
        className="button"
        onClick={showCheckAccountModal}
      >
        {size === 'medium' ? 'Создать чат' : '+'}
      </button>
    </>
  );
};

export default AddChatButton;
