/* ═══════════════════════════════════════════════
   DOLLY TRADE B2B — Mock Marketplace Data
   Import/Export expertise 30 years in the making
   ═══════════════════════════════════════════════ */

export type Sector = {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgGradient: string;
  description: string;
  subcategories: string[];
  stats: { suppliers: number; products: number; campaigns: number };
  featured: boolean;
};

export type Supplier = {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  city: string;
  sectorIds: string[];
  verified: boolean;
  certifications: string[];
  rating: number;
  reviewCount: number;
  description: string;
  logo: string;
  logoColor: string;
  established: number;
  minOrder: string;
  currency: string;
  paymentTerms: string[];
  activeCampaigns: number;
  totalRevenue: number;
};

export type PriceTier = {
  minQty: number;
  maxQty: number | null;
  pricePerUnit: number;
  currency: string;
  discount: number;
  label: string;
};

export type Campaign = {
  id: string;
  title: string;
  supplierId: string;
  sectorId: string;
  productIds: string[];
  description: string;
  image: string;
  imageColor: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "closed" | "completed";
  currentQty: number;
  targetQty: number;
  participantCount: number;
  priceTiers: PriceTier[];
  unit: string;
  moq: number;
  origin: string;
  certifications: string[];
  whatsappEnabled: boolean;
  deliveryZones: string[];
  tags: string[];
};

export type Product = {
  id: string;
  name: string;
  supplierId: string;
  sectorId: string;
  subcategory: string;
  description: string;
  image: string;
  imageColor: string;
  basePrice: number;
  currency: string;
  unit: string;
  moq: number;
  origin: string;
  certifications: string[];
  inStock: boolean;
  featured: boolean;
  tags: string[];
};

export type Client = {
  id: string;
  companyName: string;
  country: string;
  flag: string;
  type: string;
  sectorIds: string[];
  verified: boolean;
};

/* ─── SECTORS ──────────────────────────────────── */
export const sectors: Sector[] = [
  {
    id: "health-cosmetics",
    name: "Santé & Cosmétologie",
    icon: "🏥",
    color: "#2D6A8F",
    bgGradient: "linear-gradient(135deg, #1B4F72 0%, #2D6A8F 50%, #1A8C7A 100%)",
    description: "Équipements médicaux certifiés, produits pharmaceutiques, cosmétiques professionnels pour laboratoires, pharmacies et hôpitaux. Standards CE/FDA/OMS.",
    subcategories: ["Équipements médicaux", "Produits pharmaceutiques", "Cosmétiques Pro", "Consommables labo", "Matériel chirurgical", "Diagnostics"],
    stats: { suppliers: 234, products: 1847, campaigns: 12 },
    featured: true,
  },
  {
    id: "mechanical-parts",
    name: "Pièces Mécaniques",
    icon: "⚙️",
    color: "#7C5C38",
    bgGradient: "linear-gradient(135deg, #5C3D1E 0%, #8B6340 50%, #A0722A 100%)",
    description: "Pièces détachées industrielles, composants automobiles, équipements de production. Fournisseurs homologués pour tous secteurs industriels.",
    subcategories: ["Pièces automobiles", "Composants industriels", "Hydraulique & Pneumatique", "Électromécanique", "Roulements & Transmission", "Outillage Pro"],
    stats: { suppliers: 189, products: 3421, campaigns: 8 },
    featured: true,
  },
  {
    id: "agri-food",
    name: "Agro-Alimentaire",
    icon: "🌾",
    color: "#1B5E3E",
    bgGradient: "linear-gradient(135deg, #0D3B22 0%, #1B5E3E 50%, #2E7D32 100%)",
    description: "Intrants agricoles, équipements de transformation, produits alimentaires B2B. Certifications biologiques et halal disponibles.",
    subcategories: ["Intrants agricoles", "Équipements de transformation", "Produits en vrac", "Emballages alimentaires", "Semences & Plants", "Fertilisants"],
    stats: { suppliers: 312, products: 2156, campaigns: 19 },
    featured: true,
  },
  {
    id: "construction",
    name: "Construction & BTP",
    icon: "🏗️",
    color: "#8B5E3C",
    bgGradient: "linear-gradient(135deg, #5D3A1A 0%, #8B5E3C 50%, #C0834F 100%)",
    description: "Matériaux de construction, équipements BTP, outillage professionnel. Solutions adaptées aux chantiers africains avec logistique optimisée.",
    subcategories: ["Matériaux de construction", "Équipements BTP", "Outillage industriel", "Électricité & Plomberie", "Ciment & Acier", "Bois & Menuiserie"],
    stats: { suppliers: 156, products: 987, campaigns: 6 },
    featured: false,
  },
  {
    id: "electronics-tech",
    name: "Électronique & Tech",
    icon: "💡",
    color: "#1E4D8C",
    bgGradient: "linear-gradient(135deg, #0D2B5C 0%, #1E4D8C 50%, #2563EB 100%)",
    description: "Composants électroniques, équipements IT, solutions télécoms et énergie solaire pour entreprises africaines.",
    subcategories: ["Composants électroniques", "Équipements IT & Servers", "Télécoms & Réseaux", "Énergie solaire", "Automatisation", "Drones & IoT"],
    stats: { suppliers: 98, products: 654, campaigns: 4 },
    featured: false,
  },
  {
    id: "textiles",
    name: "Textiles & Vêtements Pro",
    icon: "🧵",
    color: "#8B1A4A",
    bgGradient: "linear-gradient(135deg, #5C0F30 0%, #8B1A4A 50%, #C41E3A 100%)",
    description: "Tissus en gros, vêtements de travail, uniformes professionnels et équipements de protection individuelle (EPI) certifiés.",
    subcategories: ["Tissus en gros", "Vêtements de travail", "Uniformes professionnels", "EPI & Sécurité", "Coton brut", "Synthétiques industriels"],
    stats: { suppliers: 201, products: 1432, campaigns: 11 },
    featured: true,
  },
];

/* ─── SUPPLIERS ─────────────────────────────────── */
export const suppliers: Supplier[] = [
  {
    id: "sup-001",
    name: "MedEquip Global",
    country: "Allemagne",
    countryCode: "DE",
    flag: "🇩🇪",
    city: "Francfort",
    sectorIds: ["health-cosmetics"],
    verified: true,
    certifications: ["CE", "ISO 13485", "FDA", "OMS PQ"],
    rating: 4.8,
    reviewCount: 312,
    description: "Leader en équipements médicaux et diagnostics pour l'Afrique sub-saharienne depuis 1998. Partenaire agréé de l'OMS.",
    logo: "ME",
    logoColor: "#2D6A8F",
    established: 1998,
    minOrder: "5 000 €",
    currency: "EUR",
    paymentTerms: ["30% avance", "70% avant expédition", "LC disponible"],
    activeCampaigns: 3,
    totalRevenue: 12_500_000,
  },
  {
    id: "sup-002",
    name: "BeautyLab International",
    country: "France",
    countryCode: "FR",
    flag: "🇫🇷",
    city: "Paris",
    sectorIds: ["health-cosmetics"],
    verified: true,
    certifications: ["ECOCERT", "ISO 22716", "COSMOS Organic"],
    rating: 4.9,
    reviewCount: 189,
    description: "Cosmétiques professionnels biologiques et conventionnels pour pharmacies, cliniques esthétiques et spas. Formulations sur mesure.",
    logo: "BL",
    logoColor: "#8B1A4A",
    established: 2005,
    minOrder: "2 000 €",
    currency: "EUR",
    paymentTerms: ["50% avance", "50% à la livraison", "Net 30 clients agréés"],
    activeCampaigns: 2,
    totalRevenue: 5_200_000,
  },
  {
    id: "sup-003",
    name: "AutoParts Asia Hub",
    country: "Chine",
    countryCode: "CN",
    flag: "🇨🇳",
    city: "Guangzhou",
    sectorIds: ["mechanical-parts"],
    verified: true,
    certifications: ["ISO 9001", "IATF 16949", "CE", "RoHS"],
    rating: 4.5,
    reviewCount: 678,
    description: "Fabricant et exportateur de pièces automobiles et industrielles. +15 000 références pour véhicules japonais, européens et américains.",
    logo: "AP",
    logoColor: "#7C5C38",
    established: 2001,
    minOrder: "3 000 USD",
    currency: "USD",
    paymentTerms: ["T/T 30% dépôt", "70% avant BL", "LC at sight"],
    activeCampaigns: 5,
    totalRevenue: 28_000_000,
  },
  {
    id: "sup-004",
    name: "AgriKing Export",
    country: "Brésil",
    countryCode: "BR",
    flag: "🇧🇷",
    city: "São Paulo",
    sectorIds: ["agri-food"],
    verified: true,
    certifications: ["FSSC 22000", "ISO 22000", "Halal IFANCA", "Organique"],
    rating: 4.7,
    reviewCount: 445,
    description: "Exportateur de produits agricoles et alimentaires de première qualité. Spécialité : grains, oléagineux, sucre et café pour le marché africain.",
    logo: "AK",
    logoColor: "#1B5E3E",
    established: 1995,
    minOrder: "1 FCL (20 pieds)",
    currency: "USD",
    paymentTerms: ["LC irrévocable", "CAD", "Net 45 partenaires agréés"],
    activeCampaigns: 4,
    totalRevenue: 45_000_000,
  },
  {
    id: "sup-005",
    name: "SteelBuild Morocco",
    country: "Maroc",
    countryCode: "MA",
    flag: "🇲🇦",
    city: "Casablanca",
    sectorIds: ["construction"],
    verified: true,
    certifications: ["ISO 9001", "NM (Norme Marocaine)", "CE"],
    rating: 4.6,
    reviewCount: 223,
    description: "Acier, ciment et matériaux de construction pour toute l'Afrique. Livraison CIF vers 32 ports africains. Leader régional.",
    logo: "SB",
    logoColor: "#8B5E3C",
    established: 2003,
    minOrder: "10 000 USD",
    currency: "USD",
    paymentTerms: ["30% avance", "70% LC", "Virement SWIFT"],
    activeCampaigns: 2,
    totalRevenue: 22_000_000,
  },
  {
    id: "sup-006",
    name: "TechConnect India",
    country: "Inde",
    countryCode: "IN",
    flag: "🇮🇳",
    city: "Bangalore",
    sectorIds: ["electronics-tech"],
    verified: true,
    certifications: ["ISO 9001", "CE", "BIS", "FCC"],
    rating: 4.4,
    reviewCount: 156,
    description: "Composants électroniques, panneaux solaires et équipements IT pour marchés émergents. Solutions plug-and-play pour Afrique.",
    logo: "TC",
    logoColor: "#1E4D8C",
    established: 2010,
    minOrder: "2 500 USD",
    currency: "USD",
    paymentTerms: ["50% T/T advance", "50% against BL copy"],
    activeCampaigns: 3,
    totalRevenue: 8_500_000,
  },
  {
    id: "sup-007",
    name: "TextilPro Turkey",
    country: "Turquie",
    countryCode: "TR",
    flag: "🇹🇷",
    city: "Istanbul",
    sectorIds: ["textiles"],
    verified: true,
    certifications: ["OEKO-TEX Standard 100", "ISO 9001", "GOTS"],
    rating: 4.7,
    reviewCount: 534,
    description: "Textiles professionnels, uniformes et EPI pour entreprises. Capacité de production : 50 000 pièces/mois. Personnalisation disponible.",
    logo: "TP",
    logoColor: "#8B1A4A",
    established: 1999,
    minOrder: "500 pièces",
    currency: "EUR",
    paymentTerms: ["30% avance", "70% avant expédition"],
    activeCampaigns: 4,
    totalRevenue: 18_000_000,
  },
  {
    id: "sup-008",
    name: "PharmaSource Netherlands",
    country: "Pays-Bas",
    countryCode: "NL",
    flag: "🇳🇱",
    city: "Amsterdam",
    sectorIds: ["health-cosmetics"],
    verified: true,
    certifications: ["GMP EU", "ISO 13485", "FDA approved facility"],
    rating: 4.9,
    reviewCount: 98,
    description: "Médicaments génériques, vaccins et dispositifs médicaux. Partenaire de 47 systèmes de santé africains. Cold chain certifiée.",
    logo: "PS",
    logoColor: "#1B4F72",
    established: 1987,
    minOrder: "10 000 €",
    currency: "EUR",
    paymentTerms: ["LC irrévocable", "DPO 60 jours institutions publiques"],
    activeCampaigns: 2,
    totalRevenue: 67_000_000,
  },
];

/* ─── CAMPAIGNS ──────────────────────────────────── */
export const campaigns: Campaign[] = [
  {
    id: "camp-001",
    title: "Gants chirurgicaux latex — Campagne Hôpitaux Africains Q3",
    supplierId: "sup-001",
    sectorId: "health-cosmetics",
    productIds: ["prod-001"],
    description: "Commande groupée internationale de gants chirurgicaux en latex stériles grade premium. Certification CE et FDA. Idéal pour hôpitaux, cliniques et laboratoires. Livraison CIF vers tous ports africains.",
    image: "🧤",
    imageColor: "#2D6A8F",
    startDate: "2026-08-01",
    endDate: "2026-09-15",
    status: "active",
    currentQty: 3_850_000,
    targetQty: 5_000_000,
    participantCount: 42,
    priceTiers: [
      { minQty: 100_000, maxQty: 499_999,  pricePerUnit: 0.085, currency: "USD", discount: 0,  label: "Starter" },
      { minQty: 500_000, maxQty: 999_999,  pricePerUnit: 0.072, currency: "USD", discount: 15, label: "Bronze" },
      { minQty: 1_000_000, maxQty: 2_999_999, pricePerUnit: 0.062, currency: "USD", discount: 27, label: "Silver" },
      { minQty: 3_000_000, maxQty: null,    pricePerUnit: 0.049, currency: "USD", discount: 42, label: "Gold" },
    ],
    unit: "paires",
    moq: 100_000,
    origin: "Allemagne / Malaisie",
    certifications: ["CE", "ISO 10282", "FDA 510(k)"],
    whatsappEnabled: true,
    deliveryZones: ["Afrique de l'Ouest", "Afrique de l'Est", "Afrique Centrale", "Afrique du Nord", "Afrique du Sud"],
    tags: ["médical", "prioritaire", "certifié"],
  },
  {
    id: "camp-002",
    title: "Filtres à huile moteur Diesel — Pack Flottes Africaines",
    supplierId: "sup-003",
    sectorId: "mechanical-parts",
    productIds: ["prod-010"],
    description: "Filtres à huile OEM compatibles moteurs diesel — Toyota, Isuzu, Mercedes, Man, Renault. Idéal pour flottes de transport, mines et BTP.",
    image: "🔧",
    imageColor: "#7C5C38",
    startDate: "2026-08-05",
    endDate: "2026-09-30",
    status: "active",
    currentQty: 12_400,
    targetQty: 25_000,
    participantCount: 18,
    priceTiers: [
      { minQty: 500,   maxQty: 1999,  pricePerUnit: 12.50, currency: "USD", discount: 0,  label: "Starter" },
      { minQty: 2000,  maxQty: 4999,  pricePerUnit: 10.80, currency: "USD", discount: 14, label: "Bronze" },
      { minQty: 5000,  maxQty: 14999, pricePerUnit: 9.20,  currency: "USD", discount: 26, label: "Silver" },
      { minQty: 15000, maxQty: null,  pricePerUnit: 7.90,  currency: "USD", discount: 37, label: "Gold" },
    ],
    unit: "pièces",
    moq: 500,
    origin: "Chine (Guangzhou)",
    certifications: ["ISO 9001", "IATF 16949", "OEM certified"],
    whatsappEnabled: true,
    deliveryZones: ["Afrique de l'Ouest", "Afrique Centrale", "Afrique du Nord"],
    tags: ["mécanique", "automobile", "flotte"],
  },
  {
    id: "camp-003",
    title: "Sucre roux de canne brésilien — Vrac 50kg Alimentaire",
    supplierId: "sup-004",
    sectorId: "agri-food",
    productIds: ["prod-020"],
    description: "Sucre de canne brut ICUMSA 45 et ICUMSA 150. Qualité premium export, certifié Halal. Conditionnement 50kg PP bags. Minimum 1 FCL.",
    image: "🌾",
    imageColor: "#1B5E3E",
    startDate: "2026-07-15",
    endDate: "2026-10-01",
    status: "active",
    currentQty: 850,
    targetQty: 1000,
    participantCount: 27,
    priceTiers: [
      { minQty: 25,  maxQty: 99,   pricePerUnit: 285, currency: "USD", discount: 0,  label: "Starter" },
      { minQty: 100, maxQty: 249,  pricePerUnit: 268, currency: "USD", discount: 6,  label: "Bronze" },
      { minQty: 250, maxQty: 499,  pricePerUnit: 248, currency: "USD", discount: 13, label: "Silver" },
      { minQty: 500, maxQty: null, pricePerUnit: 225, currency: "USD", discount: 21, label: "Gold" },
    ],
    unit: "tonnes",
    moq: 25,
    origin: "Brésil (São Paulo)",
    certifications: ["Halal IFANCA", "FSSC 22000", "Kosher"],
    whatsappEnabled: true,
    deliveryZones: ["Afrique de l'Ouest", "Afrique du Nord", "Afrique de l'Est", "Moyen-Orient"],
    tags: ["alimentaire", "halal", "vrac"],
  },
  {
    id: "camp-004",
    title: "Crème éclaircissante Vitamine C Pro — Cliniques & Pharmacies",
    supplierId: "sup-002",
    sectorId: "health-cosmetics",
    productIds: ["prod-005"],
    description: "Gamme cosmétique professionnelle à base de Vitamine C pure 20%, acide kojique et niacinamide. Formulation sans hydroquinone. Pour professionnels de santé et esthétique.",
    image: "✨",
    imageColor: "#8B1A4A",
    startDate: "2026-08-10",
    endDate: "2026-09-20",
    status: "active",
    currentQty: 4_200,
    targetQty: 6_000,
    participantCount: 63,
    priceTiers: [
      { minQty: 100,  maxQty: 299,  pricePerUnit: 18.50, currency: "EUR", discount: 0,  label: "Starter" },
      { minQty: 300,  maxQty: 999,  pricePerUnit: 15.80, currency: "EUR", discount: 15, label: "Bronze" },
      { minQty: 1000, maxQty: 2999, pricePerUnit: 13.20, currency: "EUR", discount: 29, label: "Silver" },
      { minQty: 3000, maxQty: null, pricePerUnit: 10.90, currency: "EUR", discount: 41, label: "Gold" },
    ],
    unit: "unités (50ml)",
    moq: 100,
    origin: "France (Paris)",
    certifications: ["ECOCERT", "Cosmos Organic", "Sans parabènes", "Vegan"],
    whatsappEnabled: true,
    deliveryZones: ["Monde entier"],
    tags: ["cosmétique", "pharmacie", "premium"],
  },
  {
    id: "camp-005",
    title: "Panneaux Solaires 400W Monocristallin — Énergie Verte Afrique",
    supplierId: "sup-006",
    sectorId: "electronics-tech",
    productIds: ["prod-030"],
    description: "Panneaux solaires 400W monocristallins haute efficacité (22.4%). Garantie 25 ans de production. Idéal pour installations off-grid et mini-réseaux africains.",
    image: "☀️",
    imageColor: "#1E4D8C",
    startDate: "2026-08-15",
    endDate: "2026-10-15",
    status: "active",
    currentQty: 1_840,
    targetQty: 5_000,
    participantCount: 12,
    priceTiers: [
      { minQty: 50,   maxQty: 199,  pricePerUnit: 95,  currency: "USD", discount: 0,  label: "Starter" },
      { minQty: 200,  maxQty: 499,  pricePerUnit: 82,  currency: "USD", discount: 14, label: "Bronze" },
      { minQty: 500,  maxQty: 1999, pricePerUnit: 71,  currency: "USD", discount: 25, label: "Silver" },
      { minQty: 2000, maxQty: null, pricePerUnit: 59,  currency: "USD", discount: 38, label: "Gold" },
    ],
    unit: "panneaux",
    moq: 50,
    origin: "Inde (Bangalore)",
    certifications: ["IEC 61215", "IEC 61730", "ISO 9001", "MCS"],
    whatsappEnabled: true,
    deliveryZones: ["Afrique de l'Ouest", "Afrique Centrale", "Afrique de l'Est", "Afrique du Sud"],
    tags: ["solaire", "énergie verte", "off-grid"],
  },
  {
    id: "camp-006",
    title: "Uniformes de travail renforcés — Secteur Minier & BTP",
    supplierId: "sup-007",
    sectorId: "textiles",
    productIds: ["prod-040"],
    description: "Combinaisons de travail 100% coton ignifugé FR-certified + combinaisons réfléchissantes classe 3. Tailles XS-4XL. Logo et couleur personnalisables.",
    image: "🦺",
    imageColor: "#8B1A4A",
    startDate: "2026-08-20",
    endDate: "2026-09-30",
    status: "active",
    currentQty: 2_300,
    targetQty: 5_000,
    participantCount: 21,
    priceTiers: [
      { minQty: 100,  maxQty: 499,  pricePerUnit: 28,  currency: "EUR", discount: 0,  label: "Starter" },
      { minQty: 500,  maxQty: 999,  pricePerUnit: 24,  currency: "EUR", discount: 14, label: "Bronze" },
      { minQty: 1000, maxQty: 2999, pricePerUnit: 20,  currency: "EUR", discount: 29, label: "Silver" },
      { minQty: 3000, maxQty: null, pricePerUnit: 16,  currency: "EUR", discount: 43, label: "Gold" },
    ],
    unit: "pièces",
    moq: 100,
    origin: "Turquie (Istanbul)",
    certifications: ["EN ISO 11612", "EN ISO 20471 Cl.3", "OEKO-TEX 100"],
    whatsappEnabled: true,
    deliveryZones: ["Afrique de l'Ouest", "Afrique Centrale", "Afrique du Sud"],
    tags: ["EPI", "sécurité", "personnalisable"],
  },
  {
    id: "camp-007",
    title: "Ciment Portland CPA 42,5 — Chantiers Afrique Centrale",
    supplierId: "sup-005",
    sectorId: "construction",
    productIds: ["prod-050"],
    description: "Ciment Portland CPA 42,5 résistance haute, conditionnement 50kg. Idéal pour tous types de construction. Livraison CIF Douala, Lagos, Abidjan, Dakar.",
    image: "🏗️",
    imageColor: "#8B5E3C",
    startDate: "2026-09-01",
    endDate: "2026-10-31",
    status: "upcoming",
    currentQty: 0,
    targetQty: 5_000,
    participantCount: 0,
    priceTiers: [
      { minQty: 500,  maxQty: 1999, pricePerUnit: 7.80, currency: "USD", discount: 0,  label: "Starter" },
      { minQty: 2000, maxQty: 4999, pricePerUnit: 6.90, currency: "USD", discount: 12, label: "Bronze" },
      { minQty: 5000, maxQty: null, pricePerUnit: 5.90, currency: "USD", discount: 24, label: "Silver" },
    ],
    unit: "sacs 50kg",
    moq: 500,
    origin: "Maroc (Casablanca)",
    certifications: ["NM 10.1.004", "CE", "ISO 9001"],
    whatsappEnabled: true,
    deliveryZones: ["Afrique Centrale", "Afrique de l'Ouest"],
    tags: ["construction", "matériaux", "vrac"],
  },
];

/* ─── PRODUCTS ───────────────────────────────────── */
export const products: Product[] = [
  {
    id: "prod-001",
    name: "Gants chirurgicaux latex stériles — Boîte 100",
    supplierId: "sup-001",
    sectorId: "health-cosmetics",
    subcategory: "Consommables labo",
    description: "Gants chirurgicaux en latex naturel, stériles, powder-free. Tailles XS à XL. Certification CE cat. III, FDA 510(k).",
    image: "🧤",
    imageColor: "#2D6A8F",
    basePrice: 8.50,
    currency: "USD",
    unit: "boîte/100 paires",
    moq: 1000,
    origin: "Malaisie / Allemagne",
    certifications: ["CE Cat III", "ISO 10282", "FDA 510(k)"],
    inStock: true,
    featured: true,
    tags: ["médical", "stérile", "latex"],
  },
  {
    id: "prod-002",
    name: "Tensiomètre numérique professionnel",
    supplierId: "sup-001",
    sectorId: "health-cosmetics",
    subcategory: "Équipements médicaux",
    description: "Tensiomètre bras professionnel avec mémoire 120 mesures, Bluetooth, validé cliniquement. Idéal pharmacies et cliniques.",
    image: "❤️",
    imageColor: "#C41E3A",
    basePrice: 89.00,
    currency: "EUR",
    unit: "unité",
    moq: 50,
    origin: "Allemagne",
    certifications: ["CE MDR", "ISO 81060-2", "Bluetooth 5.0"],
    inStock: true,
    featured: true,
    tags: ["médical", "diagnostic", "numérique"],
  },
  {
    id: "prod-003",
    name: "Gel hydroalcoolique 5L — Usage professionnel",
    supplierId: "sup-001",
    sectorId: "health-cosmetics",
    subcategory: "Consommables labo",
    description: "Solution hydroalcoolique 70% + 0,5% chlorhexidine. Formule OMS type II. Bidon 5 litres. Pour hôpitaux, cliniques, laboratoires.",
    image: "🧴",
    imageColor: "#1A8C7A",
    basePrice: 12.50,
    currency: "EUR",
    unit: "bidon 5L",
    moq: 100,
    origin: "Allemagne",
    certifications: ["CE", "EN 1500", "OMS Type II"],
    inStock: true,
    featured: false,
    tags: ["hygiène", "désinfection", "OMS"],
  },
  {
    id: "prod-004",
    name: "Masque chirurgical 3 plis Type IIR — Boîte 50",
    supplierId: "sup-001",
    sectorId: "health-cosmetics",
    subcategory: "Matériel chirurgical",
    description: "Masque chirurgical 3 plis, filtration BFE ≥98%, résistance aux éclaboussures. Certification EN 14683 Type IIR.",
    image: "😷",
    imageColor: "#4A90B8",
    basePrice: 9.80,
    currency: "EUR",
    unit: "boîte/50 masques",
    moq: 500,
    origin: "Allemagne",
    certifications: ["CE", "EN 14683 Type IIR"],
    inStock: true,
    featured: false,
    tags: ["protection", "chirurgie", "certifié"],
  },
  {
    id: "prod-005",
    name: "Sérum Vitamine C 20% Professional Grade",
    supplierId: "sup-002",
    sectorId: "health-cosmetics",
    subcategory: "Cosmétiques Pro",
    description: "Sérum professionnel Vitamine C 20% pure + acide kojique 2% + niacinamide 5%. Sans hydroquinone. Formule dermo-cosmétique exclus. Flacon 30ml.",
    image: "✨",
    imageColor: "#D4920A",
    basePrice: 22.00,
    currency: "EUR",
    unit: "flacon 30ml",
    moq: 100,
    origin: "France",
    certifications: ["ECOCERT", "Vegan Certified", "Sans parabènes"],
    inStock: true,
    featured: true,
    tags: ["cosmétique", "vitamine C", "professionnel"],
  },
  {
    id: "prod-006",
    name: "Kit de suture chirurgicale résorbable 3/0",
    supplierId: "sup-001",
    sectorId: "health-cosmetics",
    subcategory: "Matériel chirurgical",
    description: "Sutures résorbables polyglycolicacide (PGA) 3/0, aiguille ronde 40mm 1/2 cercle. Boîte de 12 unités stériles.",
    image: "🩺",
    imageColor: "#2D6A8F",
    basePrice: 34.00,
    currency: "EUR",
    unit: "boîte/12 unités",
    moq: 50,
    origin: "Allemagne",
    certifications: ["CE MDR", "ISO 10334", "Stérile"],
    inStock: true,
    featured: false,
    tags: ["chirurgie", "résorbable", "stérile"],
  },
  {
    id: "prod-010",
    name: "Filtre à huile diesel universel OEM — Toyota Hilux/Land Cruiser",
    supplierId: "sup-003",
    sectorId: "mechanical-parts",
    subcategory: "Pièces automobiles",
    description: "Filtre à huile haute performance compatible Toyota Hilux Diesel, Land Cruiser 200/300, Hiace. Anti-retour intégré. Durée 10 000km.",
    image: "🔧",
    imageColor: "#7C5C38",
    basePrice: 13.50,
    currency: "USD",
    unit: "pièce",
    moq: 500,
    origin: "Chine",
    certifications: ["ISO 9001", "IATF 16949", "OEM equivalent"],
    inStock: true,
    featured: true,
    tags: ["automobile", "toyota", "diesel"],
  },
  {
    id: "prod-011",
    name: "Courroie de distribution renforcée — Moteurs 1KD/2KD",
    supplierId: "sup-003",
    sectorId: "mechanical-parts",
    subcategory: "Pièces automobiles",
    description: "Courroie de distribution en fibre aramide pour moteurs Toyota 1KD-FTV et 2KD-FTV. Résistance thermique -40/+150°C.",
    image: "⚙️",
    imageColor: "#5C3D1E",
    basePrice: 28.90,
    currency: "USD",
    unit: "pièce",
    moq: 200,
    origin: "Chine",
    certifications: ["ISO 9001", "IATF 16949"],
    inStock: true,
    featured: false,
    tags: ["distribution", "toyota", "courroie"],
  },
  {
    id: "prod-020",
    name: "Sucre roux de canne ICUMSA 45 — Sacs 50kg",
    supplierId: "sup-004",
    sectorId: "agri-food",
    subcategory: "Produits en vrac",
    description: "Sucre de canne brut ICUMSA 45 (blanc raffiné) et ICUMSA 150 (roux). Origine Brésil, qualité export premium. Sacs PP 50kg.",
    image: "🌾",
    imageColor: "#1B5E3E",
    basePrice: 295.00,
    currency: "USD",
    unit: "tonne",
    moq: 25,
    origin: "Brésil",
    certifications: ["Halal IFANCA", "FSSC 22000", "ISO 22000"],
    inStock: true,
    featured: true,
    tags: ["sucre", "alimentaire", "vrac"],
  },
  {
    id: "prod-021",
    name: "Riz blanc parfumé jasmin — Grade A export",
    supplierId: "sup-004",
    sectorId: "agri-food",
    subcategory: "Produits en vrac",
    description: "Riz blanc parfumé type jasmin, grain long, humidité <14%. Conditionnement : 25kg ou 50kg. Origine Thaïlande via Brésil.",
    image: "🍚",
    imageColor: "#2E7D32",
    basePrice: 480.00,
    currency: "USD",
    unit: "tonne",
    moq: 20,
    origin: "Thaïlande",
    certifications: ["Halal", "ISO 22000"],
    inStock: true,
    featured: true,
    tags: ["riz", "jasmin", "alimentaire"],
  },
  {
    id: "prod-030",
    name: "Panneau solaire monocristallin 400W — Tier 1",
    supplierId: "sup-006",
    sectorId: "electronics-tech",
    subcategory: "Énergie solaire",
    description: "Panneau solaire monocristallin haute efficacité 22.4%, 400Wc. Cadre aluminium anodisé, verre trempé 3.2mm AR. Garantie 25 ans production linéaire.",
    image: "☀️",
    imageColor: "#1E4D8C",
    basePrice: 98.00,
    currency: "USD",
    unit: "panneau",
    moq: 50,
    origin: "Inde",
    certifications: ["IEC 61215", "IEC 61730", "MCS", "PID resistant"],
    inStock: true,
    featured: true,
    tags: ["solaire", "énergie", "400W"],
  },
  {
    id: "prod-040",
    name: "Combinaison de travail FR ignifugée — Class 1",
    supplierId: "sup-007",
    sectorId: "textiles",
    subcategory: "EPI & Sécurité",
    description: "Combinaison de travail en coton ignifugé EN ISO 11612. Coutures renforcées, fermeture éclaire YKK. Personnalisation logo disponible. Tailles XS-4XL.",
    image: "🦺",
    imageColor: "#8B1A4A",
    basePrice: 32.00,
    currency: "EUR",
    unit: "pièce",
    moq: 100,
    origin: "Turquie",
    certifications: ["EN ISO 11612", "OEKO-TEX 100", "ISO 9001"],
    inStock: true,
    featured: true,
    tags: ["EPI", "ignifugé", "combinaison"],
  },
  {
    id: "prod-050",
    name: "Ciment Portland CPA 42,5 — Sac 50kg",
    supplierId: "sup-005",
    sectorId: "construction",
    subcategory: "Ciment & Acier",
    description: "Ciment Portland Artificiel CPA 42,5 résistance haute. Sac papier kraft 50kg. Idéal constructions parasismiques, dalles et fondations.",
    image: "🏗️",
    imageColor: "#8B5E3C",
    basePrice: 8.20,
    currency: "USD",
    unit: "sac 50kg",
    moq: 500,
    origin: "Maroc",
    certifications: ["NM 10.1.004", "CE", "EN 197-1"],
    inStock: true,
    featured: true,
    tags: ["ciment", "construction", "BTP"],
  },
];

/* ─── CLIENTS SAMPLE ──────────────────────────────── */
export const clients: Client[] = [
  { id: "cli-001", companyName: "Pharmacie Centrale Dakar", country: "Sénégal", flag: "🇸🇳", type: "Pharmacie", sectorIds: ["health-cosmetics"], verified: true },
  { id: "cli-002", companyName: "Clinique Saint-Louis Abidjan", country: "Côte d'Ivoire", flag: "🇨🇮", type: "Clinique", sectorIds: ["health-cosmetics"], verified: true },
  { id: "cli-003", companyName: "Garage Central Kinshasa", country: "RD Congo", flag: "🇨🇩", type: "Garage industriel", sectorIds: ["mechanical-parts"], verified: true },
  { id: "cli-004", companyName: "Minoterie du Sahel", country: "Mali", flag: "🇲🇱", type: "Industrie alimentaire", sectorIds: ["agri-food"], verified: true },
  { id: "cli-005", companyName: "BTP Partners Nigeria", country: "Nigeria", flag: "🇳🇬", type: "BTP", sectorIds: ["construction", "mechanical-parts"], verified: true },
  { id: "cli-006", companyName: "SolarTech Ghana", country: "Ghana", flag: "🇬🇭", type: "Installateur solaire", sectorIds: ["electronics-tech"], verified: true },
];

/* ─── HELPERS ────────────────────────────────────── */
export function getSupplier(id: string) { return suppliers.find((s) => s.id === id); }
export function getSector(id: string) { return sectors.find((s) => s.id === id); }
export function getCampaign(id: string) { return campaigns.find((c) => c.id === id); }

export function getCurrentTier(campaign: Campaign): PriceTier {
  const sorted = [...campaign.priceTiers].sort((a, b) => b.minQty - a.minQty);
  return sorted.find((t) => campaign.currentQty >= t.minQty) ?? campaign.priceTiers[0];
}

export function getNextTier(campaign: Campaign): PriceTier | null {
  const current = getCurrentTier(campaign);
  const idx = campaign.priceTiers.indexOf(current);
  return idx < campaign.priceTiers.length - 1 ? campaign.priceTiers[idx + 1] : null;
}

export function getCampaignProgress(campaign: Campaign): number {
  return Math.min(100, (campaign.currentQty / campaign.targetQty) * 100);
}

export function formatQty(qty: number, unit: string): string {
  if (qty >= 1_000_000) return `${(qty / 1_000_000).toFixed(1)}M ${unit}`;
  if (qty >= 1_000) return `${(qty / 1_000).toFixed(0)}K ${unit}`;
  return `${qty.toLocaleString("fr-FR")} ${unit}`;
}

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency, minimumFractionDigits: 2 }).format(price);
}

export const WHATSAPP_BASE = "+33612345678";
export function buildWhatsAppLink(campaign: Campaign, phoneNumber?: string): string {
  const phone = phoneNumber ?? WHATSAPP_BASE;
  const text = encodeURIComponent(
    `Bonjour! Je suis intéressé par la campagne d'achat groupé:\n\n` +
    `📦 *${campaign.title}*\n` +
    `🔗 ID: ${campaign.id}\n\n` +
    `Pouvez-vous m'envoyer plus d'informations sur les quantités disponibles et les délais de livraison?\n\n` +
    `Merci`
  );
  return `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${text}`;
}
