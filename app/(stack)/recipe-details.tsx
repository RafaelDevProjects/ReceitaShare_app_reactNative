import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Recipe } from '../src/types/Recipe';

export default function RecipeDetails() {
  const { recipe } = useLocalSearchParams();
  
  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Receita não encontrada</Text>
      </View>
    );
  }

  const recipeData: Recipe = JSON.parse(recipe as string);

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Detalhes da Receita',
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
        }} 
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.name}>{recipeData.name}</Text>
          
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>⏱</Text>
              <Text style={styles.detailLabel}>Tempo de Preparo</Text>
              <Text style={styles.detailValue}>{recipeData.prepTime} minutos</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>❄️</Text>
              <Text style={styles.detailLabel}>Armazenamento</Text>
              <Text style={styles.detailValue}>
                {recipeData.needsRefrigeration ? 'Geladeira' : 'Ambiente'}
              </Text>
            </View>
          </View>

          <View style={styles.ingredientsSection}>
            <Text style={styles.sectionTitle}>📋 Ingredientes</Text>
            <View style={styles.ingredientsList}>
              {recipeData.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.ingredientBullet}>•</Text>
                  <Text style={styles.ingredient}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    alignItems: 'center',
    flex: 1,
  },
  detailIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  ingredientsSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  ingredientsList: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ingredientBullet: {
    fontSize: 16,
    color: '#2196F3',
    marginRight: 8,
    marginTop: 1,
  },
  ingredient: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    flex: 1,
  },
});