export const dynamic = 'force-dynamic';    

export const revalidate = 60; // 60 segundos


import { redirect } from 'next/navigation';

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';


interface Props {
  searchParams?: {
    page?: string; 
  }
}


export default async function Home({ searchParams }: Props) {

  // Verificar si searchParams existe y tiene la clave 'page'
  //const page = searchParams?.page ? parseInt(searchParams.page, 10) || 1 : 1;

  //Asegurarte de esperar (await) las searchParams si estas vienen como promesa
  const resolvedSearchParams = await Promise.resolve(searchParams);       
  // Verificar si searchParams existe y tiene la clave 'page'
  const page = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page, 10) || 1 : 1;

  //const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });
  const { products, totalPages } = await getPaginatedProductsWithImages({ page });


  if ( products.length === 0 ) {
    redirect('/');
  }


  return (
    <>
      <Title
        title="Tienda"
        subtitle="Los productos"
        className="mb-2"
      />

      <ProductGrid 
        products={ products }
      />


      <Pagination totalPages={ totalPages } />
      
    </>
  );
}
