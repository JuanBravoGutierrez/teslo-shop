'use server';

import { db } from "src/lib/auth/db";

export const deleteUserAddress = async( userId: string ) => {

  try {

    const deleted = await db.userAddress.delete({
      where: { userId }
    });

    if (!deleted) {
      return {
        ok: false,
        message: 'No se pudo eliminar la direccion'
      }
    }
    return { ok: true };
    
  } catch (error) {
    console.log(error);
  
    return {
      ok: false,
      message: 'No se pudo eliminar la direccion'
    }

}
}