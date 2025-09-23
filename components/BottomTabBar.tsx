
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
  cartItemCount: number;
}

export default function BottomTabBar({ activeTab, onTabPress, cartItemCount }: BottomTabBarProps) {
  const tabs = [
    { id: 'home', name: 'Home', icon: 'home' as const },
    { id: 'menu', name: 'Menu', icon: 'restaurant' as const },
    { id: 'cart', name: 'Cart', icon: 'bag' as const },
    { id: 'about', name: 'About', icon: 'information-circle' as const },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => onTabPress(tab.id)}
        >
          <View style={styles.iconContainer}>
            <Icon
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? colors.primary : colors.textLight}
            />
            {tab.id === 'cart' && cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemCount}</Text>
              </View>
            )}
          </View>
          <Text
            style={[
              styles.tabText,
              { color: activeTab === tab.id ? colors.primary : colors.textLight }
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingBottom: 20,
    paddingTop: 8,
    boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'OpenSans_500Medium',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.backgroundAlt,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold',
  },
});
