import UserAvatar from "./userAvatar";

interface PageHeaderprops {
  text: string;
  includeAvatar?: boolean;
}

export default function PageHeader({
  text,
  includeAvatar = true,
}: PageHeaderprops) {
  return (
    <div className="flex gap-4  justify-between items-center">
      <h1 className="font-serif text-3xl md:text-5xl">{text}</h1>

      {includeAvatar && (
        <div className="hidden md:block">
          <UserAvatar />
        </div>
      )}
    </div>
  );
}
