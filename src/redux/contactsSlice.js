import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { nanoid } from 'nanoid';
import { truncateInnerWhitespaces } from 'utils';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { data: [] },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.data.push(action.payload);
      },
      prepare(newContactData) {
        return {
          payload: {
            id: nanoid(14),
            name: truncateInnerWhitespaces(newContactData.name),
            number: truncateInnerWhitespaces(newContactData.number),
          },
        };
      },
    },
    removeContact(state, action) {
      state.data = state.data.filter(
        contact => contact.id !== action.payload.contactID
      );
    },
  },
});

const persistConfig = {
  key: 'phonebook',
  storage,
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, removeContact } = contactsSlice.actions;

export const getContactsData = state => state.contacts.data;
