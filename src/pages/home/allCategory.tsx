import RecommendationSection from "./recommendationSection";
import DicsoverySection from "./dicsoverySection";
import WeeklySection from "./weeklySection";
import { useAuth } from "@/services/authService";
import RecommendationSectionUnauthenticated from "./recomendationSectionUnauthenticated";

export default function AllCategory() {
  const { loading, isAuthenticated } = useAuth();

  return !loading && isAuthenticated ? (
    <>
      <RecommendationSection />
      <DicsoverySection />
      <WeeklySection />
    </>
  ) : (
    <RecommendationSectionUnauthenticated />
  );
}
