import React, {useState, useEffect} from 'react';
import {
  Modal,
  Pressable,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Coffee, CoffeeInput, CoffeeType, Roast, Rating} from '../types/coffee';

const COFFEE_TYPES: CoffeeType[] = [
  'Coado',
  'Espresso',
  'Cappuccino',
  'Latte',
  'Americano',
  'Cold Brew',
  'Macchiato',
];

const ROASTS: Roast[] = ['Clara', 'Média', 'Escura'];

const DEFAULT_FORM: CoffeeInput = {
  brand: '',
  type: 'Espresso',
  rating: 0,
  roast: 'Média',
  comment: '',
};

interface CoffeeFormProps {
  visible: boolean;
  coffee: Coffee | null;
  onSave: (id: string | null, input: CoffeeInput) => void;
  onClose: () => void;
}

export function CoffeeForm({visible, coffee, onSave, onClose}: CoffeeFormProps) {
  const [form, setForm] = useState<CoffeeInput>(DEFAULT_FORM);

  useEffect(() => {
    if (coffee) {
      setForm({
        brand: coffee.brand,
        type: coffee.type,
        rating: coffee.rating,
        roast: coffee.roast,
        comment: coffee.comment,
      });
    } else {
      setForm(DEFAULT_FORM);
    }
  }, [coffee, visible]);

  function handleSave() {
    if (!form.brand.trim()) return;
    onSave(coffee?.id ?? null, form);
    onClose();
  }

  function handleStarPress(star: Rating) {
    setForm(f => ({...f, rating: f.rating === star ? 0 : star}));
  }

  const isEditing = coffee !== null;
  const canSave = form.brand.trim().length > 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent>

      <Pressable style={[StyleSheet.absoluteFill, styles.overlay]} onPress={onClose} />


      <KeyboardAvoidingView
        style={styles.sheetWrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        pointerEvents="box-none">
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <Text style={styles.title}>
            {isEditing ? 'Editar Café' : 'Novo Café ☕'}
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            <Text style={styles.label}>Marca</Text>
            <TextInput
              style={styles.input}
              value={form.brand}
              onChangeText={brand => setForm(f => ({...f, brand}))}
              placeholder="ex: Illy, Starbucks, Três Corações..."
              placeholderTextColor="#9b6548"
              autoCapitalize="words"
            />

            <Text style={styles.label}>Tipo</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.pillList}>
              {COFFEE_TYPES.map(type => (
                <TouchableOpacity
                  key={type}
                  style={[styles.pill, form.type === type && styles.pillSelected]}
                  onPress={() => setForm(f => ({...f, type}))}>
                  <Text
                    style={[
                      styles.pillText,
                      form.type === type && styles.pillTextSelected,
                    ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.label}>Nota</Text>
            <View style={styles.starsRow}>
              {([1, 2, 3, 4, 5] as Rating[]).map(star => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleStarPress(star)}
                  hitSlop={{top: 8, bottom: 8, left: 4, right: 4}}>
                  <Text style={styles.star}>
                    {star <= form.rating ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Torra</Text>
            <View style={styles.pillList}>
              {ROASTS.map(roast => (
                <TouchableOpacity
                  key={roast}
                  style={[styles.pill, form.roast === roast && styles.pillSelected]}
                  onPress={() => setForm(f => ({...f, roast}))}>
                  <Text
                    style={[
                      styles.pillText,
                      form.roast === roast && styles.pillTextSelected,
                    ]}>
                    {roast}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Comentário</Text>
            <TextInput
              style={[styles.input, styles.commentInput]}
              value={form.comment}
              onChangeText={comment => setForm(f => ({...f, comment}))}
              placeholder="Notas de sabor, aroma, textura..."
              placeholderTextColor="#9b6548"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </ScrollView>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveBtn, !canSave && styles.saveBtnDisabled]}
              onPress={handleSave}
              disabled={!canSave}>
              <Text style={styles.saveText}>
                {isEditing ? 'Salvar' : 'Adicionar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  sheetWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#603c2a',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#9b6548',
    maxHeight: '90%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#9b6548',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#eae0ce',
    marginBottom: 22,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#a5d4b6',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#eae0ce',
    borderWidth: 1,
    borderColor: '#9b6548',
    borderRadius: 12,
    padding: 14,
    color: '#563a3a',
    fontSize: 16,
  },
  commentInput: {
    minHeight: 90,
  },
  pillList: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 4,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#084c4d',
  },
  pillSelected: {
    backgroundColor: '#dda970',
  },
  pillText: {
    color: '#eae0ce',
    fontWeight: '600',
    fontSize: 14,
  },
  pillTextSelected: {
    color: '#0F0600',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  star: {
    fontSize: 34,
    color: '#dda970',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#9b6548',
    alignItems: 'center',
  },
  cancelText: {
    color: '#a5d4b6',
    fontWeight: '600',
    fontSize: 15,
  },
  saveBtn: {
    flex: 2,
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: '#1d8d8f',
    alignItems: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: '#084c4d',
  },
  saveText: {
    color: '#eae0ce',
    fontWeight: '700',
    fontSize: 15,
  },
});
