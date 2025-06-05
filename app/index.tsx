import { Redirect } from "expo-router";
import { Text } from "~/components/ui/text";

export default function Screen() {
  const isAuth = 1 === 1;
  if (isAuth) {
    return <Redirect href={"/(public)/sign-in"} />;
  }
  return (
    <>
      <Text>Banana</Text>
    </>
  );
}
