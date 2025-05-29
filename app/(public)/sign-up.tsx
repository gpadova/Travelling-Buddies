import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";

export default function SignUp() {
  return (
    <>
      <Input className="w-full" placeholder="Name" />
      <Input className="w-full" placeholder="Last Name" />
      <Input
        className="w-full"
        placeholder="Email"
        textContentType="emailAddress"
      />
      <Input
        className="w-full"
        placeholder="Password"
        textContentType="password"
      />
      <Button className="w-full">
        <Text>Sign Up</Text>
      </Button>
      <Link href="/sign-up" className="underline text-blue-400" asChild>
        <Text>Already have an account?</Text>
      </Link>
    </>
  );
}
