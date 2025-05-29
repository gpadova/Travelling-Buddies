import { Redirect } from "expo-router";
import { useUserSession } from "~/lib/query/useUserSession";

export default function Screen() {
  const { data: session } = useUserSession();
  console.log({ session });
  if (session) {
    <Redirect href="/(authenticated)" />;
  }
  return <Redirect href="/(public)/sign-in" />;
}
