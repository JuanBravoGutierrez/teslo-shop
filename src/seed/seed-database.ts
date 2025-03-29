import { db } from "../lib/auth/db";
import { initialData } from './seed';
import { countries } from './seed-countries';



async function main() {

  // 1. Borrar registros previos
  // await Promise.all( [

  await db.orderAddress.deleteMany();
  await db.orderItem.deleteMany();
  await db.order.deleteMany();


  await db.userAddress.deleteMany();
  await db.user.deleteMany();
  await db.country.deleteMany();

  await db.productImage.deleteMany();
  await db.product.deleteMany();
  await db.category.deleteMany();
  // ]);
  
  const { categories, products, users } = initialData;


  await db.user.createMany({
    data: users
  });

  await db.country.createMany({
    data: countries
  });



  //  Categorias
  // {
  //   name: 'Shirt'
  // }
  const categoriesData = categories.map( (name) => ({ name }));
  
  await db.category.createMany({
    data: categoriesData
  });

  
  const categoriesDB = await db.category.findMany();
  
  const categoriesMap = categoriesDB.reduce( (map, category) => {
    map[ category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); //<string=shirt, string=categoryID>
  
  

  // Productos

  products.forEach( async(product) => {

    const { type, images, ...rest } = product;

    const dbProduct = await db.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })


    // Images
    const imagesData = images.map( image => ({
      url: image,
      productId: dbProduct.id
    }));

    await db.productImage.createMany({
      data: imagesData
    });

  });





  console.log( 'Seed ejecutado correctamente' );
}









( () => {

  if ( process.env.NODE_ENV === 'production' ) return;


  main();
} )();