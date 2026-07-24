import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Footer from "./src/common/footer/footer";
import {APP_ROUTES,AppRouteKey,DEFAULT_ROUTE,MainTabKey,TAB_DEFAULT_ROUTES,} from "./src/routes/app_routes";

export default function App() {
  const [routeKey, setRouteKey] = useState<AppRouteKey>(DEFAULT_ROUTE);
  const activeRoute = APP_ROUTES[routeKey];
  const handleTabPress = (key: MainTabKey) => {
    setRouteKey(TAB_DEFAULT_ROUTES[key]);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          {activeRoute.render(setRouteKey)}
        </View>
        <Footer active={activeRoute.tab} onTabPress={handleTabPress} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14121f",
  },
  content: {
    flex: 1,
  },
});
