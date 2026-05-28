export function toBrandSlug(make) {
  return make
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const makeModels = {
  Audi: ["A1", "A3", "A4", "A5", "A6", "A7", "Q3", "Q5", "Q7", "TT", "e-tron GT"],
  BMW: ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "X1", "X3", "X5", "M3", "M4", "iX", "i4"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "G-Class", "AMG GT"],
  Nissan: ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf"],
  Toyota: ["Aygo", "Yaris", "Corolla", "Prius", "C-HR", "Camry", "RAV4", "Land Cruiser", "GR86", "Supra"],
  // Honda: ["Jazz", "Civic", "HR-V", "CR-V", "Accord", "ZR-V"],
  // Ford: ["Fiesta", "Focus", "Puma", "Kuga", "Mustang", "Mustang Mach-E", "Ranger", "Transit"],
  // Volkswagen: ["Polo", "Golf", "Golf GTI", "Golf R", "Passat", "Tiguan", "T-Roc", "ID.4"],
  // Hyundai: ["i10", "i20", "i30", "IONIQ 5", "Kona", "Tucson", "Santa Fe"],
  // Kia: ["Picanto", "Ceed", "Sportage", "Sorento", "EV6"],
  // "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Sport", "Range Rover Evoque"],
  // Jaguar: ["XE", "XF", "F-Type", "E-Pace", "F-Pace"],
  // Vauxhall: ["Corsa", "Astra", "Mokka", "Grandland"],
  // Porsche: ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
  // Tesla: ["Model 3", "Model Y", "Model S", "Model X"],
  // Volvo: ["XC40", "XC60", "XC90", "V60", "S60"],
  // Mini: ["Hatch", "Convertible", "Clubman", "Countryman"],
  // Mazda: ["2", "3", "6", "MX-5", "CX-30", "CX-5"],
  // Škoda: ["Fabia", "Octavia", "Superb", "Kodiaq", "Karoq"],
  // SEAT: ["Ibiza", "Leon", "Arona", "Ateca"],
  // Peugeot: ["208", "308", "2008", "3008", "5008"],
  // Renault: ["Clio", "Megane", "Captur", "Kadjar"],
  // Jeep: ["Renegade", "Compass", "Grand Cherokee", "Wrangler"],
  // Subaru: ["Impreza", "Outback", "Forester", "XV"],
  // Suzuki: ["Swift", "Ignis", "S-Cross", "Vitara", "Jimny"],
  // Lexus: ["IS", "ES", "NX", "RX", "UX"],
  // Alfa: ["Giulia", "Stelvio", "Tonale"],
  // Fiat: ["500", "Panda", "Tipo", "500X"],
};

export const stockData = [
  { id: 1, img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80", title: "Land Rover Discovery Sport", subtitle: "2.0 SKYACTIV-G Sport Nav Euro 6 (s/s) 5dr", make: "Land Rover", model: "Discovery Sport", bodyType: "SUV",       fuel: "Petrol", colour: "Silver", year: "2017", cc: "1,998 CC", transmission: "Manual",    miles: "56,600 Miles", mileageNum: 56600, mot: "07/04/2027", monthly: "£196.95", total: "£9,795",  priceNum: 9795  },
  { id: 2, img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80", title: "BMW 3 Series",             subtitle: "2.0 320d M Sport Saloon Auto Euro 6 4dr",       make: "BMW",        model: "3 Series",        bodyType: "Saloon",    fuel: "Diesel", colour: "Black",  year: "2019", cc: "1,995 CC", transmission: "Automatic", miles: "42,300 Miles", mileageNum: 42300, mot: "01/06/2026", monthly: "£245.00", total: "£14,495", priceNum: 14495 },
  { id: 3, img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80", title: "Audi A4 Avant",            subtitle: "2.0 TDI S Line Estate S Tronic Euro 6 5dr",     make: "Audi",       model: "A4",              bodyType: "Estate",    fuel: "Diesel", colour: "White",  year: "2020", cc: "1,968 CC", transmission: "Automatic", miles: "31,100 Miles", mileageNum: 31100, mot: "15/09/2027", monthly: "£289.00", total: "£17,950", priceNum: 17950 },
  { id: 4, img: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80", title: "Mercedes-Benz C-Class",    subtitle: "1.5 C200 AMG Line Edition Auto Euro 6 4dr",     make: "Mercedes-Benz", model: "C-Class",       bodyType: "Saloon",    fuel: "Petrol", colour: "Blue",   year: "2021", cc: "1,496 CC", transmission: "Automatic", miles: "22,800 Miles", mileageNum: 22800, mot: "20/03/2028", monthly: "£319.00", total: "£21,495", priceNum: 21495 },
  { id: 5, img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80", title: "Volkswagen Golf GTI",      subtitle: "2.0 TSI 245 GTI DSG Euro 6 5dr Hatchback",      make: "Volkswagen", model: "Golf GTI",        bodyType: "Hatchback", fuel: "Petrol", colour: "Red",    year: "2022", cc: "1,984 CC", transmission: "Automatic", miles: "18,500 Miles", mileageNum: 18500, mot: "11/08/2028", monthly: "£275.00", total: "£18,750", priceNum: 18750 },
  { id: 6, img: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80", title: "Toyota RAV4",              subtitle: "2.5 VVTL-i Hybrid Excel CVT Euro 6 5dr SUV",    make: "Toyota",     model: "RAV4",            bodyType: "SUV",       fuel: "Hybrid", colour: "Grey",   year: "2021", cc: "2,487 CC", transmission: "CVT",       miles: "28,400 Miles", mileageNum: 28400, mot: "05/11/2027", monthly: "£349.00", total: "£24,900", priceNum: 24900 },
  { id: 7, img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80", title: "Ford Focus ST-Line",       subtitle: "1.5 EcoBoost 150 ST-Line X Edition 5dr",        make: "Ford",       model: "Focus",           bodyType: "Hatchback", fuel: "Petrol", colour: "Blue",   year: "2020", cc: "1,497 CC", transmission: "Manual",    miles: "39,200 Miles", mileageNum: 39200, mot: "22/07/2026", monthly: "£179.00", total: "£8,995",  priceNum: 8995  },
  { id: 8, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80", title: "Honda Civic",              subtitle: "1.5 VTEC Turbo Sport Plus 5dr CVT Hatchback",   make: "Honda",      model: "Civic",           bodyType: "Hatchback", fuel: "Petrol", colour: "Silver", year: "2022", cc: "1,498 CC", transmission: "CVT",       miles: "14,700 Miles", mileageNum: 14700, mot: "30/01/2029", monthly: "£219.00", total: "£12,500", priceNum: 12500 },
];
