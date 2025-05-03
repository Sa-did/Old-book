import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const categories = ['All', 'Fiction', 'Non-Fiction', 'Academic', 'Kids'];

const mockBooks = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 15.99,
    condition: 'Good',
    category: 'Fiction',
    image: 'https://api.a0.dev/assets/image?text=vintage%20book%20great%20gatsby%20cover%20art&seed=123',
    seller: 'John Doe'
  },
  {
    id: '2',
    title: 'Introduction to Physics',
    author: 'Richard Feynman',
    price: 29.99,
    condition: 'Like New',
    category: 'Academic',
    image: 'https://api.a0.dev/assets/image?text=physics%20textbook%20cover%20professional&seed=124',
    seller: 'Alice Smith'
  },
  // Add more mock books as needed
];

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigation = useNavigation();

  const renderBookCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.bookCard}
      onPress={() => navigation.navigate('BookDetails', { book: item })}
    >
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
        <Text style={styles.bookPrice}>${item.price}</Text>
        <View style={styles.conditionContainer}>
          <MaterialIcons name="bookmark" size={16} color="#4CAF50" />
          <Text style={styles.condition}>{item.condition}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BookMarket</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SellBook')}>
          <MaterialIcons name="add-circle-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.selectedCategoryText,
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={selectedCategory === 'All' 
          ? mockBooks 
          : mockBooks.filter(book => book.category === selectedCategory)
        }
        renderItem={renderBookCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.booksList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  categoriesContainer: {
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: 'white',
  },
  booksList: {
    padding: 16,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  bookPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 8,
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  condition: {
    marginLeft: 4,
    fontSize: 14,
    color: '#4CAF50',
  },
});