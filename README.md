This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

# Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Descripción

Ruta git: https://github.com/JuanBravoGutierrez/teslo-shop.git

## Correr en dev

1. Clonar el repositorio.
2. Crear una copia del `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno.
3. Revisar que no sobren ni falten archivos, como el page en app que sobraba
4. Revisar todas las versiones en package-json porque estaban desactualizadas
5. Instalar npm i next-auth@beta
6. Ejecutar npx auth secret para sacar la palabra secreta para la seguridad. Si pide autorización para instalar paquete tipo auth@1.2.3 decirle que sí. seguramente creo la palabra secreta en .envlocal, llevarlo también a .env
7. // Mejor el anterior Obtener auth_secret para ENV desde: openssl rand -base64 32
8. Instalar zod (npm i zod)
9. Instalar npm i bcryptjs
10. npm i --sabe-dev @types/bcryptjs
11. Borrar el package-lock.json (se genera con npm install)
12. Borrar carpeta de node_modules (se genera con npm install)
13. npm i nanoid para el generador de tokens para la doble verificación de usuarios
14. npm i resend para manejador de envío de correos de verificación
15. En Resend ir a API Keys y crear una API KEY, se copia
16. En env se tiene una cuenta para las variables de entorno llamada AUTH_RESEND_KEY ="", ponerla entre comillas sin espacios
17. Cuando esté en producción poner URL de NEXTAUTH_URL="" para poner el http... del lugar donde deberá ir para verificar su correo para su contraseña
18. Instalar dependencias `npm install`
19. Ejecuté npm install @prisma/client @auth/prisma-adapter
20. Me marcaba errores en: import { Gender, Product, Size } from '@prisma/client';, es decir, importaciones de @prisma/client y por ello ejecuté: npx prisma generate, con eso se solucionó
21. Ejecuté npm install prisma --save-dev
22. Ejecuté npx prisma init para crear la carpeta Prisma y el archivo de schema.prisma, aunque esto ya existía, así que arrojó error
23. Verificar que esté instalado con npm list @auth/prisma-adapter, sino Instalar npm install @prisma/client @auth/prisma-adapter
24. Ejecutar npm install prisma --save-dev
25. docker login -u juanbravogutierrez
26. Levantar la base de datos en forma detach: docker compose up -d
27. Instalar herramienta envío: npm i resend
28. Para crear AUTH_RESEND_KEY de resend, ir a resend, tener cuenta, crear APP Key (en opción Add Keys), poner un nombre que sea, permisos "Full access" y dominios "All domains" y dar click a botón Add
29. Crear tablas, campos y correr migraciones según nuestro esquema de prisma: npx prisma migrate dev --name algoquedescribamigracion
30. Para ejecutar de mejor manera APis dinámicas de manera asíncrona ejecuté: npx @next/codemod@canary next-async-request-api .
31. Ejecutar seed `npm run seed`
32. Limpiar cache: npm cache clean --force
33. Correr el proyecto `npm run seed`
34. Limpiar el localStorage del navegador.
35. Borrar el package-lock.json y Borrar carpeta de node_modules (se generan con npm install)
    Instalé npm install @prisma/client
    Instalé npx prisma generate
36. npm install
    ejecuté npx prisma generate
    Lo anterior resolvió un error "@prisma/client"
37. ejecutar en desarrollo: npm run dev

## Correr en prod
