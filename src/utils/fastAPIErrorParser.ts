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
    return error?.detail?.[0]?.msg || "Something went wrong";
  },

  all(error: any): string[] {
    return Array.isArray(error?.details)
      ? error.details.map((e: any) => e.msg)
      : ["Something went wrong"];
  },

  withFields(error: any): string[] {
    if (!Array.isArray(error?.detail)) return ["Something went wrong"];

    return error.detail.map((e: any) => {
      const field = e.loc?.slice(1).join(".") || "field";
      return `${field}: ${e.msg}`;
    });
  },
};

export async function handleFetchError(
  response: Response,
  defaultMessage: string = "something went wrong"
) {
  if (!response.ok) {
    const data = await response.json();

    if (isFastAPIError(data)) throw new Error(FastAPIErrorParser.first(data));

    throw new Error(defaultMessage);
  }
}
