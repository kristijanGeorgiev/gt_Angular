import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgChartsModule} from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceEditComponent } from './service-edit/service-edit.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServiceAddComponent } from './service-add/service-add.component';
import { BookingListComponent } from './client/booking-list/booking-list.component';
import { BookingEditComponent } from './client/booking-edit/booking-edit.component';
import { BookingDetailComponent } from './client/booking-detail/booking-detail.component';
import { BookingAddComponent } from './client/booking-add/booking-add.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { PublicHeaderComponent } from './public-header/public-header.component';
import { ClientProfileComponent } from './client/client-profile/client-profile.component';
import { ClientLayoutComponent } from './client/client-layout/client-layout.component';
import { BookingFeedbackComponent } from './client/booking-feedback/booking-feedback.component';
import { FeedbackAddComponent } from './client/feedback-add/feedback-add.component';
import { FeedbackEditComponent } from './client/feedback-edit/feedback-edit.component';
import { BookingInvoiceComponent } from './client/booking-invoice/booking-invoice.component';
import { EmployeeLayoutComponent } from './employee/employee-layout/employee-layout.component';
import { EmployeeProfileComponent } from './employee/employee-profile/employee-profile.component';
import { NoteEditComponent } from './employee/note-edit/note-edit.component';
import { NoteAddComponent } from './employee/note-add/note-add.component';
import { EmployeeBookingListComponent } from './employee/employee-booking-list/employee-booking-list.component';
import { EmployeeBookingNoteComponent } from './employee/employee-booking-note/employee-booking-note.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminEditComponent } from './admin/admin-edit/admin-edit.component';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { AdminAddComponent } from './admin/admin-add/admin-add.component';
import { ClientEditComponent } from './admin/client-edit/client-edit.component';
import { ClientDetailComponent } from './admin/client-detail/client-detail.component';
import { ClientAddComponent } from './admin/client-add/client-add.component';
import { EmployeeEditComponent } from './admin/employee-edit/employee-edit.component';
import { EmployeeDetailComponent } from './admin/employee-detail/employee-detail.component';
import { EmployeeAddComponent } from './admin/employee-add/employee-add.component';
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
import { ClientListComponent } from './admin/client-list/client-list.component';
import { EmployeeListComponent } from './admin/employee-list/employee-list.component';
import { AdminInvoicesDetailComponent } from './admin/admin-invoices-detail/admin-invoices-detail.component';
import { PendingBookingsComponent } from './admin/pending-bookings/pending-bookings.component';
import { PendingBookingDetailComponent } from './admin/pending-booking-detail/pending-booking-detail.component';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
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
import { InvoiceDetailComponent } from './client/invoice-detail/invoice-detail.component';
import { AssignedBookingsComponent } from './admin/assigned-bookings/assigned-bookings.component';
import { AdminNoteAddComponent } from './admin/admin-note-add/admin-note-add.component';
import { AdminNoteEditComponent } from './admin/admin-note-edit/admin-note-edit.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AssignedBookingEditComponent } from './admin/assigned-booking-edit/assigned-booking-edit.component';
import { EmployeeAssignedBookingComponent } from './employee/employee-assigned-booking/employee-assigned-booking.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    ClientDashboardComponent,
    EmployeeDashboardComponent,
    AdminDashboardComponent,
    LoginComponent,
    ServiceListComponent,
    ServiceEditComponent,
    ServiceDetailComponent,
    ServiceAddComponent,
    HomeComponent,
    BookingListComponent,
    BookingEditComponent,
    BookingDetailComponent,
    BookingAddComponent,
    FooterComponent,
    HeaderComponent,
    DashboardHeaderComponent,
    PublicHeaderComponent,
    ClientProfileComponent,
    ClientLayoutComponent,
    ClientListComponent,
    EmployeeListComponent,
    BookingFeedbackComponent,
    FeedbackAddComponent,
    FeedbackEditComponent,
    BookingInvoiceComponent,
    EmployeeLayoutComponent,
    EmployeeProfileComponent,
    BookingInvoiceComponent,
    NoteEditComponent,
    NoteAddComponent,
    EmployeeBookingListComponent,
    EmployeeBookingNoteComponent,
    AdminLayoutComponent,
    AdminListComponent,
    AdminEditComponent,
    AdminDetailComponent,
    AdminAddComponent,
    AdminBookingsComponent,
    ClientEditComponent,
    ClientDetailComponent,
    ClientAddComponent,
    EmployeeEditComponent,
    EmployeeDetailComponent,
    EmployeeAddComponent,
    AdminFeedbacksComponent,
    AdminInvoicesComponent,
    AdminBookingDetailComponent,
    BookingStatusListComponent,
    BookingStatusEditComponent,
    BookingStatusAddComponent,
    WorkPositionListComponent,
    WorkPositionEditComponent,
    WorkPositionAddComponent,
    NotificationsComponent,
    AdminFeedbacksDetailComponent,
    AdminProfileComponent,
    AdminInvoicesDetailComponent,
    PendingBookingsComponent,
    PendingBookingDetailComponent,
    CompletedBookingsComponent,
    CreateInvoiceComponent,
    CompanyInfoComponent,
    AdminInvoicesEditComponent,
    ReportsComponent,
    ReportsEmployeeComponent,
    ReportsInvoiceComponent,
    ReportsBstComponent,
    ReportsRevenueComponent,
    ReportsBookingComponent,
    ReportsAllinvoicesComponent,
    ReportsClientinvoicesComponent,
    InvoiceDetailComponent,
    AssignedBookingsComponent,
    AdminNoteAddComponent,
    AdminNoteEditComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    AssignedBookingEditComponent,
    EmployeeAssignedBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
