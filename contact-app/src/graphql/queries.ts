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
      contactDetail {
        address
        contactId
        country
        pincode
      }
    }
  }
`;

export const GET_CONTACTS_Paginated = gql`
query GetPaginatedContacts($pageNumber: Int!, $pageSize: Int!, $searchQuery: String!) {
  contactPaginated(
    pageNumber: $pageNumber
    pageSize: $pageSize
    searchQuery: $searchQuery
  ) {
    pageNumber
    pageSize
    totalCount
    contacts {
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
}
`;