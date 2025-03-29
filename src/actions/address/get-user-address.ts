'use server';

import { db } from "src/lib/auth/db";


export const getUserAddress = async( userId: string ) => {
  try {

    const address = await db.userAddress.findUnique({
      where: { userId }
    });

    if ( !address ) return null;

    const {  countryId, address2, ...rest } = address;

    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : '',
    };


  } catch (error) {
    console.log(error);
    return null;
  }
}




