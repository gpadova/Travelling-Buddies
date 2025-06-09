import "react-native-get-random-values";
import "~/global.css";
import { makePersistedAdapter } from "@livestore/adapter-expo";
import { LiveStoreProvider } from "@livestore/react";
import { makeCfSync } from "@livestore/sync-cf";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Appearance, Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Text } from "~/components/ui/text";
import { events, schema, tables } from "~/livestore/schema";
import { Button } from "~/components/ui/button";
import { unstable_batchedUpdates as batchUpdates } from "react-native";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export { ErrorBoundary } from "expo-router";

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

const storeId = process.env.EXPO_PUBLIC_STORE_ID;
const syncUrl = process.env.EXPO_PUBLIC_SYNC_URL;

const adapter = makePersistedAdapter({
  sync: { backend: syncUrl ? makeCfSync({ url: syncUrl }) : undefined },
});

export default function RootLayout() {
  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();
  const [, rerender] = React.useState({});
  const queryClient = new QueryClient();
  return (
    <LiveStoreProvider
      schema={schema}
      adapter={adapter}
      storeId={storeId}
      syncPayload={{ authToken: "insecure-token-change-me" }}
      renderLoading={(_) => <Text>Loading LiveStore ({_.stage})...</Text>}
      renderError={(error: any) => <Text>Error: {error.toString()}</Text>}
      renderShutdown={() => {
        return (
          <View>
            <Text>LiveStore Shutdown</Text>
            <Button onPress={() => rerender({})}>Reload</Button>
          </View>
        );
      }}
      batchUpdates={batchUpdates}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="index"
              options={{
                title: "Travel Buddies",
                headerRight: () => <ThemeToggle />,
              }}
            />
          </Stack>
          <PortalHost />
        </ThemeProvider>
      </QueryClientProvider>
    </LiveStoreProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.add("bg-background");
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);
}

function noop() {}
