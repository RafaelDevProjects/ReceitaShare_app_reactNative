import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Recipe } from '../types/Recipe';

interface Props {
  recipe: Recipe;
  onPress: () => void;
}

const RecipeCard: React.FC<Props> = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{recipe.name}</Text>
      <View style={styles.details}>
        <Text style={styles.prepTime}>
          ⏱ {recipe.prepTime} minutos
        </Text>
        {recipe.needsRefrigeration && (
          <Text style={styles.refrigeration}>❄️ Geladeira</Text>
        )}
      </View>
      <Text style={styles.ingredients} numberOfLines={2}>
        {recipe.ingredients.join(', ')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  prepTime: {
    fontSize: 14,
    color: '#666',
  },
  refrigeration: {
    fontSize: 14,
    color: '#2196F3',
  },
  ingredients: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
  },
});

export default RecipeCard;