"use server";

import type { Address } from "@/interfaces";
import { db } from "src/lib/auth/db";

export const setUserAddress = async (address: Address, userId: string) => {
  try {

    const newAddress = await createOrReplaceAddress( address, userId );

    return {
      ok: true,
      address: newAddress,
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo grabar la dirección",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {

    // Verifica que el usuario exista (esto es opcional si ya lo haces en otro lado)
    const userExists = await db.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      throw new Error("El usuario no existe dentro de createOrReplaceAddress.");
    }

    const storedAddress = await db.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      city: address.city,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
    };

    if (!storedAddress) {
      const newAddress = await db.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }

    const updatedAddress = await db.userAddress.update({
      where: { userId },
      data: addressToSave
    })

    return updatedAddress;



  } catch (error) {
    console.log(error);
    throw new Error("No se pudo grabar la dirección");
  }
};
