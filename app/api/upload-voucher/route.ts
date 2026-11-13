import { NextResponse } from "next/server";

// Mock: no guarda el archivo. El modal de renovación usa la vista previa local como respaldo.
export async function POST() {
  return NextResponse.json({
    success: false,
    message: "Modo demo: la subida de comprobantes aún no está conectada.",
  });
}
