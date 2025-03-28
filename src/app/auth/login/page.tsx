import FormLogin from "@/components/auth/form-login";

export default async function LoginPage(
  { searchParams, }: { searchParams: { verified: string; error: string }; }) {
  //const isVerified = searchParams.verified === "true";
  //const OAuthAccountNotLinked = searchParams.error === "OAuthAccountNotLinked";

  // Espera a que searchParams esté resuelto
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const isVerified = resolvedSearchParams.verified === "true";
  const OAuthAccountNotLinked =
    resolvedSearchParams.error === "OAuthAccountNotLinked";

  return (
    <FormLogin
      isVerified={isVerified}
      OAuthAccountNotLinked={OAuthAccountNotLinked}
    />
  );
};
