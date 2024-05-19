import { gql } from 'graphql-request';

export const ADD_CONTACT = gql`
  mutation AddContact($input: AddContactInput!) {
    addContact(input: $input) {
      id
      name
      email
      phone
      image
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
