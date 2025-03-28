
export * from './address/delete-user-address';
export * from './address/get-user-address';
export * from './address/set-user-address';

// Esquema seguridad del video original
//export * from './auth/login';
//export * from './auth/logout';
//export * from './auth/register';

// Esquema segridad del video de seguridad auth V5
export * from './auth/auth-actions';

export * from './category/get-categories';

export * from './country/get-countries';

export * from './order/place-order';
export * from './order/get-order-by-id';
export * from './order/get-paginated-orders';
export * from './order/get-orders-by-user';



export * from './product/delete-product-image';
export * from './product/create-update-product';
export * from './product/get-product-by-slug';
export * from './product/get-stock-by-slug';
export * from './product/product-pagination';


export * from './user/change-user-role';
export * from './user/get-paginater-users';