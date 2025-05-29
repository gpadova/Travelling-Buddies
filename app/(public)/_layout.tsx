import { View } from "react-native";
import { Image } from "react-native";
import { Slot } from "expo-router";

export default function SignIn() {
  return (
    <View className="flex-1 justify-center items-center px-8 gap-4">
      <Image
        source={require("../../assets/images/logos/generated-image.png")}
        className="size-48"
        style={{ height: 140, width: 300 }}
      />
      <Slot />
    </View>
  );
}
