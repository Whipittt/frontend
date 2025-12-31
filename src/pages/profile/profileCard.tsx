import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import EditButton from "./editButton";

type Detail = {
  label: string;
  value: string;
};

type ProfileCardProps = {
  header: string;
  details: Detail[];
  loading?: boolean;
  onEditClick?: () => void;
};

export default function ProfileCard({
  header,
  details,
  loading = false,
  onEditClick,
}: ProfileCardProps) {
  return (
    <Card className="p-8 flex md:flex-row flex-col gap-6 justify-between items-start">
      <div className="w-full flex flex-col gap-6">
        <CardHeader className="p-0">
          {loading ? (
            <Skeleton className="h-5 w-40" />
          ) : (
            <span className="font-medium">{header}</span>
          )}
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-5 w-full max-w-[220px]" />
                </div>
              ))
            : details.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
        </div>
      </div>

      {!loading && <EditButton onClick={onEditClick} className="md:w-fit w-full"/>}
    </Card>
  );
}
