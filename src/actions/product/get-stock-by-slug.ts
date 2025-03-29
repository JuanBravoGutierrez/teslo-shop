'use server';

import { db } from "src/lib/auth/db";

export const getStockBySlug = async( slug: string ): Promise<number> => {

  try {

    const stock = await db.product.findFirst({
      where: { slug },
      select: { inStock: true }
    });

    return stock?.inStock ?? 0;

  } catch (error) {
    console.log(error)
    return 0;
  }

}