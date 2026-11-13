// Datos de prueba de la landing (sin base de datos).
// Reflejan la forma de los modelos de prisma/schema.prisma del proyecto rosapasion-club.
// Reemplazar por consultas reales (Prisma) cuando se conecte la BD.

import type { BusinessItem } from "@/components/portal/portal-view";

export const mockCategories = [
  { id: "cat-1", name: "Gastronomía", slug: "gastronomia", iconName: "Coffee" },
  { id: "cat-2", name: "Belleza", slug: "belleza", iconName: "Sparkles" },
  { id: "cat-3", name: "Salud", slug: "salud", iconName: "HeartPulse" },
  { id: "cat-4", name: "Vehículos", slug: "vehiculos", iconName: "Car" },
  { id: "cat-5", name: "Servicios", slug: "servicios", iconName: "Scale" },
];

const cat = (slug: string) => {
  const c = mockCategories.find((x) => x.slug === slug)!;
  return { id: c.id, name: c.name, slug: c.slug };
};

const terms = (id: string, items: string[]) =>
  items.map((description, i) => ({ id: `${id}-t${i}`, description, isRule: i > 0, order: i }));

export const mockBusinesses: BusinessItem[] = [
  {
    id: "biz-1",
    name: "Cafetería Demo",
    slug: "cafeteria-demo",
    discountSummary: "15% de descuento en consumo",
    storeCode: "1111",
    order: 1,
    category: cat("gastronomia"),
    terms: terms("biz-1", [
      "Texto de prueba: descuento válido de lunes a jueves.",
      "No acumulable con otras promociones.",
    ]),
  },
  {
    id: "biz-2",
    name: "Salón de Belleza Demo",
    slug: "salon-demo",
    discountSummary: "20% en cortes y tratamientos",
    storeCode: "2222",
    order: 2,
    category: cat("belleza"),
    terms: terms("biz-2", [
      "Texto de prueba: reserva previa por WhatsApp.",
      "Válido para el titular de la tarjeta.",
    ]),
  },
  {
    id: "biz-3",
    name: "Clínica Dental Demo",
    slug: "clinica-demo",
    discountSummary: "Evaluación gratuita + 10% en tratamientos",
    storeCode: "3333",
    order: 3,
    category: cat("salud"),
    terms: terms("biz-3", ["Texto de prueba: presentar DNI junto con la tarjeta."]),
  },
  {
    id: "biz-4",
    name: "Car Wash Demo",
    slug: "carwash-demo",
    discountSummary: "2x1 en lavado de salón",
    storeCode: "4444",
    order: 4,
    category: cat("vehiculos"),
    terms: terms("biz-4", ["Texto de prueba: válido una vez por semana."]),
  },
  {
    id: "biz-5",
    name: "Estudio Legal Demo",
    slug: "legal-demo",
    discountSummary: "Primera consulta sin costo",
    storeCode: "5555",
    order: 5,
    category: cat("servicios"),
    terms: terms("biz-5", ["Texto de prueba: previa cita."]),
  },
  {
    id: "biz-6",
    name: "Pastelería Demo",
    slug: "pasteleria-demo",
    discountSummary: "10% en tortas personalizadas",
    storeCode: "6666",
    order: 6,
    category: cat("gastronomia"),
    terms: terms("biz-6", ["Texto de prueba: pedidos con 48 h de anticipación."]),
  },
  {
    id: "biz-7",
    name: "Spa Demo",
    slug: "spa-demo",
    discountSummary: "25% en masajes relajantes",
    storeCode: "7777",
    order: 7,
    category: cat("belleza"),
    terms: terms("biz-7", ["Texto de prueba: sujeto a disponibilidad."]),
  },
];

export const mockSettings = {
  catalogUrl: "https://rosapasion.com/rosa-pasion-principal",
  supportPhone: "51900000000",
  facebookUrl: "https://www.facebook.com/Rosapasion",
  instagramUrl: "https://www.instagram.com/rosapasion_tarapoto",
  tiktokUrl: "https://www.tiktok.com/@rosapasion.tarapoto",
  clubSettings: {
    yapePhone: "900 000 000",
    yapeName: "Titular de Prueba",
    yapeQrUrl: null,
    plinPhone: "900 000 000",
    plinQrUrl: null,
    bcpAccount: "000-00000000-0-00",
    bcpCci: "00000000000000000000",
    interbankAccount: "0000000000000",
    interbankCci: "",
    bbvaAccount: "0000-0000-0000000000",
    bbvaCci: "",
    bankBeneficiary: "Titular de Prueba",
    bankAccounts: null,
    membershipPrice: 29,
  },
};

const DAY = 24 * 60 * 60 * 1000;

function memberFixture(opts: {
  id: string;
  code: string;
  name: string;
  documentNumber: string;
  status: "ACTIVA" | "VENCIDA" | "SUSPENDIDA";
  daysRemaining: number;
  totalRedemptions: number;
}) {
  const validUntil = new Date(Date.now() + opts.daysRemaining * DAY);
  return {
    id: opts.id,
    code: opts.code,
    cardNumber: null as string | null,
    name: opts.name,
    documentType: "DNI",
    documentNumber: opts.documentNumber,
    phone: "900000000",
    recipientName: null,
    recipientPhone: null,
    senderName: null,
    dedication: null,
    status: opts.status,
    validFrom: new Date(validUntil.getTime() - 30 * DAY).toISOString(),
    validUntil: validUntil.toISOString(),
    isCurrentlyActive: opts.status === "ACTIVA" && opts.daysRemaining > 0,
    daysRemaining: Math.max(0, opts.daysRemaining),
    totalRedemptions: opts.totalRedemptions,
  };
}

/** Socios de prueba (DNI → escenario). */
export const mockMembers = [
  memberFixture({ id: "m-1", code: "RPC-0001", name: "Socio de Prueba", documentNumber: "12345678", status: "ACTIVA", daysRemaining: 22, totalRedemptions: 3 }),
  memberFixture({ id: "m-2", code: "RPC-0002", name: "Socia Por Vencer", documentNumber: "22222222", status: "ACTIVA", daysRemaining: 3, totalRedemptions: 1 }),
  memberFixture({ id: "m-3", code: "RPC-0003", name: "Socio Vencido", documentNumber: "33333333", status: "VENCIDA", daysRemaining: 0, totalRedemptions: 7 }),
  memberFixture({ id: "m-4", code: "RPC-0004", name: "Socia Pago Pendiente", documentNumber: "44444444", status: "VENCIDA", daysRemaining: 0, totalRedemptions: 2 }),
];

/** Documentos con un pago de renovación PENDIENTE simulado. */
export const mockPendingPaymentDocs = new Set(["44444444"]);

/** Publicaciones sociales: vacío → el feed muestra los perfiles oficiales. */
export const mockSocialPosts: unknown[] = [];
