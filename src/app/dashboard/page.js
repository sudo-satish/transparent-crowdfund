import { createPaymentLink } from "../api/funds/route";
import DashboardUI from "./DashboardUI";

export default async function Dashboard() {
    return <DashboardUI />;
}