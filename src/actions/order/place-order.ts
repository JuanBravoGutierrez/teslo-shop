"use server";

import { db } from "src/lib/auth/db";

import type { Address, Size } from "@/interfaces";

import { auth } from '../../../auth';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {

  const session = await auth();
  console.log('JBG OJO OJO OJO pace-order.ts session=', session);

  //const userId = session?.user.id;

  // Verificar sesión de usuario
  if (!session) {
    return {
      ok: false,
      message: "No hay sesión de usuario en pace-order.ts",
    };
  }
  // Obtener el ID del usuario
  const userRecord = await db.user.findUnique({
    where: { email: session.user.email! }, });
  
  if (!userRecord) {
    return {
      ok: false,
      message: "No hay user en pace-order.ts",
    };
  }
  const userId = userRecord?.id;
  console.log('JBG OJO OJO OJO pace-order.ts OJO => userId=', userId);


  // Obtener la información de los productos
  // Nota: recuerden que podemos llevar 2+ productos con el mismo ID
  //const products: Product[] = await prisma.product.findMany({
  const products = await db.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calcular los montos // Encabezado
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // Los totales de tax, subtotal, y total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        console.error(`Producto ${item.productId} no encontrado`);
        return totals; // o lanzar error si prefieres detener la operación
      }

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // Crear la transacción de base de datos
  try {

    const prismaTx = await db.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map((product) => {
        //  Acumular los valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity // no hacer
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativos en las existencia = no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });



      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products?.find((product) => String(product.id) === String(p.productId))
                    ?.price ?? 0,
              })),
            },
          },
        },
      });



      // Validar, si el price es cero, entonces, lanzar un error

      // 3. Crear la direccion de la orden
      // Address
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });


    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    }


  } catch (error: unknown) {
    if (error instanceof Error)
      return {
        ok: false,
        message: error.message,
      };
    return {
      ok: false,
      message: 'Unknown error',
    };
  }
};
