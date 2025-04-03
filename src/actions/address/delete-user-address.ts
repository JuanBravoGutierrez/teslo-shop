'use server';

import { db } from "src/lib/auth/db";

export const deleteUserAddress = async( userId: string ) => {

  try {

    // Verifica que el usuario exista (esto es opcional si ya lo haces en otro lado)
    const existing = await db.userAddress.findUnique({ where: { userId } });
    if (!existing) {
      // Opcional: devolver ok true o un mensaje informativo.
      return { ok: true, message: 'No hay dirección para eliminar' };
    }

    const deleted = await db.userAddress.delete({
      where: { userId }
    });

    if (!deleted) {
      return {
        ok: false,
        message: 'No se pudo eliminar la direccion'
      }
    }
    return { ok: true, deleted };
    
  } catch (error) {
    console.log(error);
  
    return {
      ok: false,
      message: 'No se pudo eliminar la direccion'
    };

}
};
