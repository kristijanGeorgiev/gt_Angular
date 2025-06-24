export interface Admin {
    userId: number;
    username: string;
    email: string;
    createdAt: Date
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    dateOfBirth: string;
}
export interface AdminStatistic {
  totalNumberOfClients: number;
  totalNumberOfPendingBookings: number;
  totalNumberOfBookingsForCurrentYear: number;
  totalNumberOfBookingsForCurrentMonth: number;
}
export interface Booking {
  bookingID: number;
  userID: number;
  serviceID: number;
  bookingDate: string;
  serviceDate: string;
  contactName: string;
  address: string;
  description: string;
  price: number;
  isPaid: boolean;
  paymentMethod: string;
  bookingStatusId: number;
  bookingStatusName: string;
  serviceName: string;
  InvoiceID: number;
  assignedEmployees: Employee[];
  assignedEmployeeIds: number[];
}
export interface BookingEmployee {
    bookingID: number;
    employeeID: number;
    assignedAt: Date;
    notes: string;
}
export interface BookingStatus {
    id: number;
    statusName: string;
}
export interface Client {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string;
}
export interface UpdateUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  workPositionId?: number;
}
export interface CreateUser {
    username: string;
    email: string;
    password: string;
    phonenumber: string;
    address: string;
    role: string;
    firstName: string;
    lastName: string;
    WorkPositionId?: number;
}
export interface Employee {
    userId: number;
    employeeId: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    dateOfBirth: string;
    phoneNumber: string;
    workPositionId?: number;
    workPositionName: string;
}
export interface EmployeeStatistic {
    employeeID: number;
    employeeName: string;
    completedJobsThisYear: number;
    completedJobsThisMonth: number;
    workingHoursThisYear: number;
    workingHoursThisMonth: number;
    averageRatingThisYear: number;
}
export interface EmployeeCombinedReport {
  employeeId: number;
  employeeName: string;
  totalJobsAssigned: number;
  totalHoursWorked: number;
}
export interface Feedback {
    feedbackID: number;
    bookingID: number;
    serviceID: number;
    rating: number;
    comment: string;
    serviceName: string;
    serviceDate: string;
    contactName: string;
    address: string;
}
export interface Invoice {
    invoiceID: number;
    bookingID: number;
    amount: number;
    tax: number;
    issuedDate: string;
    dueDate: string;
    quantity: number;
    isPaid: boolean;
    contactName: string;
    address: string;
    serviceName: string;
}
export interface Login {
    username: string;
    password: string;
}
export interface LoginResponse {
  token: string;
  role: string;
  username: string;
  address: string;
  email: string;
  phone: string;
  userId: number;
  firstName: string;
  lastName: string;
}
export interface Notification {
    notificationID: number;
    userID: number;
    message: string;
    createdAt: Date;
    fromuserId: number;
}
export interface Notes {
  notesId: number;
  bookingId: number;
  userId: number;
  checkIn: string;
  checkOut: string;
  noteText: string;
}
export interface Service {
    serviceID: number;
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
    image: string;
    unitOfMeasure: string;
}
export interface WorkPosition {
    id: number;
    name: string;
}
export interface CompanyInfo {
    companyId: number;
    companyName: string;
    companyAddress: string
    taxNumber: string;
    phoneNumber: string;
    bank: string;
    bankAccount: string;
}
export interface DashboardStatistics {
  totalClients: number;
  totalEmployees: number;
  totalBookings: number;
  totalRevenue: number;
  pendingBookings: number;
  pendingInvoices: number;
  bookingsByServiceType: BookingsByServiceType[];
  monthlyBookingTrends: MonthlyBookingTrend[];
  revenueByMonth: RevenueByMonth[];
}
export interface BookingsByServiceType {
  serviceName: string;
  totalBookings: number;
}

export interface MonthlyBookingTrend {
  month: string;
  totalBookings: number;
}

export interface RevenueByMonth {
  month: string;
  totalRevenue: number;
}
