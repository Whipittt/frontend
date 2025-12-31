import { RotateCw } from "lucide-react";
import { Button } from "./ui/button";
import { RefreshSpinner } from "./ui/spinner";

export default function RefreshButton({
  isFetching,
  onClick,
}: {
  isFetching: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      onClick={() => onClick()}
      disabled={isFetching}
      title="Refresh"
    >
      {isFetching ? (
        <>
          <RefreshSpinner />
          <span className="md:inline hidden">Refreshing...</span>
        </>
      ) : (
        <>
          <RotateCw /> <span className="md:inline hidden">Refresh</span>
        </>
      )}
    </Button>
  );
}
