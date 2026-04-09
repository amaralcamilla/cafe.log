import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface EmptyStateProps {
  onAdd: () => void;
}

export function EmptyState({onAdd}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>☕</Text>
      <Text style={styles.title}>Nenhum café ainda</Text>
      <Text style={styles.message}>
        Comece registrando{'\n'}o seu primeiro café!
      </Text>
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.buttonText}>+ Adicionar Café</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F0E2D0',
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    color: '#9E7A5A',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
  },
  button: {
    backgroundColor: '#D4924A',
    paddingHorizontal: 32,
    paddingVertical: 15,
    borderRadius: 999,
  },
  buttonText: {
    color: '#0F0600',
    fontWeight: '700',
    fontSize: 15,
  },
});
