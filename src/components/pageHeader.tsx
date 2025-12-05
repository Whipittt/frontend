import UserAvatar from "./userAvatar";

interface PageHeaderprops {
  text: string;
  hideAvatar?: boolean;
}

export default function PageHeader({
  text,
  hideAvatar = false,
}: PageHeaderprops) {
  return (
    <div className="flex gap-4  justify-between items-center">
      <h1 className="font-serif text-3xl md:text-5xl">{text}</h1>

      {!hideAvatar && (
        <div className="hidden md:block">
          <UserAvatar />
        </div>
      )}
    </div>
  );
}
