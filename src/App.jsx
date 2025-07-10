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

// Lazy Imports
const Leads = lazy(() => import("@/routes/leads/Leads"));
const LeadPage = lazy(() => import("./routes/leads/new/Lead"));
const LeadCreationForm = lazy(() => import("./routes/leads/LeadCreationForm"));
const ViewLeadPage = lazy(() => import("./routes/leads/ViewLeadPage"));
const EditLead = lazy(() => import("./routes/leads/EditLead"));
const Users = lazy(() => import("./routes/users/Users"));
const Contacts1 = lazy(() => import("./routes/contact/Contacts1"));
const ContactCreationForm = lazy(() => import("./routes/contact/ContactCreationForm"));
const DealsPage = lazy(() => import("./routes/deals/Deals"));
const DealCreationForm = lazy(() => import("./routes/deals/DealCreationForm"));
const WorkflowPage = lazy(() => import("./routes/workflow/WorkFlow"));
const WorkflowBuilder = lazy(() => import("./routes/workflow/form/WorkflowRuleForm"));
const Accounts = lazy(() => import("./routes/accounts/Accounts"));
const AccountCreationForm = lazy(() => import("./routes/accounts/AccountCreationForm"));
const CRMSelectionImport = lazy(() => import("./routes/import/Import"));
const DataMigrationUpload = lazy(() => import("./routes/import/DataMigration"));
const HrDashboard = lazy(() => import("./routes/HR/HrDashboard"));
const Employee = lazy(() => import("./routes/HR/employee/Employee"));
const Attendance = lazy(() => import("./routes/HR/attendance/Attendance"));
const Payroll = lazy(() => import("./routes/HR/payroll/Payroll"));
const Recruitment = lazy(() => import("./routes/HR/recruitments/Recruitment"));
const Leave = lazy(() => import("./routes/HR/leave/Leave"));
const Performance = lazy(() => import("./routes/HR/performance/Performance"));
const EmailTemplate = lazy(() => import("./routes/emailtemplate/EmailTemplate"));
const Login = lazy(() => import("./routes/login/Login"));
const Register = lazy(() => import("./routes/Register/Register"));

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
          { path: "templates/create", element: <EmailTemplate /> },
          { path: "roles", element: <Roles /> },
           { path: "roles/create", element: <CreateRole /> },
          {
            path: "hr",
            children: [
              { path: "", element: <HrDashboard /> },
              { path: "employees", element: <Employee /> },
              { path: "attendance", element: <Attendance /> },
              { path: "payroll", element: <Payroll /> },
              { path: "recruitment", element: <Recruitment /> },
              { path: "leave", element: <Leave /> },
              { path: "performance", element: <Performance /> },
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
    <ThemeProvider storageKey="theme">
        <RouterProvider router={router} />
        <Toaster />
    </ThemeProvider>
  );
}

export default App;
