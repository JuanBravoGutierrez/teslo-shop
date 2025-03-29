'use server';

//import { auth } from '@/auth.config';
import { db } from "src/lib/auth/db";
import { revalidatePath } from 'next/cache';

import { auth } from '../../../auth';

export const changeUserRole = async( userId: string, role: string ) => {

  const session = await auth();

  if ( session?.user.role !== 'admin' ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado como admin'
    }
  }

  try {

    const newRole = role === 'admin' ? 'admin':'user';


    const user = await db.user.update({
      where: {
        id: userId
      },
      data: {
        role: newRole
      }
    })
    if ( !user ) {
      throw new Error('No se encontró el usuario');
      }

    revalidatePath('/admin/users');

    return {
      ok: true
    }
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo actualizar el role, revisar logs'
    }
  }



}