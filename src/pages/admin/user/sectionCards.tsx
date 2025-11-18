import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="@container/card rounded-3xl">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-3xl text-secondary font-normal tabular-nums @[250px]/card:text-3xl">
            1,250.00
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground text-xs">
            +8.3% Increase this month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-3xl">
        <CardHeader>
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-3xl text-secondary font-normal tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <span className="text-muted-foreground text-xs">
            Strong engagement and retention
          </span>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-3xl">
        <CardHeader>
          <CardDescription>User Growth Rate</CardDescription>
          <CardTitle className="text-3xl text-secondary font-normal tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground text-xs">
            Consistent increase in new cooks
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-3xl">
        <CardHeader>
          <CardDescription>Average Rating</CardDescription>
          <CardTitle className="text-3xl text-secondary font-normal tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground text-xs">
            Maintaining high user satisfaction
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
