import { Redirect } from "expo-router";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return <Redirect href={"/(public)/sign-in"} />;
}
