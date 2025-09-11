import React from "react";
import { StyleSheet, Text, View } from "react-native";

type props = {
  spent: number;
  monthlyBudget: number;
};

export default function Dashboard({ spent, monthlyBudget }: props){

  return(
    <View style={styles.container}>
      <Text style={styles.text}>Spent: ${spent}</Text>
      <Text style={styles.text}>Monthly Budget: ${monthlyBudget}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",  
    marginTop: 40,           
    padding: 20,             
    borderWidth: 1,           
    borderColor: "#000",      
    borderRadius: 12,        
    backgroundColor: "#fff",           
  },
  text: {
    fontSize: 20,
    marginBottom: 6,
  },
});