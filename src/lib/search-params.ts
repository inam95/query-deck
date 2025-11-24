import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  createLoader,
  createSearchParamsCache,
} from "nuqs/server";

// Define parsers for all search parameters
export const searchParamsParsers = {
  // Array of type strings (e.g., ["Array", "String"])
  types: parseAsArrayOf(parseAsString).withDefault([]),
  // Array of difficulty numbers (1-3)
  difficulties: parseAsArrayOf(parseAsInteger).withDefault([]),
  // Sort field: difficulty, title, or votes
  sort: parseAsStringLiteral(["difficulty", "title", "votes"]).withDefault(
    "votes"
  ),
  // Sort order: asc or desc
  order: parseAsStringLiteral(["asc", "desc"]).withDefault("desc"),
  // Current page number
  page: parseAsInteger.withDefault(1),
  // Search query string
  q: parseAsString.withDefault(""),
};

// Create loader function for server-side parsing
export const loadSearchParams = createLoader(searchParamsParsers);

// Create search params cache for server components
export const searchParamsCache = createSearchParamsCache(searchParamsParsers);

// Type helper for parsed search params
export type ParsedSearchParams = Awaited<ReturnType<typeof loadSearchParams>>;
