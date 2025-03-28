//export const revalidate = 60; // 60 segundos
export const dynamic = 'force-dynamic';  

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';

import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';



interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string; 
  }
}


export default async function GenderByPage({ params, searchParams }: Props) {

  // Esperar a que los parámetros se resuelvan
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const { gender } = resolvedParams;
  //const { gender } = params; // es como estaba

  //const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1; 

  //const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ 
  const { products, totalPages } = await getPaginatedProductsWithImages({ 
    page, 
    gender: gender as Gender,
  });


  if ( products.length === 0 ) {
    redirect(`/gender/${ gender }`);
  }
  

  const labels: Record<string, string>  = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'dif generos'
  }

  // if ( id === 'kids' ) {
  //   notFound();
  // }


  return (
    <>
      <Title
        title={`Artículos de ${ labels[gender] }`}
        subtitle="Los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />

      <Pagination totalPages={ totalPages }  />
      
    </>
  );
}