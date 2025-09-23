
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Pizza } from '../types';
import { colors, commonStyles } from '../styles/commonStyles';

interface PizzaCardProps {
  pizza: Pizza;
  onPress: () => void;
}

export default function PizzaCard({ pizza, onPress }: PizzaCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'classic':
        return colors.primary;
      case 'specialty':
        return colors.accent;
      case 'vegetarian':
        return colors.secondary;
      default:
        return colors.textLight;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: pizza.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{pizza.name}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(pizza.category) }]}>
            <Text style={styles.categoryText}>{pizza.category}</Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {pizza.description}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>From ${pizza.basePrice.toFixed(2)}</Text>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    fontFamily: 'Montserrat_600SemiBold',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.backgroundAlt,
    textTransform: 'capitalize',
    fontFamily: 'OpenSans_500Medium',
  },
  description: {
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'OpenSans_400Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'Montserrat_700Bold',
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: colors.backgroundAlt,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold',
  },
});
