export type AudienceDataType = {
  id: number;
  name: string;
  email: string;
  company: string;
  phone: string;
  position: string;
  lastLogin: string;
  checked: boolean;
};

export type CompanyDataType = {
  id: number;
  company: string;
  address: string;
  email: string;
  phone: string;
  contact_person: string;
  checked: boolean;
};

export type TableHeaderDataType = {
  id: number;
  inputId: string;
  label: string;
};

export type TaskDataType = {
  id: number;
  taskName: string;
  status: string;
  startDate: string;
  dueDate: string;
  assignedTo: string;
  priority: string;
};

export type LeadsDataType = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  company: string;
  description: string;
};

export type CustomerDataType = {
  customerId: number;
  name: string;
  phone: string;
  group: string;
  customerType: number;
  creditLimit: number;
  openingBalance: number;
  debit: string;
  credit: string;
  closingBalance: string;
  isChecked: boolean;
};

export type AllEmployeeDataType = {
  image: string;
  employeeId: number;
  name: string;
  section: string;
  phone: string;
  presentAddress: string;
};

export type AttendanceDataType = {
  date: string;
  name: string;
  employeeId: number;
  division: string;
  shift: string;
};

export type AllCustomerDataType = {
  name: string;
  userName: string;
  lastActive: string;
  dateRegistered: string;
  email: string;
  orders: number;
  totalSpent: number;
  city: string;
  postalCode: number;
  aov: number;
};

export type AllProductDataType = {
  id: number;
  product_name: string;
  category: string;
  sku: number;
  image: string;
  stock: number;
  price: number;
  sales: number;
  rating: number;
  published: string;
};

export type Option = {
  value: string;
  label: string;
};

export type CategoryDataType = {
  id: number;
  category_name: string;
  description: string;
  slug: string;
  count: number;
  image: string;
};

export type OrderListDataType = {
  order_id: number;
  customer_name: string;
  status: string;
  product_number: number;
  price: number;
  badge: string;
  delivery_status: string;
  order_date: string;
  payment_method: string;
};

export interface EventApi {
  id: string;
  title: string;
  start: string | Date;
  classNames: string[];
  allDay?: boolean;
  extendedProps?: { category: string };
}

export interface EmailDataType {
  id: number;
  name: string;
  email_content: string;
}
export interface ActiveStepState {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  step5: boolean;
}
