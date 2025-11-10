# Changelog

All notable changes to this project.

## Unreleased — 2025-11-10
- Add averages UI to Home screen (Average price per course + overall).
- Move averages off Menu and onto Home.
- Menu: add quantity badge, Add / Remove one / Remove all controls.
- Menu: keep order as an array of item IDs (duplicates represent quantity).
- Order screen:
  - Show ordered items, quantities and totals.
  - Add "Reset Order" button to clear order and route param.
  - Replace useLocalSearchParams with useSearchParams for reliability.
  - Confirm/received UI shows order reference number.
- Summary / SummaryDetails:
  - Improved summary view with confirmation message and order reference.
  - Added summary-details.tsx as an enhanced summary (does not modify original Summary.tsx).
- Web:
  - Add root redirect (app/index.tsx) so web root opens Menu directly.
  - Use R currency formatting (R0.00).
- Misc:
  - Avoid top-level expo-clipboard import; use dynamic import fallback to prevent bundler errors.
  - File renames to lowercase routes where necessary to avoid case-sensitivity issues.
  - Minor UI and style improvements.

## v0.1.0 — initial
- Project scaffold and basic Menu, Order, Summary