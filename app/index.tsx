
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useCart } from '../hooks/useCart';
import BottomTabBar from '../components/BottomTabBar';
import PizzaCard from '../components/PizzaCard';
import CartItem from '../components/CartItem';
import SimpleBottomSheet from '../components/BottomSheet';
import { pizzas, pizzaSizes } from '../data/pizzas';
import { Pizza, PizzaSize } from '../types';
import { useFonts, OpenSans_400Regular, OpenSans_500Medium, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import { Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';

export default function PizzaShopApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>(pizzaSizes[0]);
  const [isCustomizeVisible, setIsCustomizeVisible] = useState(false);
  
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={commonStyles.content}>
          <Text style={commonStyles.text}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handlePizzaPress = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setSelectedSize(pizzaSizes[0]);
    setIsCustomizeVisible(true);
    console.log('Selected pizza:', pizza.name);
  };

  const handleAddToCart = () => {
    if (selectedPizza) {
      addToCart(selectedPizza, selectedSize, 1);
      setIsCustomizeVisible(false);
      setSelectedPizza(null);
    }
  };

  const renderHomeScreen = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Juma Anderson</Text>
        <Text style={styles.heroSubtitle}>Authentic Italian Pizza</Text>
        <Text style={styles.heroLocation}>📍 Watamu</Text>
        <Text style={styles.heroDescription}>
          Fresh ingredients, traditional recipes, and a passion for perfection
        </Text>
        
        <View style={styles.heroButtons}>
          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => setActiveTab('menu')}
          >
            <Text style={styles.heroButtonText}>View Menu</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.heroButtonSecondary}
            onPress={() => setActiveTab('about')}
          >
            <Text style={styles.heroButtonSecondaryText}>About Us</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Choose Us?</Text>
        
        <View style={styles.featureGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🍕</Text>
            <Text style={styles.featureTitle}>Fresh Ingredients</Text>
            <Text style={styles.featureText}>Daily fresh ingredients sourced locally</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🚚</Text>
            <Text style={styles.featureTitle}>Fast Delivery</Text>
            <Text style={styles.featureText}>Hot pizza delivered in 30 minutes</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>👨‍🍳</Text>
            <Text style={styles.featureTitle}>Expert Chefs</Text>
            <Text style={styles.featureText}>Traditional Italian recipes</Text>
          </View>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>⭐</Text>
            <Text style={styles.featureTitle}>5-Star Rated</Text>
            <Text style={styles.featureText}>Loved by our customers</Text>
          </View>
        </View>
      </View>

      {/* Quick Contact Section */}
      <View style={styles.quickContactSection}>
        <Text style={styles.quickContactTitle}>Visit Us Today!</Text>
        <View style={styles.quickContactInfo}>
          <Text style={styles.quickContactText}>📍 Watamu, Kenya</Text>
          <Text style={styles.quickContactText}>📞 +254 700 123 456</Text>
          <Text style={styles.quickContactText}>🕒 Open Daily 11AM - 10PM</Text>
        </View>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => setActiveTab('about')}
        >
          <Text style={styles.contactButtonText}>Get Directions & More</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderMenuScreen = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.menuHeader}>
        <Text style={styles.sectionTitle}>Our Menu</Text>
        <Text style={styles.sectionSubtitle}>Choose from our delicious selection</Text>
      </View>
      
      <View style={styles.menuContent}>
        {pizzas.map((pizza) => (
          <PizzaCard
            key={pizza.id}
            pizza={pizza}
            onPress={() => handlePizzaPress(pizza)}
          />
        ))}
      </View>
    </ScrollView>
  );

  const renderCartScreen = () => (
    <View style={styles.cartContainer}>
      <Text style={styles.sectionTitle}>Your Cart</Text>
      
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartIcon}>🛒</Text>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => setActiveTab('menu')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.cartItems} showsVerticalScrollIndicator={false}>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </ScrollView>
          
          <View style={styles.cartSummary}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalAmount}>${getTotalPrice().toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  const renderOrdersScreen = () => (
    <View style={styles.ordersContainer}>
      <Text style={styles.sectionTitle}>Order History</Text>
      <View style={styles.emptyOrders}>
        <Text style={styles.emptyOrdersIcon}>📋</Text>
        <Text style={styles.emptyOrdersText}>No orders yet</Text>
        <Text style={styles.emptyOrdersSubtext}>
          Your order history will appear here
        </Text>
      </View>
    </View>
  );

  const renderAboutScreen = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.aboutHeader}>
        <Text style={styles.sectionTitle}>About Juma Anderson</Text>
        <Text style={styles.sectionSubtitle}>Authentic Italian Pizza in Beautiful Watamu</Text>
      </View>

      {/* Watamu Gallery Section */}
      <View style={styles.gallerySection}>
        <Text style={styles.galleryTitle}>Beautiful Watamu, Kenya</Text>
        <Text style={styles.gallerySubtitle}>Where our delicious pizzas are made</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
          <View style={styles.galleryContainer}>
            <View style={styles.imageCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop' }}
                style={styles.galleryImage}
                resizeMode="cover"
              />
              <Text style={styles.imageCaption}>Watamu Beach</Text>
            </View>
            
            <View style={styles.imageCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop' }}
                style={styles.galleryImage}
                resizeMode="cover"
              />
              <Text style={styles.imageCaption}>Coastal Paradise</Text>
            </View>
            
            <View style={styles.imageCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop' }}
                style={styles.galleryImage}
                resizeMode="cover"
              />
              <Text style={styles.imageCaption}>Ocean Views</Text>
            </View>
            
            <View style={styles.imageCard}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' }}
                style={styles.galleryImage}
                resizeMode="cover"
              />
              <Text style={styles.imageCaption}>Tropical Beauty</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Contact Information Section */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Get in Touch</Text>
        <Text style={styles.contactSubtitle}>We&apos;d love to hear from you!</Text>
        
        <View style={styles.contactCard}>
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📍</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Location</Text>
              <Text style={styles.contactValue}>Watamu, Kenya</Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>📞</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>+254 700 123 456</Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>✉️</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>info@jumaanderson.co.ke</Text>
            </View>
          </View>
          
          <View style={styles.contactItem}>
            <Text style={styles.contactIcon}>🕒</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Hours</Text>
              <Text style={styles.contactValue}>Mon-Sun: 11:00 AM - 10:00 PM</Text>
            </View>
          </View>
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.socialTitle}>Follow Us</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>📘</Text>
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>📷</Text>
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>🐦</Text>
              <Text style={styles.socialText}>Twitter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Story Section */}
      <View style={styles.storySection}>
        <Text style={styles.storyTitle}>Our Story</Text>
        <Text style={styles.storyText}>
          Located in the beautiful coastal town of Watamu, Kenya, Juma Anderson brings authentic Italian pizza to the heart of East Africa. Our passion for traditional recipes combined with the freshest local ingredients creates an unforgettable dining experience.
        </Text>
        <Text style={styles.storyText}>
          From our wood-fired ovens to your table, every pizza is crafted with love and attention to detail. Come taste the difference that passion makes!
        </Text>
      </View>
    </ScrollView>
  );

  const renderCustomizeSheet = () => (
    <SimpleBottomSheet
      isVisible={isCustomizeVisible}
      onClose={() => setIsCustomizeVisible(false)}
    >
      {selectedPizza && (
        <View style={styles.customizeContent}>
          <Text style={styles.customizeTitle}>{selectedPizza.name}</Text>
          <Text style={styles.customizeDescription}>{selectedPizza.description}</Text>
          
          <Text style={styles.sizeTitle}>Choose Size:</Text>
          <View style={styles.sizeOptions}>
            {pizzaSizes.map((size) => (
              <TouchableOpacity
                key={size.id}
                style={[
                  styles.sizeOption,
                  selectedSize.id === size.id && styles.selectedSizeOption
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[
                  styles.sizeOptionText,
                  selectedSize.id === size.id && styles.selectedSizeOptionText
                ]}>
                  {size.name}
                </Text>
                <Text style={[
                  styles.sizePrice,
                  selectedSize.id === size.id && styles.selectedSizePrice
                ]}>
                  ${(selectedPizza.basePrice * size.multiplier).toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>
              Add to Cart - ${(selectedPizza.basePrice * selectedSize.multiplier).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SimpleBottomSheet>
  );

  const renderCurrentScreen = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeScreen();
      case 'menu':
        return renderMenuScreen();
      case 'cart':
        return renderCartScreen();
      case 'orders':
        return renderOrdersScreen();
      case 'about':
        return renderAboutScreen();
      default:
        return renderHomeScreen();
    }
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.content}>
        {renderCurrentScreen()}
      </View>
      
      <BottomTabBar
        activeTab={activeTab}
        onTabPress={setActiveTab}
        cartItemCount={getTotalItems()}
      />
      
      {renderCustomizeSheet()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.backgroundAlt,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Montserrat_800ExtraBold',
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.backgroundAlt,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Montserrat_600SemiBold',
  },
  heroLocation: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.backgroundAlt,
    textAlign: 'center',
    marginBottom: 12,
    opacity: 0.9,
    fontFamily: 'OpenSans_500Medium',
  },
  heroDescription: {
    fontSize: 16,
    color: colors.backgroundAlt,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.9,
    fontFamily: 'OpenSans_400Regular',
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  heroButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
  },
  heroButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold',
  },
  heroButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.backgroundAlt,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    flex: 1,
    alignItems: 'center',
  },
  heroButtonSecondaryText: {
    color: colors.backgroundAlt,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Montserrat_700Bold',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'OpenSans_400Regular',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Montserrat_600SemiBold',
  },
  featureText: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    fontFamily: 'OpenSans_400Regular',
  },
  menuHeader: {
    padding: 20,
    alignItems: 'center',
  },
  menuContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cartContainer: {
    flex: 1,
    padding: 20,
  },
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'Montserrat_600SemiBold',
  },
  shopButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 16,
  },
  shopButtonText: {
    color: colors.backgroundAlt,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold',
  },
  cartItems: {
    flex: 1,
  },
  cartSummary: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    marginTop: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'Montserrat_600SemiBold',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: 'Montserrat_700Bold',
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: colors.backgroundAlt,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold',
  },
  ordersContainer: {
    flex: 1,
    padding: 20,
  },
  emptyOrders: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyOrdersIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyOrdersText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'Montserrat_600SemiBold',
  },
  emptyOrdersSubtext: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    fontFamily: 'OpenSans_400Regular',
  },
  customizeContent: {
    padding: 20,
  },
  customizeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'Montserrat_700Bold',
  },
  customizeDescription: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 20,
    lineHeight: 24,
    fontFamily: 'OpenSans_400Regular',
  },
  sizeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    fontFamily: 'Montserrat_600SemiBold',
  },
  sizeOptions: {
    marginBottom: 24,
  },
  sizeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: 8,
  },
  selectedSizeOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  sizeOptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    fontFamily: 'OpenSans_500Medium',
  },
  selectedSizeOptionText: {
    color: colors.primary,
    fontWeight: '600',
  },
  sizePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    fontFamily: 'Montserrat_600SemiBold',
  },
  selectedSizePrice: {
    color: colors.primary,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: colors.backgroundAlt,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold',
  },
  // About Screen Styles
  aboutHeader: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  gallerySection: {
    padding: 20,
  },
  galleryTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Montserrat_700Bold',
  },
  gallerySubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'OpenSans_400Regular',
  },
  galleryScroll: {
    marginHorizontal: -20,
  },
  galleryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  imageCard: {
    marginRight: 16,
    alignItems: 'center',
  },
  galleryImage: {
    width: 280,
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  imageCaption: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
    fontFamily: 'OpenSans_500Medium',
  },
  contactSection: {
    padding: 20,
    backgroundColor: colors.backgroundAlt,
  },
  contactTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Montserrat_700Bold',
  },
  contactSubtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'OpenSans_400Regular',
  },
  contactCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactIcon: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textLight,
    marginBottom: 2,
    fontFamily: 'OpenSans_500Medium',
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'OpenSans_600SemiBold',
  },
  socialSection: {
    alignItems: 'center',
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  socialButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.card,
    minWidth: 80,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  socialIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  socialText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    fontFamily: 'OpenSans_500Medium',
  },
  storySection: {
    padding: 20,
    backgroundColor: colors.background,
  },
  storyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Montserrat_700Bold',
  },
  storyText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'OpenSans_400Regular',
  },
  // Quick Contact Section
  quickContactSection: {
    backgroundColor: colors.secondary,
    padding: 20,
    alignItems: 'center',
  },
  quickContactTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.backgroundAlt,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Montserrat_700Bold',
  },
  quickContactInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  quickContactText: {
    fontSize: 16,
    color: colors.backgroundAlt,
    marginBottom: 8,
    fontFamily: 'OpenSans_500Medium',
    fontWeight: '500',
  },
  contactButton: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  contactButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold',
  },
});
