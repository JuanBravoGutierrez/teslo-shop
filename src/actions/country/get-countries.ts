'use server';

import { db } from "src/lib/auth/db";


export const getCountries = async() => {

  try {
    
    const countries = await db.country.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return countries;


  } catch (error) {
    console.log(error);
    return [];
  }


}