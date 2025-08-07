import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page"; // keep this eager-loaded
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoutes";
import { Suspense, lazy } from "react";
import Settings from "./routes/settings/Settings";
import TemplateDisplay from "./routes/emailtemplate/templateDisplay";
import ViewFullTemplate from "./routes/emailtemplate/ViewFullTemplate";
import Roles from "./routes/roles/Roles";
import CreateRole from "./routes/roles/CreateRole";
import Login from "./routes/login/Login";
import Register from "./routes/Register/Register";

// Eager Imports (no lazy loading)
import Leads from "@/routes/leads/Leads";
import LeadPage from "./routes/leads/new/Lead";
import LeadCreationForm from "./routes/leads/LeadCreationForm";
import ViewLeadPage from "./routes/leads/ViewLeadPage";
import EditLead from "./routes/leads/EditLead";
import Users from "./routes/users/Users";
import Contacts1 from "./routes/contact/Contacts1";
import ContactCreationForm from "./routes/contact/ContactCreationForm";
import DealsPage from "./routes/deals/Deals";
import DealCreationForm from "./routes/deals/DealCreationForm";
import WorkflowPage from "./routes/workflow/WorkFlow";
import WorkflowBuilder from "./routes/workflow/form/WorkflowRuleForm";
import Accounts from "./routes/accounts/Accounts";
import AccountCreationForm from "./routes/accounts/AccountCreationForm";
import CRMSelectionImport from "./routes/import/Import";
import DataMigrationUpload from "./routes/import/DataMigration";
import HrDashboard from "./routes/HR/HrDashboard";
import Employee from "./routes/HR/employee/Employee";
import Attendance from "./routes/HR/attendance/Attendance";
import Payroll from "./routes/HR/payroll/Payroll";
import Recruitment from "./routes/HR/recruitments/Recruitment";
import Leave from "./routes/HR/leave/Leave";
import Performance from "./routes/HR/performance/Performance";
import EmailTemplate from "./routes/emailtemplate/EmailTemplate";
import ApplyLeavePage from "./routes/HR/leave/Applyleave";
import MarketingDashboard from "./routes/Marketing/MarketingDashboard";
import EmailMarketing from "./routes/Marketing/emailmarketing/EmailMarketing";
import SmsMarketing from "./routes/Marketing/smsmarketing/SmsMarketing";
import SocialMediaMarketing from "./routes/Marketing/socialmediamarketing/SocialMediaMarketing";
import CreateEmailCampaign from "./routes/Marketing/emailmarketing/CreateEmailCampaign";
import TemplateCreation from "./routes/Marketing/emailmarketing/TemplateCreation";
import UsersPage from "./routes/Marketing/Users/Users";
import CreateListPage from "./routes/Marketing/Users/CreateList";
import OrganizationProfile from "./routes/OrgProfile.jsx/OrgProfile";
import UserProfile from "./routes/user/UserProfile";
import AddEmployeePage from "./components/add-employee-modal";
import AddPerformancePage from "./components/add-performance";
import EmployeeDetailsPage from "./routes/HR/employee/Employee-details";
import MarkAttendancePage from "./components/mark-attendance";
import RoleEditPage from "./routes/roles/EditRole";
import MarketingSettings from "./routes/Marketing/MarketingSettings";
import CredentialForm from "./routes/Marketing/CredentialsForm";
import CreateSocialMediaCampaign from "./routes/Marketing/socialmediamarketing/CreateSocialMediaCampaign";
import CreateSMSCampaign from "./routes/Marketing/smsmarketing/CreateSMSCampaign";
import TemplateBuilder from "./routes/emailtemplate/Test";
import Tasks from "./routes/tasks/Tasks";
import TaskCreationForm from "./routes/tasks/CreateTask";
import Meeting from "./routes/meetings/Meeting";
import SalesOrder from "./routes/salesOrder/SalesOrder";
import Calls from "./routes/calls/Calls";
import SalesOrderCreationForm from "./routes/salesOrder/CreateSalesOrder";
import AddPayrollPage from "./components/add-payroll";
import ViewSalesOrder from "./routes/salesOrder/ViewSalesOrder";
import InvoicePage from './routes/invoices/Invoices'
import InvoiceCreationForm from "./routes/invoices/CreateInvoice";
const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                element: <Layout />,
                children: [
                    { index: true, element: <DashboardPage /> },
                    { path: "leads", element: <LeadPage /> },
                    { path: "leads/create", element: <LeadCreationForm /> },
                    { path: "leads/profile/:id", element: <ViewLeadPage /> },
                    { path: "leads/edit/:id", element: <EditLead /> },
                    { path: "users", element: <Users /> },
                    { path: "Contacts", element: <Contacts1 /> },
                    { path: "Contacts/create", element: <ContactCreationForm /> },
                    { path: "Deals", element: <DealsPage /> },
                    { path: "Deals/create", element: <DealCreationForm /> },
                    { path: "workflow", element: <WorkflowPage /> },
                    { path: "workflow/create", element: <WorkflowBuilder /> },
                    { path: "Accounts", element: <Accounts /> },
                    { path: "Accounts/create", element: <AccountCreationForm /> },
                    { path: "import/:source", element: <CRMSelectionImport /> },
                    { path: "import/:source/migration", element: <DataMigrationUpload /> },
                    { path: "verified-customers", element: <h1>Verified Customers</h1> },
                    { path: "products", element: <h1>Products</h1> },
                    { path: "new-product", element: <h1>New Product</h1> },
                    { path: "inventory", element: <h1>Inventory</h1> },
                    { path: "settings", element: <Settings /> },
                    { path: "templates", element: <TemplateDisplay /> },
                    { path: "templates/:id", element: <ViewFullTemplate /> },
                    { path: "templates/create", element: <TemplateBuilder /> },
                    { path: "roles", element: <Roles /> },
                    { path: "user/profile", element: <UserProfile /> },
                    { path: "roles/create", element: <CreateRole /> },
                    { path: "roles/edit", element: <RoleEditPage /> },
                    { path: "org/profile", element: <OrganizationProfile /> },
                    { path: "tasks", element: <Tasks /> },
                    { path: "tasks/create", element: <TaskCreationForm /> },
                    { path: "invoices", element: <InvoicePage /> },
                     { path: "invoices/create", element: <InvoiceCreationForm /> },
                    { path: "meetings", element: <Meeting /> },
                    { path: "salesorders", element: <SalesOrder /> },
                    { path: "salesorders/:id", element: <ViewSalesOrder /> },
                    { path: "salesorders/create", element: <SalesOrderCreationForm /> },
                    { path: "calls", element: <Calls /> },
                    {
                        path: "hr",
                        children: [
                            { path: "", element: <HrDashboard /> },
                            { path: "employees", element: <Employee /> },
                            { path: "add-employee", element: <AddEmployeePage /> },
                            { path: "employee-details/:id", element: <EmployeeDetailsPage /> },
                            { path: "attendance", element: <Attendance /> },
                            { path: "mark-attendance", element: <MarkAttendancePage /> },
                            { path: "payroll", element: <Payroll /> },
                            { path: "add-payroll", element: <AddPayrollPage /> },
                            { path: "recruitment", element: <Recruitment /> },
                            { path: "leave", element: <Leave /> },
                            { path: "apply-leave", element: <ApplyLeavePage /> },
                            { path: "performance", element: <Performance /> },
                            { path: "add-performance", element: <AddPerformancePage /> },
                        ],
                    },
                    {
                        path: "marketing",
                        children: [
                            { path: "", element: <MarketingDashboard /> },
                            { path: "users", element: <UsersPage /> },
                            { path: "templates", element: <TemplateDisplay /> },
                            { path: "users/create", element: <CreateListPage /> },
                            { path: "emailmarketing", element: <EmailMarketing /> },
                            { path: "email-campaigns/create", element: <CreateEmailCampaign /> },
                            { path: "SocialMediaMarketing", element: <SocialMediaMarketing /> },
                            { path: "social-campaigns/create", element: <CreateSocialMediaCampaign /> },
                            { path: "SmsMarketing", element: <SmsMarketing /> },
                            { path: "sms-campaigns/create", element: <CreateSMSCampaign /> },
                            { path: "settings/social/facebook", element: <CredentialForm platform="facebook" /> },
                            { path: "settings/social/twitter", element: <CredentialForm platform="twitter" /> },
                            { path: "settings/social/instagram", element: <CredentialForm platform="instagram" /> },
                            { path: "settings/social/linkedin", element: <CredentialForm platform="linkedin" /> },

                            { path: "Settings", element: <MarketingSettings /> },
                        ],
                    },
                ],
            },
        ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
]);

function App() {
    return (
        <div>
            <RouterProvider router={router} />
            <Toaster />
        </div>
    );
}

export default App;
