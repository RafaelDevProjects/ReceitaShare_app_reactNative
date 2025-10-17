import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types/Recipe';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecipes = async () => {
    try {
      setLoading(true);
      const storedRecipes = await AsyncStorage.getItem('@recipes');
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      } else {
        setRecipes([]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as receitas');
    } finally {
      setLoading(false);
    }
  };

  const addRecipe = async (newRecipe: Recipe) => {
    try {
      const updatedRecipes = [...recipes, newRecipe];
      await AsyncStorage.setItem('@recipes', JSON.stringify(updatedRecipes));
      setRecipes(updatedRecipes);
      return true;
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a receita');
      return false;
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  return { recipes, loading, loadRecipes, addRecipe };
};