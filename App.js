import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [bmiHistory, setBMIHistory] = useState([]);
  const [showAbout, setShowAbout] = useState(false);

  const calculateBMI = () => {
    if (weight && height) {
      const weightKg = parseFloat(weight);
      const heightM = parseFloat(height) / 100;
      const calculatedBMI = (weightKg / (heightM * heightM)).toFixed(2);
      setBMI(calculatedBMI);
      setBMIHistory([...bmiHistory, calculatedBMI]);
      setWeight('');
      setHeight('');
    }
  };

  const deleteBMI = (index) => {
    const updatedBMIHistory = [...bmiHistory];
    updatedBMIHistory.splice(index, 1);
    setBMIHistory(updatedBMIHistory);
  };

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      <TouchableOpacity style={styles.aboutButton} onPress={toggleAbout}>
        <Text style={styles.aboutButtonText}>About Me</Text>
      </TouchableOpacity>

      {showAbout && (
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>
            A BMI (Body Mass Index) calculator is a tool used to estimate an individual's body fat based on their weight and height. It provides a numerical value that categorizes a person's body composition into different ranges, which are used to assess whether the person falls into the underweight, normal weight, overweight, or obese category. 

            Name : V.U.Jayakodi.
            Registration Number : ITT/2017/2018/035
            Index Number : 0772
          </Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter your weight (kg)"
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your height (cm)"
        value={height}
        onChangeText={(text) => setHeight(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
        <Text style={styles.calculateButtonText}>Calculate BMI</Text>
      </TouchableOpacity>
      
      {bmi && (
        <Text style={styles.result}>Your BMI: {bmi}</Text>
      )}

      <Text style={styles.historyTitle}>BMI History:</Text>
      <FlatList
        data={bmiHistory}
        renderItem={({ item, index }) => (
          <View style={styles.historyItem}>
            <Text>BMI: {item}</Text>
            <TouchableOpacity onPress={() => deleteBMI(index)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  calculateButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 8,
  },
  deleteButton: {
    color: 'red',
  },
  aboutButton: {
    alignSelf: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginBottom: 10,
  },
  aboutButtonText: {
    color: 'white',
  },
  
  aboutContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
  },
});
