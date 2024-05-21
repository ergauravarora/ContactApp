import { gql } from 'graphql-request';

export const ADD_CONTACT = gql`
mutation addContact($input: AddContactInput!) {
  addContact(input:$input) {
    email
    id
    image
    name
    phone
    contactDetail {
      address
      contactId
      country
      pincode
    }
  }
}
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($input: UpdateContactInput!) {
  updateContact(input: $input) {
    id
    name
    email
    phone
    image
    contactDetail {
      address
      contactId
      country
      pincode
    }
  }
}
`;

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: Int!) {
    deleteContact(id: $id)
    {
      id,
      name
    }
  }
`;
