import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
// import { useDispatch } from 'react-redux';
import { useRemoveContactMutation } from 'redux/contactsSlice';
import { SafeButton, UnsafeButton } from 'components/Shared';
import { Loader } from 'components/Shared';
import { theme } from 'constants/theme';
import {
  DelettingCaptionContainer,
  DelettingContact,
  DelettingContactIcon,
  ButtonContainer,
} from './DeleteContactPrompt.styled';

export const DeleteContactPrompt = ({ id, name, onClose }) => {
  const [removeContact, { isLoading }] = useRemoveContactMutation();

  const onDeleteButtonClick = async id => {
    try {
      await removeContact(id);
      Notify.success(`Contact was successfully deleted`);
      onClose();
    } catch (error) {
      Notify.failure(`Something went wrong`);
    }
  };

  return (
    <>
      <DelettingCaptionContainer>
        <DelettingContactIcon size={theme.sizes.delettingContactIcon} />
        <DelettingContact>{name}</DelettingContact>
      </DelettingCaptionContainer>
      <ButtonContainer>
        <Loader shouldShown={isLoading} position="absolute" />
        <UnsafeButton
          type="button"
          disabled={isLoading}
          onClick={() => onDeleteButtonClick(id)}
        >
          Delete
        </UnsafeButton>
        <SafeButton type="button" disabled={isLoading} onClick={onClose}>
          Cancel
        </SafeButton>
      </ButtonContainer>
    </>
  );
};

DeleteContactPrompt.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
