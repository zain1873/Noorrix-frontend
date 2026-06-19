# Noorrix Motors — Filter & Car Data Backend Scenario

> **Purpose:** Yeh document batata hai ke poori site par filter kahan-kahan use ho rahe hain,
> car ka data kahan-kahan show hota hai, aur backend/admin ko kya-kya provide karna hai
> taake saara content dynamic ho jaye (abhi bohot kuch hardcoded hai).
>
> Audience: Backend developers + Admin panel developers.
> Frontend: Next.js (App Router), `src/app/**` routes + `src/views/**` view components.

---

## 1. Big Picture — Data Flow

```
                ┌─────────────────────────┐
                │       ADMIN PANEL        │
                │  (add / edit / delete    │
                │   cars + their details)  │
                └───────────┬─────────────┘
                            │  writes to
                            ▼
                ┌─────────────────────────┐
                │        DATABASE          │
                │     (cars collection)    │
                └───────────┬─────────────┘
                            │  served via
                            ▼
                ┌─────────────────────────┐
                │       BACKEND API        │
                │  GET /cars (list+filter) │
                │  GET /cars/:id (detail)  │
                │  GET /filters (options)  │
                └───────────┬─────────────┘
                            │  consumed by
        ┌───────────────────┼────────────────────┐
        ▼                   ▼                    ▼
  Our Stock page      Car Details page     Used Cars by Brand
  (filter + list)     (full detail)        (brand filtered list)
```

**Core rule:** Har car ka **ek hi source** hona chahiye (DB ka `cars` record).
Front-end ko har jagah wahi object milna chahiye — list me bhi, detail me bhi.

---

## 2. Jahan-jahan Filter / Car Data Use Ho Raha Hai

| # | Page / Component | Route | File | Kya karta hai |
|---|------------------|-------|------|----------------|
| 1 | **Our Stock** | `/stock` | [src/views/OurStock.jsx](../src/views/OurStock.jsx) | Poora filter system (8 filters) + car grid |
| 2 | **Car Details** | `/cars/:id` | [src/views/CarDetails/CarDetails.jsx](../src/views/CarDetails/CarDetails.jsx) | Ek car ki full detail + breadcrumb |
| 3 | **Used Cars by Brand** | `/used-cars/:brand` | [src/views/UsedCarsByBrand/UsedCarsByBrand.jsx](../src/views/UsedCarsByBrand/UsedCarsByBrand.jsx) | Brand ke hisaab se filtered list |
| 4 | **Similar Cars Slider** | (inside detail) | [src/views/CarDetails/SimilarCarsSlider.jsx](../src/views/CarDetails/SimilarCarsSlider.jsx) | "Similar cars" slider (abhi 100% hardcoded) |
| 5 | **Home Hero Filter** | `/` (home) | [src/components/HeroFilter/Filter.jsx](../src/components/HeroFilter/Filter.jsx) | Home banner ka quick filter → `/stock` par bhejna hai (section 4.5) |

Current data source (temporary, replace karna hai): [src/data/cars.js](../src/data/cars.js)
— ismein `stockData`, `makeModels`, `toBrandSlug()` hain. **Yeh file backend API se replace hogi.**

---

## 3. Car Data Model (Single Source of Truth)

Admin ko har car ke liye yeh fields lene chahiye. Front-end inhi naamon par depend karta hai
(`stockData` ke objects se liye gaye hain). Naye fields **(NEW)** se mark kiye hain — yeh
abhi front-end par hardcoded hain aur backend ko add karne chahiye.

### 3.1 List/Card fields (already used)

| Field | Type | Example | Used in |
|-------|------|---------|---------|
| `id` | string/number | `1` | URL `/cars/:id`, keys |
| `img` | URL | `https://…/car.jpg` | card image |
| `title` | string | `"BMW 3 Series"` | card + detail title |
| `subtitle` | string | `"2.0 320d M Sport Saloon Auto Euro 6 4dr"` | card + detail |
| `make` | string | `"BMW"` | filter, breadcrumb, brand page |
| `model` | string | `"3 Series"` | filter, breadcrumb |
| `bodyType` | string | `"Saloon"` | filter |
| `fuel` | string | `"Diesel"` | filter, card spec |
| `colour` | string | `"Black"` | filter, breadcrumb, overview |
| `year` | string | `"2019"` | filter (display), card spec, breadcrumb |
| `cc` | string | `"1,995 CC"` | card spec |
| `transmission` | string | `"Automatic"` | filter, card spec |
| `miles` | string | `"42,300 Miles"` | card spec (display) |
| `mileageNum` | number | `42300` | **mileage filter (range math)** |
| `mot` | string (date) | `"01/06/2026"` | card spec, overview |
| `monthly` | string | `"£245.00"` | card price (per month) |
| `total` | string | `"£14,495"` | card + detail price |
| `priceNum` | number | `14495` | **price filter (range math)** |

> **Important:** `priceNum` aur `mileageNum` numeric versions hain — filter ranges inhi par chalti hain
> (string `"£14,495"` par math nahi ho sakta). Backend dono bhejé: display string **aur** number.
> Behtar: backend sirf number bheje (`price: 14495`, `mileage: 42300`) aur front-end format kare.

### 3.2 Detail-page fields (abhi HARDCODED — backend add kare) **(NEW)**

Detail page par yeh sab abhi static likha hai aur `car` se connected nahi. Inko model me add karein:

| Field | Type | Abhi kahan hardcoded | Should come from |
|-------|------|----------------------|------------------|
| `images[]` | URL array (multiple) | `SLIDES` [CarDetails.jsx:31](../src/views/CarDetails/CarDetails.jsx#L31) | gallery slider (abhi `car.img` x6) |
| `mileage` / `year` / `engine` / `doors` / `seats` | per spec | `SPECS` [CarDetails.jsx:40](../src/views/CarDetails/CarDetails.jsx#L40) | Specs grid (abhi 2015 Honda fixed) |
| `features[]` | string array | `FEATURES` [CarDetails.jsx:53](../src/views/CarDetails/CarDetails.jsx#L53) | Features list |
| `description` | long text | generated in [CarDetails.jsx:218](../src/views/CarDetails/CarDetails.jsx#L218) | "Description" block (theek hai but ideally admin-written) |
| `summary` | text | `ACCORDION_CONTENT.summary` [CarDetails.jsx:268](../src/views/CarDetails/CarDetails.jsx#L268) | Vehicle Summary accordion |
| `performance` | text | `ACCORDION_CONTENT.performance` | Performance & Economy accordion |
| `interior` | text | `ACCORDION_CONTENT.interior` | Interior/Exterior accordion |
| `safety` | text | `ACCORDION_CONTENT.safety` | Safety/Other accordion |
| `doors` | number | hardcoded `5` | Specs |
| `seats` | number | hardcoded `5` | Specs |
| `engine` | string | hardcoded `"1.6L"` | Specs |
| `historyCheck` | string/bool | hardcoded `"All passed"` | Specs (HPI) |
| `videoUrl` | URL | hardcoded youtube link [CarDetails.jsx:472](../src/views/CarDetails/CarDetails.jsx#L472) | "View video walkthrough" |
| `location` | object | hardcoded Bedford address [CarDetails.jsx:306](../src/views/CarDetails/CarDetails.jsx#L306) | Vehicle location (per-car ya global setting) |

> **Suggestion:** `summary/performance/interior/safety` ko ek `details` object me group kar lein:
> `details: { summary, performance, interior, safety }`.

### 3.3 Example JSON (recommended API shape)

```json
{
  "id": 2,
  "title": "BMW 3 Series",
  "subtitle": "2.0 320d M Sport Saloon Auto Euro 6 4dr",
  "make": "BMW",
  "model": "3 Series",
  "bodyType": "Saloon",
  "fuel": "Diesel",
  "transmission": "Automatic",
  "colour": "Black",
  "year": 2019,
  "engineCc": 1995,
  "engine": "2.0L",
  "doors": 5,
  "seats": 5,
  "mileage": 42300,
  "price": 14495,
  "monthly": 245.00,
  "motDate": "2026-06-01",
  "historyCheck": "All passed",
  "images": [
    "https://cdn.noorrix.com/cars/2/1.jpg",
    "https://cdn.noorrix.com/cars/2/2.jpg"
  ],
  "features": ["Bluetooth", "Reverse camera", "Cruise control"],
  "description": "Full marketing description…",
  "details": {
    "summary": "…",
    "performance": "…",
    "interior": "…",
    "safety": "…"
  },
  "videoUrl": "https://youtube.com/…",
  "status": "available"
}
```

---

## 4. Filter Scenario — Our Stock (`/stock`)

File: [src/views/OurStock.jsx](../src/views/OurStock.jsx)

### 4.1 8 Filters aur unka field mapping

| Filter (UI) | Car field | Type | Notes |
|-------------|-----------|------|-------|
| Make | `make` | exact match | Make select karte hi Model reset hota hai |
| Model | `model` | exact match | Sirf selected make ke models dikhain (dependent) |
| Body Type | `bodyType` | exact match | SUV, Hatchback, Saloon, Estate, Coupe, Convertible, MPV, Van |
| Fuel Type | `fuel` | exact match | Petrol, Diesel, Hybrid, Electric, Mild Hybrid |
| Transmission | `transmission` | exact match | Automatic, Manual, CVT, Semi-Automatic |
| Colour | `colour` | exact match | Black, White, Silver, Grey, Blue, Red, Green, Orange |
| Price | `priceNum` | **range** | Under 10k / 10–15k / 15–20k / 20–30k / 30k+ |
| Mileage | `mileageNum` | **range** | Under 20k / 20–50k / 50–100k / 100k+ |

Logic abhi client-side hai: [OurStock.jsx:69-82](../src/views/OurStock.jsx#L69-L82).

### 4.2 Make → Model dependency

- Models make par depend karte hain ([OurStock.jsx:135](../src/views/OurStock.jsx#L135) → `makeModels[make]`).
- **Backend ko chahiye:** ya to `GET /filters` me `makeModels` map de,
  ya `GET /models?make=BMW` endpoint de.

### 4.3 Per-option counts (zaroori!)

Har filter option ke aage ek count `(N)` dikhta hai — yani "is option ko lagao to kitni car bachegi"
([OurStock.jsx:195-222](../src/views/OurStock.jsx#L195-L222)). Yeh count baaki active filters ko
consider karte hue calculate hota hai.

- **Agar filtering backend par le jate hain:** backend ko **faceted counts** return karne honge
  (har filter value ke saath uska matching count, current filters apply karke).
- **Agar client-side rakhte hain:** backend bas poori list de, counts front-end khud nikal lega
  (chhoti inventory ke liye yeh theek hai).

### 4.4 Recommended API (agar server-side filtering)

```
GET /cars?make=BMW&model=3%20Series&bodyType=Saloon
        &fuel=Diesel&transmission=Automatic&colour=Black
        &priceMin=10000&priceMax=15000
        &mileageMin=20000&mileageMax=50000
        &page=1&limit=24

Response:
{
  "items": [ { …car… } ],
  "total": 37,
  "facets": {
    "make":   [ { "value": "BMW", "count": 12 }, … ],
    "fuel":   [ { "value": "Diesel", "count": 20 }, … ],
    "bodyType": [ … ], "transmission": [ … ], "colour": [ … ],
    "price":  [ { "label": "£10,000 – £15,000", "count": 8 }, … ],
    "mileage":[ … ]
  }
}
```

> **Faisla:** Inventory chhoti hai (~8–50 cars) to **client-side filtering** kaafi hai —
> bas `GET /cars` se poori list lao, baaki logic front-end par jaisa abhi hai waisa chalega.
> Inventory bari ho (100s+) to upar wala server-side approach use karein.

### 4.5 Home Hero Filter → Stock page (RECOMMENDED FLOW) ✅

File: [src/components/HeroFilter/Filter.jsx](../src/components/HeroFilter/Filter.jsx)

**Scenario:** User home banner ke hero-filter se Make / Model / Transmission / Budget choose kare,
"Search Cars" dabaye, aur **seedha `/stock` page khul jaye jahan woh filters pehle se applied hon.**
Yeh standard industry pattern hai (AutoTrader, Cazoo waghaira) — ✅ acha scenario.

**Implementation (2 parts):**

1. HeroFilter selected values ko URL query params bana kar `/stock` par bheje:
   ```js
   // handleSearch() — abhi sirf console.log karta hai (Filter.jsx:70)
   const params = new URLSearchParams();
   if (make)         params.set("make", make);
   if (model)        params.set("model", model);
   if (transmission) params.set("transmission", transmission);
   if (budget)       params.set("priceMax", budget);
   router.push(`/stock?${params.toString()}`);
   ```

2. OurStock `useSearchParams()` se yeh params parh kar initial filter state set kare
   (aur woh filters list par auto-apply ho jayein).

**⚠️ 3 cheezein theek karni hain pehle (consistency):**

| Issue | Detail | Fix |
|-------|--------|-----|
| Make/Model list 3 jagah alag | HeroFilter (40+ brands), OurStock (5), `cars.js` (actual) — mismatch. User aisi car choose kar lega jo stock me hai hi nahi → khaali result. | Teeno **ek hi backend `GET /filters` source** se aayein. |
| Currency mismatch | HeroFilter `$` ([Filter.jsx:123](../src/components/HeroFilter/Filter.jsx#L123)), OurStock `£`. | Sab jagah **£** karo. |
| Budget slider vs range | HeroFilter ek `priceMax` number deta hai; OurStock fixed ranges (Under £10k…) use karta hai. | `priceMax` ko OurStock ke range logic me map karo (ya OurStock me bhi numeric max support karo). |

> **Backend impact:** Agar make/model dynamic `GET /filters` se aaye, to yeh teeno mismatch
> apne aap khatam ho jaye — hero-filter, stock-filter, aur actual stock sab same list par honge.

---

## 5. Filter Scenario — Used Cars by Brand (`/used-cars/:brand`)

File: [src/views/UsedCarsByBrand/UsedCarsByBrand.jsx](../src/views/UsedCarsByBrand/UsedCarsByBrand.jsx)

- URL me brand **slug** aata hai (`bmw`, `mercedes-benz`).
- Front-end `toBrandSlug(make)` se match karta hai ([UsedCarsByBrand.jsx:56](../src/views/UsedCarsByBrand/UsedCarsByBrand.jsx#L56)).
- Filter: `stockData.filter(car => car.make === matchedMake)` ([UsedCarsByBrand.jsx:62](../src/views/UsedCarsByBrand/UsedCarsByBrand.jsx#L62)).

**Backend ko chahiye:**
```
GET /cars?make=BMW        (ya slug se: GET /cars?brand=bmw)
```
- Brand slug ↔ make name ka mapping consistent hona chahiye (e.g. `mercedes-benz` → `Mercedes-Benz`).
- Brand logo abhi front-end par static hai ([UsedCarsByBrand.jsx:32](../src/views/UsedCarsByBrand/UsedCarsByBrand.jsx#L32)).
  Chahein to `logoUrl` make ke saath backend se aa sakta hai.

---

## 6. Car Details (`/cars/:id`)

File: [src/views/CarDetails/CarDetails.jsx](../src/views/CarDetails/CarDetails.jsx)

- Car id URL se: `useParams()` ([CarDetails.jsx:505](../src/views/CarDetails/CarDetails.jsx#L505)).
- Abhi: `stockData.find(c => c.id === id)` ([CarDetails.jsx:507](../src/views/CarDetails/CarDetails.jsx#L507)).
- **Backend:** `GET /cars/:id` → poora car object (section 3.2 ke saare detail fields ke saath).

**Breadcrumb** (dynamic, sahi):
`Home › Used Cars › {make} › {model} · {year} · {colour}`
([CarDetails.jsx:514-525](../src/views/CarDetails/CarDetails.jsx#L514-L525)).

**Jo abhi `car` se NAHI judta (FIX karna hai):**
- `ImageSlider` — multiple images chahiye (`car.images[]`), abhi `car.img` x6.
- `SPECS` grid — abhi fixed 2015 Honda values.
- `FEATURES` — abhi fixed list.
- `VehicleDescriptionSection` — `car` prop leta hi nahi; poora Honda Civic text hardcoded.
- `SimilarCarsSlider` — neeche section 7 dekho.

---

## 7. Similar Cars Slider (abhi 100% Hardcoded)

File: [src/views/CarDetails/SimilarCarsSlider.jsx](../src/views/CarDetails/SimilarCarsSlider.jsx)

- `SIMILAR_CARS` array poori tarah static hai ([SimilarCarsSlider.jsx:10](../src/views/CarDetails/SimilarCarsSlider.jsx#L10)).
- "View this vehicle" button kahin link nahi karta.

**Backend ko chahiye — "similar" ka rule define karna:**
```
GET /cars/:id/similar?limit=6
```
Similar ka matlab usually: **same bodyType ya same make ya price ± range**, current car ko chhod kar.
Result me `id` zaroor ho taake button `/cars/:id` par le ja sake.

---

## 8. Filter Options — Static vs Dynamic

Abhi yeh sab front-end par hardcoded arrays hain ([OurStock.jsx:17-36](../src/views/OurStock.jsx#L17-L36)):

`makes`, `makeModels`, `bodyTypes`, `fuelTypes`, `transmissions`, `colours`,
`priceOptions`, `mileageOptions`.

**Do options:**

1. **Static rakho (simple):** Yeh standard car attributes hain, kam badalte hain.
   Backend ko sirf cars ka data dena hai. Theek hai chhoti site ke liye.

2. **Dynamic karo (behtar UX):** `GET /filters` ek endpoint banao jo current inventory se
   distinct values nikaal kar de — taake jo make/colour stock me hai bas wahi dikhe:
   ```json
   {
     "makes": ["Audi","BMW","Mercedes-Benz","Nissan","Toyota"],
     "makeModels": { "BMW": ["3 Series","X5"], … },
     "bodyTypes": ["SUV","Saloon", …],
     "fuelTypes": [ … ], "transmissions": [ … ], "colours": [ … ],
     "priceRanges": [ {"label":"Under £10,000","min":0,"max":10000}, … ],
     "mileageRanges": [ … ]
   }
   ```

> **Recommendation:** Make/Model ko **dynamic** karo (kyunke admin naye brand add karega to
> filter me auto aa jaye). BodyType/Fuel/Transmission/Colour/Price/Mileage ranges ko
> **static** rakhna theek hai.

---

## 9. Backend ko Banane wale Endpoints (Summary)

| Endpoint | Use | Priority |
|----------|-----|----------|
| `GET /cars` | Our Stock list (+ optional filter query params) | 🔴 Must |
| `GET /cars/:id` | Car detail page | 🔴 Must |
| `GET /cars?make=X` (ya `?brand=slug`) | Used Cars by Brand | 🔴 Must |
| `GET /cars/:id/similar` | Similar cars slider | 🟡 Should |
| `GET /filters` | Dynamic filter options + (optional) facet counts | 🟢 Nice |
| Admin CRUD: `POST/PUT/DELETE /cars` | Admin panel se cars manage | 🔴 Must |

---

## 10. Front-end Migration Checklist (jab API ready ho)

- [ ] [src/data/cars.js](../src/data/cars.js) ko API calls se replace karo (`stockData` → fetch).
- [ ] OurStock: client-side filter rakho ya server query params bhejo (section 4.4).
- [ ] CarDetails: `stockData.find` → `GET /cars/:id`.
- [ ] CarDetails: `SPECS`, `FEATURES`, `SLIDES`, `ACCORDION_CONTENT` ko `car` fields se wire karo.
- [ ] `VehicleDescriptionSection` ko `car` prop pass karo (abhi nahi leta).
- [ ] SimilarCarsSlider ko `GET /cars/:id/similar` se feed karo + button `/cars/:id` par link.
- [ ] UsedCarsByBrand: brand slug ↔ make mapping backend se confirm karo.
- [ ] Numeric `price`/`mileage` backend se lo, display formatting front-end par karo.
- [x] HeroFilter: `handleSearch` ko `router.push('/stock?...')` se wire kiya (done).
- [ ] HeroFilter + OurStock + cars.js ki make/model list ek hi source par lao (`GET /filters`) — _backend pe pending_.
- [x] HeroFilter currency `$` → `£` kiya; budget ab `priceMax` param bhejta hai (done).
- [x] OurStock: `useSearchParams()` se incoming filters parh kar initial state set kiya; `/stock` page `<Suspense>` me wrap kiya (done).

---

### Note: ID consistency
Reserve/checkout flow `car.id` use karta hai (`/checkout?amount=200&car=${car.id}`,
[OurStock.jsx:398](../src/views/OurStock.jsx#L398)). Isliye backend ka `id` stable aur unique
hona zaroori hai — list, detail, similar, checkout sab me same id.
