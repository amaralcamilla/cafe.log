import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface EmptyStateProps {
  onAdd: () => void;
}

export function EmptyState({onAdd}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>☕</Text>
      <Text style={styles.title}>Tá faltando combustível{'\n'}para codar :(</Text>
      <Text style={styles.message}>
        Registre seu primeiro café
      </Text>
      <TouchableOpacity style={styles.button} onPress={onAdd}>
        <Text style={styles.buttonText}>+ Adicionar café</Text>
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
    color: '#eae0ce',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#a5d4b6',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
  },
  button: {
    backgroundColor: '#1d8d8f',
    paddingHorizontal: 32,
    paddingVertical: 15,
    borderRadius: 999,
  },
  buttonText: {
    color: '#eae0ce',
    fontWeight: '700',
    fontSize: 15,
  },
});
