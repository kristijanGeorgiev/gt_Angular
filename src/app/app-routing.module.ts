import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceAddComponent } from './service-add/service-add.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { HomeComponent } from './home/home.component';
import { BookingListComponent } from './client/booking-list/booking-list.component';
import { BookingAddComponent } from './client/booking-add/booking-add.component';
import { BookingDetailComponent } from './client/booking-detail/booking-detail.component';
import { BookingEditComponent } from './client/booking-edit/booking-edit.component';
import { SignupComponent } from './signup/signup.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ClientProfileComponent } from './client/client-profile/client-profile.component';
import { ClientLayoutComponent } from './client/client-layout/client-layout.component';
import { BookingFeedbackComponent } from './client/booking-feedback/booking-feedback.component';
import { FeedbackAddComponent } from './client/feedback-add/feedback-add.component';
import { FeedbackEditComponent } from './client/feedback-edit/feedback-edit.component';
import { BookingInvoiceComponent } from './client/booking-invoice/booking-invoice.component';
import { InvoiceDetailComponent } from './client/invoice-detail/invoice-detail.component';
import { EmployeeLayoutComponent } from './employee/employee-layout/employee-layout.component';
import { NoteAddComponent } from './employee/note-add/note-add.component';
import { NoteEditComponent } from './employee/note-edit/note-edit.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';
import { EmployeeBookingListComponent } from './employee/employee-booking-list/employee-booking-list.component';
import { EmployeeBookingNoteComponent } from './employee/employee-booking-note/employee-booking-note.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { ClientListComponent } from './admin/client-list/client-list.component';
import { EmployeeListComponent } from './admin/employee-list/employee-list.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminEditComponent } from './admin/admin-edit/admin-edit.component';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { EmployeeEditComponent } from './admin/employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './admin/employee-detail/employee-detail.component';
import { EmployeeAddComponent } from './admin/employee-add/employee-add.component';
import { ClientAddComponent } from './admin/client-add/client-add.component';
import { ClientDetailComponent } from './admin/client-detail/client-detail.component';
import { ClientEditComponent } from './admin/client-edit/client-edit.component';
import { AdminBookingsComponent } from './admin/admin-bookings/admin-bookings.component';
import { AdminFeedbacksComponent } from './admin/admin-feedbacks/admin-feedbacks.component';
import { AdminInvoicesComponent } from './admin/admin-invoices/admin-invoices.component';
import { AdminBookingDetailComponent } from './admin/admin-booking-detail/admin-booking-detail.component';
import { BookingStatusListComponent } from './admin/booking-status-list/booking-status-list.component';
import { BookingStatusEditComponent } from './admin/booking-status-edit/booking-status-edit.component';
import { BookingStatusAddComponent } from './admin/booking-status-add/booking-status-add.component';
import { WorkPositionListComponent } from './admin/work-position-list/work-position-list.component';
import { WorkPositionEditComponent } from './admin/work-position-edit/work-position-edit.component';
import { WorkPositionAddComponent } from './admin/work-position-add/work-position-add.component';
import { AdminFeedbacksDetailComponent } from './admin/admin-feedbacks-detail/admin-feedbacks-detail.component';
import { AdminInvoicesDetailComponent } from './admin/admin-invoices-detail/admin-invoices-detail.component';
import { PendingBookingsComponent } from './admin/pending-bookings/pending-bookings.component';
import { PendingBookingDetailComponent } from './admin/pending-booking-detail/pending-booking-detail.component';
import { CompletedBookingsComponent } from './admin/completed-bookings/completed-bookings.component';
import { CreateInvoiceComponent } from './admin/create-invoice/create-invoice.component';
import { CompanyInfoComponent } from './admin/company-info/company-info.component';
import { AdminInvoicesEditComponent } from './admin/admin-invoices-edit/admin-invoices-edit.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { ReportsEmployeeComponent } from './admin/reports-employee/reports-employee.component';
import { ReportsInvoiceComponent } from './admin/reports-invoice/reports-invoice.component';
import { ReportsBstComponent } from './admin/reports-bst/reports-bst.component';
import { ReportsRevenueComponent } from './admin/reports-revenue/reports-revenue.component';
import { ReportsBookingComponent } from './admin/reports-booking/reports-booking.component';
import { ReportsAllinvoicesComponent } from './admin/reports-allinvoices/reports-allinvoices.component';
import { ReportsClientinvoicesComponent } from './admin/reports-clientinvoices/reports-clientinvoices.component';
import { AssignedBookingsComponent } from './admin/assigned-bookings/assigned-bookings.component';
import { AdminNoteAddComponent } from './admin/admin-note-add/admin-note-add.component';
import { AdminNoteEditComponent } from './admin/admin-note-edit/admin-note-edit.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AssignedBookingEditComponent } from './admin/assigned-booking-edit/assigned-booking-edit.component';
import { EmployeeAssignedBookingComponent } from './employee/employee-assigned-booking/employee-assigned-booking.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'forgotpassword', component: ForgotpasswordComponent},
  { path: 'resetpassword', component: ResetpasswordComponent},
{
  path: 'client-dashboard',
  component: ClientLayoutComponent,
  children: [
    {path: 'dashboard', component: ClientDashboardComponent},
    { path: 'client-profile', component: ClientProfileComponent },
    { path: 'services', component: ServiceListComponent },
    { path: 'service-add', component: ServiceAddComponent },
    { path: 'service-detail/:id', component: ServiceDetailComponent},
    { path: 'service-edit/:id', component: ServiceEditComponent },
    { path: 'bookings', component: BookingListComponent },
    { path: 'booking-add/:serviceId', component: BookingAddComponent },
    { path: 'booking-detail/:id', component: BookingDetailComponent},
    { path: 'booking-edit/:id', component: BookingEditComponent },
    { path: 'booking-feedback', component: BookingFeedbackComponent},
    { path: 'booking-invoice', component: BookingInvoiceComponent},
    { path: 'feedback-add/:bookingId', component: FeedbackAddComponent},
    { path: 'feedback-edit/:id', component: FeedbackEditComponent},
    { path: 'notifications', component: NotificationsComponent},
    { path: 'invoice-detail/:bookingId', component: InvoiceDetailComponent},
  ]
},


  { 
    path: 'employee-dashboard', component: EmployeeLayoutComponent,
    children: [
      { path: 'dashboard', component: EmployeeDashboardComponent },
      { path: 'employee-booking-list', component: EmployeeBookingListComponent},
      { path: 'employee-booking-note', component: EmployeeBookingNoteComponent},
      { path: 'notifications', component: NotificationsComponent},
      { path: 'note-add/:bookingId', component: NoteAddComponent},
      { path: 'note-edit/:id', component: NoteEditComponent},
      { path: 'employee-profile', component: EmployeeProfileComponent},
      { path: 'employee-assigned-booking', component: EmployeeAssignedBookingComponent}
    ]
   },
  {
  path: 'admin-dashboard',
  component: AdminLayoutComponent,
  children: [
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'users/admins', component: AdminListComponent },
    { path: 'admin-edit/:id', component: AdminEditComponent},
    { path: 'admin-detail/:id', component: AdminDetailComponent},
    { path: 'admin-add', component: AdminAddComponent},
    { path: 'users/employees', component: EmployeeListComponent },
    { path: 'employee-edit/:id', component: EmployeeEditComponent},
    { path: 'employee-detail/:id', component: EmployeeDetailComponent},
    { path: 'employee-add', component: EmployeeAddComponent},
    { path: 'client-list', component: ClientListComponent },
    { path: 'client-edit/:id', component: ClientEditComponent},
    { path: 'client-detail/:id', component: ClientDetailComponent},
    { path: 'client-add', component: ClientAddComponent},
    { path: 'admin-bookings', component: AdminBookingsComponent },
    { path: 'admin-booking-detail/:id', component: AdminBookingDetailComponent},
    { path: 'admin-feedbacks', component: AdminFeedbacksComponent},
    { path: 'admin-invoices', component: AdminInvoicesComponent},
    { path: 'bookingStatus', component: BookingStatusListComponent},
    { path: 'bookingStatus-edit/:id', component: BookingStatusEditComponent},
    { path: 'bookingStatus-add', component: BookingStatusAddComponent},
    { path: 'workPosition', component: WorkPositionListComponent},
    { path: 'workPosition-edit/:id', component: WorkPositionEditComponent},
    { path: 'workPosition-add', component: WorkPositionAddComponent},
    { path: 'admin-feedbacks-detail/:id', component: AdminFeedbacksDetailComponent},
    { path: 'notifications', component: NotificationsComponent},
    { path: 'admin-invoices-detail/:id', component: AdminInvoicesDetailComponent},
    { path: 'pending-bookings', component: PendingBookingsComponent},
    { path: 'pending-booking-detail/:id', component: PendingBookingDetailComponent},
    { path: 'completed-bookings', component: CompletedBookingsComponent},
    { path: 'create-invoice/:id', component: CreateInvoiceComponent},
    { path: 'profile', component: AdminProfileComponent },
    { path: 'company-info/:id', component: CompanyInfoComponent},
    { path: 'admin-invoices-edit/:id', component: AdminInvoicesEditComponent},
    { path: 'reports', component: ReportsComponent},
    { path: 'reports-employee', component: ReportsEmployeeComponent},
    { path: 'reports-invoice', component: ReportsInvoiceComponent},
    { path: 'reports-bst', component: ReportsBstComponent},
    { path: 'reports-revenue', component: ReportsRevenueComponent},
    { path: 'reports-booking', component: ReportsBookingComponent},
    { path: 'reports-allinvoices', component: ReportsAllinvoicesComponent},
    { path: 'reports-clientinvoices', component: ReportsClientinvoicesComponent},
    { path: 'assigned-bookings', component: AssignedBookingsComponent},
    { path: 'admin-note-add/:bookingId', component: AdminNoteAddComponent},
    { path: 'admin-note-edit/:id', component: AdminNoteEditComponent},
    { path: 'assigned-booking-edit/:id', component: AssignedBookingEditComponent}
  ]
},

  { path: 'client-layout', component: ClientLayoutComponent},
  { path: 'invoice-detail/:id', component: InvoiceDetailComponent},
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
