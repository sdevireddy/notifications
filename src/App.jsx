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
              { path: "apply-leave", element: <ApplyLeavePage />},
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
    <div>
        <RouterProvider router={router} />
        <Toaster />
    </div>
  );
}

export default App;
