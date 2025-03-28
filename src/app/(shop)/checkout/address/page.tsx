export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';

//import { auth } from '@/auth.config';
import { auth } from '../../../../../auth';
import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { getCountries, getUserAddress } from "@/actions";



export default async function AddressPage() {
  
  const countries = await getCountries();

  const session = await auth();

  console.log('JBG OJO OJO OJO session=', session);

  if ( !session?.user ) {
      //<h3 className="text-5xl">500 -  No hay sesión de usuario</h3>

      // Redirige inmediatamente a la página de login
      redirect('/auth/login');
  }

  const userAddress = await getUserAddress(String(session.user.id)) ?? undefined;
  


  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm 
          countries={countries} 
          userStoredAddress={ userAddress } 
          usuarioid={ String(session.user.id) }
        />
      </div>
    </div>
  );
}
