// Price bands for every filter on the site (stock page, hero filter, sidebar).
//
// The inventory is budget used stock, so the scale starts at £1,500 — the API's
// /api/filters/ priceRanges start at "Under £10,000", which would put every car
// in a single band. These bands are the single source for price filtering.

/** Range bands — used by the Our Stock price filter. `max: Infinity` = no upper limit. */
export const PRICE_BANDS = [
  { label: "Under £1,500",      min: 0,     max: 1500     },
  { label: "£1,500 – £3,000",   min: 1500,  max: 3000     },
  { label: "£3,000 – £5,000",   min: 3000,  max: 5000     },
  { label: "£5,000 – £10,000",  min: 5000,  max: 10000    },
  { label: "£10,000 – £15,000", min: 10000, max: 15000    },
  { label: "£15,000 – £20,000", min: 15000, max: 20000    },
  { label: "£20,000 – £30,000", min: 20000, max: 30000    },
  { label: "£30,000+",          min: 30000, max: Infinity },
];

/** Cumulative "maximum price" options — used by the sidebar search dropdown. */
export const MAX_PRICE_OPTIONS = [
  { label: "Under £1,500",  max: 1500  },
  { label: "Under £3,000",  max: 3000  },
  { label: "Under £5,000",  max: 5000  },
  { label: "Under £10,000", max: 10000 },
  { label: "Under £15,000", max: 15000 },
  { label: "Under £20,000", max: 20000 },
  { label: "Under £30,000", max: 30000 },
  { label: "Under £50,000", max: 50000 },
  { label: "No Maximum",    max: null  },
];

/** Budget slider bounds — the hero filter. Slider at BUDGET_MAX = "Any budget". */
export const BUDGET_MIN  = 1500;
export const BUDGET_MAX  = 50000;
export const BUDGET_STEP = 500;
