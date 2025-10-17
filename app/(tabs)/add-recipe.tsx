import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Recipe, RecipeFormData } from '../../src/types/Recipe';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddRecipe() {
  const router = useRouter();
  const [formData, setFormData] = useState<RecipeFormData>({
    name: '',
    ingredients: '',
    prepTime: '',
    needsRefrigeration: false,
  });
  const [errors, setErrors] = useState<Partial<RecipeFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RecipeFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome da receita é obrigatório';
    }

    if (!formData.prepTime.trim()) {
      newErrors.prepTime = 'Tempo de preparo é obrigatório';
    } else {
      const prepTime = parseInt(formData.prepTime);
      if (isNaN(prepTime) || prepTime <= 0) {
        newErrors.prepTime = 'Tempo de preparo deve ser um número positivo';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const newRecipe: Recipe = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        ingredients: formData.ingredients
          .split(',')
          .map(ing => ing.trim())
          .filter(ing => ing.length > 0),
        prepTime: parseInt(formData.prepTime),
        needsRefrigeration: formData.needsRefrigeration,
      };

      const storedRecipes = await AsyncStorage.getItem('@recipes');
      const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
      const updatedRecipes = [...recipes, newRecipe];

      await AsyncStorage.setItem('@recipes', JSON.stringify(updatedRecipes));

      Alert.alert('Sucesso', 'Receita adicionada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setFormData({
              name: '',
              ingredients: '',
              prepTime: '',
              needsRefrigeration: false,
            });
            // Navega de volta para a lista e força atualização
            router.back();
          }
        }
      ]);
      
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a receita');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
        <Text style={styles.label}>Nome da Receita *</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Ex: Bolo de Chocolate"
          placeholderTextColor="#999"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Ingredientes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.ingredients}
          onChangeText={(text) => setFormData({ ...formData, ingredients: text })}
          placeholder="Separe os ingredientes por vírgula. Ex: Farinha, Ovos, Chocolate"
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Tempo de Preparo (minutos) *</Text>
        <TextInput
          style={[styles.input, errors.prepTime && styles.inputError]}
          value={formData.prepTime}
          onChangeText={(text) => setFormData({ ...formData, prepTime: text })}
          placeholder="Ex: 30"
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
        {errors.prepTime && (
          <Text style={styles.errorText}>{errors.prepTime}</Text>
        )}

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Precisa de geladeira?</Text>
          <Switch
            value={formData.needsRefrigeration}
            onValueChange={(value) =>
              setFormData({ ...formData, needsRefrigeration: value })
            }
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={formData.needsRefrigeration ? '#2196F3' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Adicionar Receita</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: -12,
    marginBottom: 16,
    marginLeft: 4,
  },
});