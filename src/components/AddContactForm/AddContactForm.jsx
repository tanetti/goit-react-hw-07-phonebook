import { Formik } from 'formik';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from 'redux/contactsSlice';
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
  const { data: contacts } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const validationSchema = createNewValidationSchema(contacts);

  const onNewContactSubmit = async newContactData => {
    try {
      await addContact(newContactData);
      Notify.success(`New contact was successfully added`);
      onClose();
    } catch (error) {
      Notify.failure(`Something went wrong`);
    }
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
            <UnsafeButton type="button" disabled={isLoading} onClick={onClose}>
              Cancel
            </UnsafeButton>
            <SafeButton
              type="submit"
              disabled={
                !values.name ||
                !values.number ||
                errors.name ||
                errors.number ||
                isLoading
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
