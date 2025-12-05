import { cn } from "@/lib/utils";

type FavouriteButtonProps = {
  state: "filled" | "outline";
  onClick?: () => void;
  className?: string;
};

export default function FavouriteButton({
  state,
  className,
  onClick,
}: FavouriteButtonProps) {
  return (
    <button onClick={onClick}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(`${state === "filled" ? "hidden" : "block"}`, className)}
      >
        <path
          d="M20.625 4.75C23.9239 4.75 26.5 7.31598 26.5 10.625C26.5 12.6525 25.5944 14.576 23.7959 16.7764C21.9864 18.9901 19.379 21.3603 16.1406 24.2969L16.1396 24.2979L15 25.335L13.8604 24.2979L13.8594 24.2969L11.5518 22.1943C9.36726 20.1851 7.56128 18.4368 6.2041 16.7764C4.40562 14.576 3.5 12.6525 3.5 10.625C3.5 7.31598 6.07609 4.75 9.375 4.75C11.2476 4.75 13.0617 5.62674 14.2412 7.00098L15 7.88574L15.7588 7.00098C16.9383 5.62674 18.7524 4.75 20.625 4.75Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>

      <svg
        width="20"
        height="20"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${state !== "filled" ? "hidden" : "block"}`}
      >
        <path
          d="M15 26.6875L13.1875 25.0375C6.75 19.2 2.5 15.3375 2.5 10.625C2.5 6.7625 5.525 3.75 9.375 3.75C11.55 3.75 13.6375 4.7625 15 6.35C16.3625 4.7625 18.45 3.75 20.625 3.75C24.475 3.75 27.5 6.7625 27.5 10.625C27.5 15.3375 23.25 19.2 16.8125 25.0375L15 26.6875Z"
          fill="#FCC803"
        />
      </svg>
    </button>
  );
}
