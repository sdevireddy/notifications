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

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "analytics",
                    element: <h1 className="title">Analytics</h1>,
                },
                {
                    path: "reports",
                    element: <h1 className="title">Reports</h1>,
                },
                {
                    path: "leads",
                    element: <LeadPage />,
                },
                {
                    path: "leads/create",
                    element: <LeadCreationForm />,
                },
                {
                    path: "Contacts",
                    /* element: <Contacts/>, */
                    element: <Contacts1 />,
                },
                {
                    path: "Deals",
                    element: <DealsPage />,
                },
                {
                    path: "workflow",
                    element: <Workflow />,
                },
                {
                    path: "Accounts",
                    element: <Accounts />,
                },
                {
                    path: "LeadCreationForm",
                    element: <NewLead />,
                },
                {
                    path: "ViewLead/:id",
                    element: <ViewLead />,
                },
                {
                    path: "verified-customers",
                    element: <h1 className="title">Verified Customers</h1>,
                },
                {
                    path: "products",
                    element: <h1 className="title">Products</h1>,
                },
                {
                    path: "new-product",
                    element: <h1 className="title">New Product</h1>,
                },
                {
                    path: "inventory",
                    element: <h1 className="title">Inventory</h1>,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Settings</h1>,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
