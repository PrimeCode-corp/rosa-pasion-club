import { PortalView } from "@/components/portal/portal-view";
import { mockBusinesses, mockCategories, mockSettings, mockSocialPosts } from "@/lib/mock/data";

// TODO: reemplazar los datos de prueba por consultas a Prisma (Category, Business + terms,
// ClubSetting "default" y SocialPost), como en rosapasion-club/app/(public)/page.tsx.
export default function LandingPage() {
  return (
    <PortalView
      categories={mockCategories}
      businesses={mockBusinesses}
      socialPosts={mockSocialPosts}
      catalogUrl={mockSettings.catalogUrl}
      supportPhone={mockSettings.supportPhone}
      facebookUrl={mockSettings.facebookUrl}
      instagramUrl={mockSettings.instagramUrl}
      tiktokUrl={mockSettings.tiktokUrl}
      clubSettings={mockSettings.clubSettings}
    />
  );
}
