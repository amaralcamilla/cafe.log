import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>☕</Text>
      <View>
        <Text style={styles.title}>Café.log</Text>
        <Text style={styles.subtitle}>seu diário de cafés</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#4A2614',
  },
  logo: {
    fontSize: 42,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#F0E2D0',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 12,
    color: '#9E7A5A',
    letterSpacing: 1.2,
    marginTop: 2,
  },
});
