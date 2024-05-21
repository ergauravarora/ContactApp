export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    image : string;
    contactDetail:ContactDetail
  }

  export interface ContactDetail
  {
    contactId: number;
    address: string;
    pincode: string;
    country: string;
  }
  