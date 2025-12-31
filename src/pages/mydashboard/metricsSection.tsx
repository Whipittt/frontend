import MetricsCard from "@/components/metricCard";

export default function MetricsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricsCard
        label={"Total Recipes Tried"}
        value={48}
        valueBold
        footer={"Up by 6 since last week"}
        footerArrow="up"
      />
      <MetricsCard
        label={"Saved Recipes"}
        value={20}
        valueBold
        footer={"Your favorite dishes at a glance"}
        footerArrow="right"
      />
      <MetricsCard
        label={"Planned Meals"}
        value={12}
        valueBold
        footer={"This week’s meal plan ready"}
        footerArrow="right"
      />
    </div>
  );
}
