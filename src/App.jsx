import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import Leads from "@/routes/leads/Leads";
import LeadsNew from "@/routes/leads/LeadsNew";
import Contacts from "@/routes/contact/Contacts";
import DealsPage from "@/routes/deals/Deals";
import Accounts from "@/routes/accounts/Accounts";
import NewLead from "@/routes/leads/LeadCreationForm";
import ViewLead from "@/routes/leads/ViewLeadPage";
import Workflow from "@/routes/workflow/ReactFlowComponent";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Contacts1 from "./routes/contact/Contacts1";
import LeadPage from "./routes/leads/new/Lead";
import LeadCreationForm from "./routes/leads/LeadCreationForm";
import ViewLeadPage from "./routes/leads/ViewLeadPage";
import CRMSelectionImport from "./routes/import/Import";
import DataMigrationUpload from "./routes/import/DataMigration";
import EditLead from "./routes/leads/EditLead";
import Users from "./routes/users/Users";
import WorkflowRuleForm from "./routes/workflow/form/WorkflowRuleForm";
import WorkflowPage from "./routes/workflow/WorkFlow";
import Login from "./routes/login/Login";
import Register from "./routes/Register/Register";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./routes/ProtectedRoutes";
import WorkflowBuilder from "./routes/workflow/form/WorkflowRuleForm";

function App() {
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
          { path: "Deals", element: <DealsPage /> },
          { path: "workflow", element: <WorkflowPage /> },
          { path: "workflow/create", element: <WorkflowBuilder /> },
          { path: "Accounts", element: <Accounts /> },
          { path: "import/:source", element: <CRMSelectionImport /> },
          { path: "import/:source/migration", element: <DataMigrationUpload /> },
          { path: "verified-customers", element: <h1>Verified Customers</h1> },
          { path: "products", element: <h1>Products</h1> },
          { path: "new-product", element: <h1>New Product</h1> },
          { path: "inventory", element: <h1>Inventory</h1> },
          { path: "settings", element: <h1>Settings</h1> }
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
            <Toaster/>
        </ThemeProvider>
    );
}

export default App;
