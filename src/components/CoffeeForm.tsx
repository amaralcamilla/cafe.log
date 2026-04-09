import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Coffee, CoffeeInput, CoffeeType, Intensity} from '../types/coffee';

const COFFEE_TYPES: CoffeeType[] = [
  'Espresso',
  'Cappuccino',
  'Latte',
  'Americano',
  'Cold Brew',
  'Macchiato',
];

const INTENSITIES: Intensity[] = [1, 2, 3, 4, 5];

const INTENSITY_LABELS: Record<Intensity, string> = {
  1: 'Suave',
  2: 'Leve',
  3: 'Médio',
  4: 'Forte',
  5: 'Intenso',
};

const DEFAULT_FORM: CoffeeInput = {
  brand: '',
  type: 'Espresso',
  intensity: 3,
  quantity: 250,
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
      const {id: _id, ...input} = coffee;
      setForm(input);
    } else {
      setForm(DEFAULT_FORM);
    }
  }, [coffee, visible]);

  function handleSave() {
    if (!form.brand.trim()) return;
    onSave(coffee?.id ?? null, form);
    onClose();
  }

  const isEditing = coffee !== null;
  const canSave = form.brand.trim().length > 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.sheetWrapper}>
          <View style={styles.sheet}>
            <View style={styles.handle} />

            <Text style={styles.title}>
              {isEditing ? 'Editar Café' : 'Novo Café ☕'}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Marca */}
              <Text style={styles.label}>Marca</Text>
              <TextInput
                style={styles.input}
                value={form.brand}
                onChangeText={brand => setForm(f => ({...f, brand}))}
                placeholder="ex: Illy, Três Corações..."
                placeholderTextColor="#5A3A22"
                autoCapitalize="words"
              />

              {/* Tipo */}
              <Text style={styles.label}>Tipo</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.typeList}>
                {COFFEE_TYPES.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typePill,
                      form.type === type && styles.typePillSelected,
                    ]}
                    onPress={() => setForm(f => ({...f, type}))}>
                    <Text
                      style={[
                        styles.typePillText,
                        form.type === type && styles.typePillTextSelected,
                      ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Intensidade */}
              <Text style={styles.label}>
                Intensidade — {INTENSITY_LABELS[form.intensity]}
              </Text>
              <View style={styles.intensityRow}>
                {INTENSITIES.map(level => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.intensityBtn,
                      form.intensity === level && styles.intensityBtnSelected,
                    ]}
                    onPress={() => setForm(f => ({...f, intensity: level}))}>
                    <Text style={styles.intensityIcon}>
                      {level <= form.intensity ? '☕' : '○'}
                    </Text>
                    <Text
                      style={[
                        styles.intensityNum,
                        form.intensity === level && styles.intensityNumSelected,
                      ]}>
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Quantidade */}
              <Text style={styles.label}>Quantidade (g)</Text>
              <TextInput
                style={styles.input}
                value={form.quantity > 0 ? form.quantity.toString() : ''}
                onChangeText={val =>
                  setForm(f => ({...f, quantity: Number(val) || 0}))
                }
                keyboardType="numeric"
                placeholder="250"
                placeholderTextColor="#5A3A22"
              />
            </ScrollView>

            {/* Ações */}
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  sheetWrapper: {
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#1A0A02',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#4A2614',
    maxHeight: '92%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#4A2614',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F0E2D0',
    marginBottom: 22,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9E7A5A',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#0F0600',
    borderWidth: 1,
    borderColor: '#4A2614',
    borderRadius: 12,
    padding: 14,
    color: '#F0E2D0',
    fontSize: 16,
  },
  typeList: {
    gap: 8,
    paddingRight: 4,
  },
  typePill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#0F0600',
    borderWidth: 1,
    borderColor: '#4A2614',
  },
  typePillSelected: {
    backgroundColor: '#D4924A',
    borderColor: '#D4924A',
  },
  typePillText: {
    color: '#9E7A5A',
    fontWeight: '600',
    fontSize: 14,
  },
  typePillTextSelected: {
    color: '#0F0600',
  },
  intensityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  intensityBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#0F0600',
    borderWidth: 1,
    borderColor: '#4A2614',
    gap: 6,
  },
  intensityBtnSelected: {
    borderColor: '#D4924A',
    backgroundColor: '#2A1505',
  },
  intensityIcon: {
    fontSize: 20,
  },
  intensityNum: {
    fontSize: 12,
    color: '#9E7A5A',
    fontWeight: '600',
  },
  intensityNumSelected: {
    color: '#D4924A',
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
    borderColor: '#4A2614',
    alignItems: 'center',
  },
  cancelText: {
    color: '#9E7A5A',
    fontWeight: '600',
    fontSize: 15,
  },
  saveBtn: {
    flex: 2,
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: '#D4924A',
    alignItems: 'center',
  },
  saveBtnDisabled: {
    backgroundColor: '#3D2010',
  },
  saveText: {
    color: '#0F0600',
    fontWeight: '700',
    fontSize: 15,
  },
});
