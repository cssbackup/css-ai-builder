import type { DashboardTab } from "../sidebar";
import DashboardTabContent from "./dashboard-tab";
import WebsitesTab from "./websites-tab";
import TemplatesTab from "./templates-tab";
import SettingsTab from "./settings-tab";
import HelpTab from "./help-tab";
import ProfileTab from "./profile-tab";

type UserProfile = { name: string; email: string; avatar?: string };

export default function DashboardChildren({ activeTab, user, onUserSave }: { activeTab: DashboardTab; user: UserProfile; onUserSave: (user: UserProfile) => void }) {
  switch (activeTab) {
    case "My Websites":
      return <WebsitesTab />;
    case "Templates":
      return <TemplatesTab />;
    case "Settings":
      return <SettingsTab user={user} onSave={onUserSave} />;
    case "Profile":
      return <ProfileTab user={user} onSave={onUserSave} />;
    case "Help":
      return <HelpTab />;
    default:
      return <DashboardTabContent userName={user.name} />;
  }
}
