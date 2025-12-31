export const DEFAULT_LIMIT = 10;

export function URLWithPagination(
  endpoint: string,
  skip?: number,
  limit?: number
) {
  return `${endpoint}${skip ? `?skip=${skip}` : ""}${skip && limit ? `&limit=${limit}` : limit ? `?limit=${limit}` : ""}`;
}
