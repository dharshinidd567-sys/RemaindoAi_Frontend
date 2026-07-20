import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Footer from "./src/common/footer/footer";
import TaskScreen from "./src/screens/home/task_page/task_screen";

export default function App() {
  const [showTaskScreen, setShowTaskScreen] = useState(false);

  const handleTaskPress = () => {
    setShowTaskScreen(true);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          {showTaskScreen ? (
            <TaskScreen />
          ) : (
            <View style={styles.homeContent}>
              <Text style={styles.homeText}>Home Screen</Text>
            </View>
          )}
        </View>

        <Footer onTaskPress={handleTaskPress} />
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
  homeContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  homeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#b9a6ff",
  },
});