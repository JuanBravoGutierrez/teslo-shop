'use server';

import { db } from "src/lib/auth/db";
import { auth } from '../../../auth';

export const getPaginatedUsers = async() => {

  const session = await auth();

  if ( session?.user.role !== 'admin' ) {
    return {
      ok: false,
      message: 'Debe de ser un usuario administrador'
    }
  }
  
  const users = await db.user.findMany({
    orderBy: {
      name: 'desc'
    }
  });

  return {
    ok: true,
    users: users
  }

}