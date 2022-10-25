import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import { useDispatch } from 'react-redux';
import { removeContact } from 'redux/contactsSlice';
import { SafeButton, UnsafeButton } from 'components/Shared';
import { theme, transitionDuration } from 'constants/theme';
import {
  DelettingCaptionContainer,
  DelettingContact,
  DelettingContactIcon,
  ButtonContainer,
} from './DeleteContactPrompt.styled';

export const DeleteContactPrompt = ({ id, name, onClose }) => {
  const dispatch = useDispatch();

  const onDeleteButtonClick = () => {
    onClose();

    setTimeout(() => {
      dispatch(removeContact({ contactID: id }));

      Notify.success(`Contact was successfully deleted`);
    }, transitionDuration);
  };

  return (
    <>
      <DelettingCaptionContainer>
        <DelettingContactIcon size={theme.sizes.delettingContactIcon} />
        <DelettingContact>{name}</DelettingContact>
      </DelettingCaptionContainer>
      <ButtonContainer>
        <UnsafeButton type="button" onClick={onDeleteButtonClick}>
          Delete
        </UnsafeButton>
        <SafeButton type="button" onClick={onClose}>
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
