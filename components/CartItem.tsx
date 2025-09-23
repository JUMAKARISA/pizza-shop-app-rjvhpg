
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CartItem as CartItemType } from '../types';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.pizza.name}</Text>
          <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.removeButton}>
            <Icon name="close" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.size}>{item.size.name}</Text>
        
        {item.customToppings.length > 0 && (
          <Text style={styles.toppings}>
            Extra: {item.customToppings.join(', ')}
          </Text>
        )}
        
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
            >
              <Icon name="remove" size={16} color={colors.text} />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{item.quantity}</Text>
            
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              <Icon name="add" size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.price}>${item.totalPrice.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    fontFamily: 'Montserrat_600SemiBold',
  },
  removeButton: {
    padding: 4,
  },
  size: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
    fontFamily: 'OpenSans_400Regular',
  },
  toppings: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 8,
    fontStyle: 'italic',
    fontFamily: 'OpenSans_400Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 12,
    fontFamily: 'Montserrat_600SemiBold',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'Montserrat_700Bold',
  },
});
