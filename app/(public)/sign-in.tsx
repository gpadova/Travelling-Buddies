import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Link } from "expo-router";

export default function SignIn() {
  return (
    <>
      <Input className="w-full" placeholder="Email" />
      <Input className="w-full" placeholder="Password" />
      <Button className="w-full">
        <Text>Sign In</Text>
      </Button>
      <Link href="/sign-up" className="underline text-blue-400" asChild>
        <Text>Don't have an account?</Text>
      </Link>
    </>
  );
}
