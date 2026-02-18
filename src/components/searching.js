import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
  // @todo: #5.1 [DONE]  — настроить компаратор
  const compare = createComparison(
    ["skipEmptyTargetValues"],
    [
      rules.searchMultipleFields(
        searchField,
        ["date", "customer", "seller"],
        false,
      ),
    ],
  );

  return (data, state, action) => {
    // @todo: #5.2 [DONE] — применить компаратор
    return data.filter((item) => compare(item, state));
  };
}
