import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GraphQLClient } from 'graphql-request';
import { GET_CONTACTS_Paginated, GET_CONTACT_BY_ID } from '../graphql/queries';
import { ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT } from '../graphql/mutations';
import { Contact } from '../interfaces/Contact';


interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  pageNumber : number;
  pageSize: number;
  totalCount: number;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
  pageNumber: 1,
  pageSize: 4,
  totalCount: 0,
};



const client = new GraphQLClient('https://localhost:1265/graphql');

// Async thunk for fetching all contacts
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (data:any) => {
  debugger
  const {pageNumber,pageSize,searchQuery} =  data;
  const response = await client.request(GET_CONTACTS_Paginated,{ pageNumber, pageSize,searchQuery });
  return response.contactPaginated;
});

// Async thunk for fetching a contact by ID
export const fetchContactById = createAsyncThunk('contacts/fetchContactById', async (id: number) => {
  const response = await client.request(GET_CONTACT_BY_ID, { id });
  return response.contactById;
});

// Async thunk for adding a new contact
export const addContact = createAsyncThunk('contacts/addContact', async (contact: Omit<Contact, 'id'>) => {
  const response = await client.request(ADD_CONTACT, { input: contact });
  return response.addContact;
});

// Async thunk for updating a contact
export const updateContact = createAsyncThunk('contacts/updateContact', async (contact: Contact) => {
  const response = await client.request(UPDATE_CONTACT, { input: contact });
  return response.updateContact;
});

// Async thunk for deleting a contact
export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id: number) => {
  await client.request(DELETE_CONTACT, { id });
  return id;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.contacts = action.payload.contacts;
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contacts';
      })
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.loading = false;
        const contact = action.payload;
        const existingContact = state.contacts.find(c => c.id === contact.id);
        if (existingContact) {
          Object.assign(existingContact, contact);
        } else {
          state.contacts.push(contact);
        }
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch contact by ID';
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add contact';
      })
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.loading = false;
        const updatedContact = action.payload;
        const index = state.contacts.findIndex(c => c.id === updatedContact.id);
        if (index !== -1) {
          state.contacts[index] = updatedContact;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update contact';
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.contacts = state.contacts.filter(c => c.id !== action.payload);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete contact';
      });
  },
});

export default contactsSlice.reducer;
