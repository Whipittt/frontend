import { Card, CardHeader } from "@/components/ui/card";
import EditButton from "./editButton";

type Detail = {
  label: string;
  value: string;
};

type ProfileCardProps = {
  header: string; 
  details: Detail[];
};

export default function ProfileCard({ header, details }: ProfileCardProps) {
  return (
    <section>
      <Card className="p-8 rounded-3xl flex justify-between items-start">
        <div className="w-full flex flex-col gap-6">
          <CardHeader className="p-0">
            <span className="font-medium">{header}</span>
          </CardHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {details.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">
                  {item.label}
                </span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <EditButton />
      </Card>
    </section>
  );
}
