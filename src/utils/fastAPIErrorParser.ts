import type { FastAPIError } from "@/types";

export function isFastAPIError(obj: any): obj is FastAPIError {
  return (
    obj &&
    typeof obj == "object" &&
    Array.isArray(obj.detail) &&
    obj.detail.every(
      (e: any) => Array.isArray(e.loc) && typeof e.msg === "string"
    )
  );
}

export const FastAPIErrorParser = {
  first(error: any): string {
    return error?.detail?.[0]?.msg || "An error occured making the request";
  },

  all(error: any): string[] {
    return Array.isArray(error?.details)
      ? error.details.map((e: any) => e.msg)
      : ["An error occured making the request"];
  },

  withFields(error: any): string[] {
    if (!Array.isArray(error?.detail))
      return ["An error occured making the request"];

    return error.detail.map((e: any) => {
      const field = e.loc?.slice(1).join(".") || "field";
      return `${field}: ${e.msg}`;
    });
  },
};

export async function handleFetchError(
  response: Response,
  defaultMessage: string = "An error occured making the request"
) {
  const data = await response.json();

  if (isFastAPIError(data)) return new Error(FastAPIErrorParser.first(data));
  else if (data.detail) return new Error(data.detail);
  else return new Error(defaultMessage);
}
