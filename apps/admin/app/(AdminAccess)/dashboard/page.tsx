import DashboardHeading from "./_components/DashboardHeading";
import DashboardQuickActions from "./_components/DashboardQuickActions";
import AppHealth from "./_components/AppHealth";

export default function DashboardPage() {
  return (
    <>
      <DashboardHeading />
      <AppHealth />
      <DashboardQuickActions />
    </>
  );
}
