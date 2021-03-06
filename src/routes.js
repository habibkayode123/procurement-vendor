import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Login from "views/Logins.js";
import Register from "views/Register.js";
import ListQuotation from "./views/vendor/ListQuotation.js";
import Budget from "./budget/Budget.js";
import PurchaseRequest from "views/PurchaseRequest.js";

const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Budget",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },

  // {
  // 	path: "/login",
  // 	name: "Login",
  // 	icon: "nc-icon nc-chart-pie-35",
  // 	component: Login,
  // 	layout: "/admin",
  // },

  {
    path: "/users",
    name: "Sign Up",
    icon: "nc-icon nc-chart-pie-35",
    component: Register,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Budget Upload",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },

  // {
  // 	path: "/budget",
  // 	name: "Budget",
  // 	icon: "nc-icon nc-circle-09",
  // 	component: Budget,
  // 	layout: "/admin",
  // },

  // {
  // 	path: "/purchase",
  // 	name: "Purchase Request",
  // 	icon: "nc-icon nc-circle-09",
  // 	component: PurchaseRequest,
  // 	layout: "/admin",
  // },
  {
    path: "/table",
    name: "Log out",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/quotations-list",
    name: "Quotations",
    icon: "nc-icon nc-bell-55",
    component: ListQuotation,
    layout: "/admin",
  },
];

export default dashboardRoutes;
