import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Dashboard from "./pages/dashboard";


export default function Index() {
  const spent = 400;
  const monthlyBudget = 600;

  return (
     <View style={styles.screen}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Dashboard spent={spent} monthlyBudget={monthlyBudget} />
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,               // makes View fill the whole screen
    backgroundColor: "#ffffffff",
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",  // keep dashboards centered horizontally
  },
});