export interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

export interface BreadcrumbItem {
  title: string;
  disabled?: boolean;
  to?: {
    name: string;
  };
}
