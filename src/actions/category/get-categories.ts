'use server';

import { db } from "src/lib/auth/db";



export const getCategories =  async()=> {

  try {
      const categories = await db.category.findMany({
        orderBy: {
          name: 'asc'
        }
      });


      return categories;



  } catch (error) {
    console.log(error);
    return [];
  }


}