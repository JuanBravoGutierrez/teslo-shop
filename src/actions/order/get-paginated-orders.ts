'use server';

//import { auth } from '@/auth.config';
import { db } from "src/lib/auth/db";

import { auth } from '../../../auth';


export const getPaginatedOrders = async() => {

  const session = await auth();

  if ( session?.user.role !== 'admin'  ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    }
  })

  return {
    ok: true,
    orders: orders,
  }


}