import { gql } from 'graphql-request';

export const GET_CONTACTS = gql`
  query GetContacts {
    contacts {
      id
      name
      email
      phone
      image
    }
  }
`;

export const GET_CONTACT_BY_ID = gql`
  query GetContactById($id: Int!) {
    contactById(id: $id) {
      id
      name
      email
      phone
      image
    }
  }
`;

export const GET_CONTACTS_Paginated = gql`
query GetPaginatedContacts($pageNumber: Int!, $pageSize: Int!) {
  contactPaginated(pageNumber: $pageNumber, pageSize: $pageSize) {
    pageNumber
    pageSize
    totalCount
    contacts {
      email
      id
      image
      name
      phone
    }
  }
}
`;