import React, {useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,} from 'react-native';
import {Coffee, CoffeeInput} from '../types/coffee';
import {useCoffees} from '../hooks/useCoffees';
import {Header} from '../components/Header';
import {CoffeeCard} from '../components/CoffeeCard';
import {CoffeeForm} from '../components/CoffeeForm';
import {EmptyState} from '../components/EmptyState';

export function HomeScreen() {
  const {coffees, add, edit, remove} = useCoffees();
  const [formVisible, setFormVisible] = useState(false);
  const [editingCoffee, setEditingCoffee] = useState<Coffee | null>(null);

  function handleAdd() {
    setEditingCoffee(null);
    setFormVisible(true);
  }

  function handleEdit(coffee: Coffee) {
    setEditingCoffee(coffee);
    setFormVisible(true);
  }

  function handleSave(id: string | null, input: CoffeeInput) {
    if (id) {
      edit(id, input);
    } else {
      add(input);
    }
  }

  function handleClose() {
    setFormVisible(false);
    setEditingCoffee(null);
  }

  const hasItems = coffees.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0600" />

      <Header />

      {hasItems && (
        <Text style={styles.counter}>
          {coffees.length} café{coffees.length !== 1 ? 's' : ''} registrado
          {coffees.length !== 1 ? 's' : ''}
        </Text>
      )}

      {hasItems ? (
        <FlatList
          data={coffees}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <CoffeeCard coffee={item} onEdit={handleEdit} onDelete={remove} />
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        <EmptyState onAdd={handleAdd} />
      )}

      {hasItems && (
        <TouchableOpacity style={styles.fab} onPress={handleAdd}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}

      <CoffeeForm
        visible={formVisible}
        coffee={editingCoffee}
        onSave={handleSave}
        onClose={handleClose}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0600',
  },
  counter: {
    color: '#a5d4b6',
    fontSize: 13,
    paddingHorizontal: 24,
    paddingVertical: 12,
    letterSpacing: 0.5,
  },
  list: {
    paddingTop: 8,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 24,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1d8d8f',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1d8d8f',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 10,
  },
  fabText: {
    color: '#eae0ce',
    fontSize: 30,
    fontWeight: '300',
    lineHeight: 34,
    marginTop: -2,
  },
});
