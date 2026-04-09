import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Coffee} from '../types/coffee';

interface CoffeeCardProps {
  coffee: Coffee;
  onEdit: (coffee: Coffee) => void;
  onDelete: (id: string) => void;
}

function IntensityDots({level}: {level: number}) {
  return (
    <View style={styles.dotsRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <View
          key={i}
          style={[styles.dot, i <= level ? styles.dotFilled : styles.dotEmpty]}
        />
      ))}
    </View>
  );
}

export function CoffeeCard({coffee, onEdit, onDelete}: CoffeeCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{coffee.type}</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => onEdit(coffee)}>
            <Text style={styles.actionIcon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.deleteBtnBg]}
            onPress={() => onDelete(coffee.id)}>
            <Text style={styles.actionIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.brand}>{coffee.brand}</Text>

      <View style={styles.bottomRow}>
        <IntensityDots level={coffee.intensity} />
        <Text style={styles.dot_sep}>·</Text>
        <Text style={styles.quantity}>{coffee.quantity}g</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A0A02',
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4A2614',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#2A1005',
    borderWidth: 1,
    borderColor: '#6A3A1A',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeText: {
    color: '#D4924A',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#2A1505',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnBg: {
    backgroundColor: '#2A0805',
  },
  actionIcon: {
    fontSize: 15,
  },
  brand: {
    fontSize: 21,
    fontWeight: '700',
    color: '#F0E2D0',
    marginBottom: 14,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotFilled: {
    backgroundColor: '#D4924A',
  },
  dotEmpty: {
    backgroundColor: '#3D2010',
  },
  dot_sep: {
    color: '#5A3A22',
    fontSize: 18,
  },
  quantity: {
    color: '#9E7A5A',
    fontSize: 14,
    fontWeight: '500',
  },
});
