import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Coffee} from '../types/coffee';

interface CoffeeCardProps {
  coffee: Coffee;
  onEdit: (coffee: Coffee) => void;
  onDelete: (id: string) => void;
}

function StarRating({rating}: {rating: number}) {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <Text key={i} style={styles.star}>
          {i <= rating ? '★' : '☆'}
        </Text>
      ))}
    </View>
  );
}

export function CoffeeCard({coffee, onEdit, onDelete}: CoffeeCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.badges}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{coffee.type}</Text>
          </View>
          <View style={[styles.badge, styles.roastBadge]}>
            <Text style={styles.badgeText}>{coffee.roast}</Text>
          </View>
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

      <StarRating rating={coffee.rating} />

      {coffee.comment ? (
        <Text style={styles.comment} numberOfLines={2}>
          {coffee.comment}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4f2009',
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
  badges: {
    flexDirection: 'row',
    gap: 6,
    flexShrink: 1,
  },
  badge: {
    backgroundColor: '#2A1005',
    borderWidth: 1,
    borderColor: '#6A3A1A',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  roastBadge: {
    borderColor: '#4A2614',
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
    marginBottom: 10,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
  },
  star: {
    fontSize: 18,
    color: '#D4924A',
  },
  comment: {
    marginTop: 10,
    color: '#9E7A5A',
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
