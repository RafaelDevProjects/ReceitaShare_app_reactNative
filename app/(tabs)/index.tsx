import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Recipe } from '../../src/types/Recipe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecipeCard from '../../src/components/RecipeCard';

export default function AllRecipes() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Carrega as receitas quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      loadRecipes();
    }, [])
  );

  const loadRecipes = async () => {
    try {
      setRefreshing(true);
      const storedRecipes = await AsyncStorage.getItem('@recipes');
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      } else {
        setRecipes([]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as receitas');
    } finally {
      setRefreshing(false);
    }
  };

  const handleRecipePress = (recipe: Recipe) => {
    router.push({
      pathname: '/recipe-details',
      params: { recipe: JSON.stringify(recipe) }
    });
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => (
    <RecipeCard recipe={item} onPress={() => handleRecipePress(item)} />
  );

  return (
    <View style={styles.container}>
      {recipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Nenhuma receita cadastrada ainda!
          </Text>
          <Text style={styles.emptySubText}>
            Toque em "Adicionar Receita" para começar.
          </Text>
          <TouchableOpacity 
            style={styles.refreshButton} 
            onPress={loadRecipes}
          >
            <Text style={styles.refreshButtonText}>Atualizar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadRecipes}
              colors={['#2196F3']}
              tintColor={'#2196F3'}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#666',
  },
  emptySubText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});