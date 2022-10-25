import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, getContactsData } from 'redux/contactsSlice';
import { Notify } from 'notiflix';
import { createNewValidationSchema } from 'utils';
import { theme } from 'constants/theme';
import { SafeButton, UnsafeButton } from 'components/Shared';
import {
  StyledForm,
  FormFieldContainer,
  FormField,
  FormFieldLabel,
  UserFieldIcon,
  NumberFieldIcon,
  ButtonContainer,
  ErrorMessageField,
} from './AddContactForm.styled';

export const AddContactForm = ({ onClose }) => {
  const contacts = useSelector(getContactsData);
  const dispatch = useDispatch();

  const validationSchema = createNewValidationSchema(contacts);

  const onNewContactSubmit = newContactData => {
    dispatch(addContact(newContactData));

    Notify.success(`New contact was successfully added`);

    onClose();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => onNewContactSubmit(validationSchema.cast(values))}
    >
      {({ values, errors }) => (
        <StyledForm autoComplete="off">
          <FormFieldContainer isError={errors.name} isFilled={values.name}>
            <FormField
              id="contact-name"
              name="name"
              placeholder=" "
              type="text"
            />
            <UserFieldIcon size={theme.sizes.addFormFieldIcon} />
            <FormFieldLabel htmlFor="contact-name">Contact name</FormFieldLabel>
            <ErrorMessageField isError={errors.name} isFilled={values.name}>
              {errors.name}
            </ErrorMessageField>
          </FormFieldContainer>
          <FormFieldContainer isError={errors.number} isFilled={values.number}>
            <FormField
              id="contact-number"
              name="number"
              placeholder=" "
              type="tel"
            />
            <NumberFieldIcon size={theme.sizes.addFormFieldIcon} />
            <FormFieldLabel htmlFor="contact-number">
              Phone number
            </FormFieldLabel>
            <ErrorMessageField isError={errors.number} isFilled={values.number}>
              {errors.number}
            </ErrorMessageField>
          </FormFieldContainer>
          <ButtonContainer>
            <UnsafeButton type="button" onClick={onClose}>
              Cancel
            </UnsafeButton>
            <SafeButton
              type="submit"
              disabled={
                !values.name || !values.number || errors.name || errors.number
              }
            >
              Add contact
            </SafeButton>
          </ButtonContainer>
        </StyledForm>
      )}
    </Formik>
  );
};
