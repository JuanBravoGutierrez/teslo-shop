//import { getServerSession } from "next-auth/next";
// Asegúrate de exportar authOptions desde tu archivo de configuración de NextAuth (por ejemplo, auth.config.ts)
//import { authOptions } from "@/auth.config";

import { auth } from '../../../../auth';

import { redirect } from 'next/navigation';

export default async function CheckoutLayout({ children }: {
  children: React.ReactNode;
}) {
  // Obtener la sesión usando getServerSession y las opciones de autenticación
  //const session = await getServerSession(authOptions);
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?redirectTo=/checkout/address");
  }

  return (
    <>
      { children }
    </>
  );
}