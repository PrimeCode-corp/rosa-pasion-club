// Sustitutos de las Server Actions de rosapasion-club (actions/redemption.ts y actions/payment.ts).
// Mantienen las mismas firmas y formas de respuesta, pero trabajan con datos de prueba en memoria.
// Al conectar la BD, crear actions/*.ts con "use server" y cambiar los imports en components/portal.

import {
  mockBusinesses,
  mockMembers,
  mockPendingPaymentDocs,
  mockSettings,
} from "./data";

export interface PendingPaymentInfo {
  id: string;
  paymentMethod: string;
  amount: number;
  createdAt: string;
  waPendingUrl: string;
}

export interface MemberLookupResult {
  found: boolean;
  message?: string;
  hasPendingPayment?: boolean;
  pendingPayment?: PendingPaymentInfo | null;
  member?: (typeof mockMembers)[number] & {
    hasPendingPayment?: boolean;
    pendingPayment?: PendingPaymentInfo | null;
  };
}

export interface SubmitPaymentInput {
  documentNumber: string;
  memberName: string;
  phone: string;
  paymentMethod?: string;
  operationNumber?: string;
  voucherUrl?: string;
  planName?: string;
  amount?: number;
  notes?: string;
  deliveryAddress?: string;
  deliveryReference?: string;
  recipientName?: string;
  recipientPhone?: string;
  senderName?: string;
  dedication?: string;
}

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

function findMember(query: string) {
  const q = query.trim().toUpperCase();
  return mockMembers.find(
    (m) => m.documentNumber === q || m.code === q || m.cardNumber?.toUpperCase() === q
  );
}

export async function lookupMemberByDocOrCode(query: string): Promise<MemberLookupResult> {
  const q = query.trim();
  if (!q) {
    return { found: false, message: "Por favor ingresa un número de DNI o código de socio." };
  }
  await delay();

  const member = findMember(q);
  if (!member) {
    return {
      found: false,
      message: `No se encontró ningún socio registrado con el DNI o código "${q}". (Demo: prueba 12345678, 22222222, 33333333 o 44444444)`,
    };
  }

  let pendingPayment: PendingPaymentInfo | null = null;
  if (member.documentNumber && mockPendingPaymentDocs.has(member.documentNumber)) {
    pendingPayment = {
      id: `pay-${member.id}`,
      paymentMethod: "YAPE",
      amount: mockSettings.clubSettings.membershipPrice,
      createdAt: new Date().toISOString(),
      waPendingUrl: `https://wa.me/${mockSettings.supportPhone}?text=${encodeURIComponent(
        `¡Hola Rosa Pasión! 🌹 Envié mi comprobante de renovación (${member.code}) pero aún figura en revisión.`
      )}`,
    };
  }
  const hasPending = Boolean(pendingPayment);

  return {
    found: true,
    hasPendingPayment: hasPending,
    pendingPayment,
    message: hasPending
      ? "Tu pago de renovación aún está siendo revisado por nuestro equipo. Por favor espera unos minutos o comunícate por WhatsApp si olvidaste notificar tu pago."
      : undefined,
    member: { ...member, hasPendingPayment: hasPending, pendingPayment },
  };
}

export async function redeemBenefitInStore(data: {
  memberCodeOrDoc: string;
  storeCode: string;
  businessId?: string;
  notes?: string;
}) {
  const { memberCodeOrDoc, businessId, storeCode } = data;
  if (!memberCodeOrDoc?.trim()) return { success: false, message: "Falta identificar al socio." };
  if (!storeCode?.trim()) return { success: false, message: "Por favor ingresa el código del negocio." };
  await delay();

  const member = findMember(memberCodeOrDoc);
  if (!member) return { success: false, message: "Socio no registrado (datos de prueba)." };
  if (!member.isCurrentlyActive) {
    return {
      success: false,
      message: `La membresía de ${member.name} (${member.code}) no está activa o ya se encuentra vencida.`,
    };
  }

  const code = storeCode.trim().toUpperCase();
  const business = businessId
    ? mockBusinesses.find((b) => b.id === businessId)
    : mockBusinesses.find((b) => b.storeCode?.toUpperCase() === code);

  if (business && businessId && business.storeCode?.toUpperCase() !== code) {
    return {
      success: false,
      message: `El código "${storeCode.trim()}" no coincide con el establecimiento seleccionado. (Demo: los códigos son 1111, 2222, … 7777)`,
    };
  }
  if (!business) {
    return {
      success: false,
      message: `No se encontró ningún negocio aliado con el código "${storeCode.trim()}". (Demo: los códigos son 1111, 2222, … 7777)`,
    };
  }

  return {
    success: true,
    log: {
      id: `log-demo-${Date.now()}`,
      date: new Date().toISOString(),
      discountApplied: business.discountSummary,
    },
    member: { name: member.name, code: member.code, documentNumber: member.documentNumber },
    business: { name: business.name, discountSummary: business.discountSummary },
  };
}

export async function submitRenewalPayment(data: SubmitPaymentInput) {
  const cleanDoc = data.documentNumber?.trim();
  if (!cleanDoc) return { success: false, message: "Por favor ingresa tu número de DNI o documento." };
  if (!data.phone?.trim()) {
    return { success: false, message: "Por favor ingresa tu número de celular o WhatsApp." };
  }
  await delay(600);

  const member = findMember(cleanDoc);
  const memberCode = member ? member.code : "NUEVO-SOCIO";
  const memberName = member ? member.name : data.memberName.trim();
  const amount = data.amount ?? mockSettings.clubSettings.membershipPrice;

  const waText = encodeURIComponent(
    `¡Hola Rosa Pasión! 🌹 Acabo de registrar mi comprobante de membresía en la web (DEMO).\n\n` +
      `👤 *Cliente:* ${memberName}\n` +
      `📄 *DNI:* ${cleanDoc}\n` +
      `💳 *Código:* ${memberCode}\n` +
      `💰 *Monto:* S/ ${amount.toFixed(2)} (${data.paymentMethod || "Yape"})`
  );

  return {
    success: true,
    paymentId: `pay-demo-${Date.now()}`,
    memberCode,
    memberName,
    waDirectUrl: `https://api.whatsapp.com/send?phone=${mockSettings.supportPhone}&text=${waText}`,
    message: "¡Comprobante registrado con éxito! (modo demo: no se guardó en ninguna base de datos)",
  };
}
