/**
 * @component TerminalOverlay
 * @description Modal de confirmación de alto impacto con estética de alerta de sistema.
 * * @param {boolean} visible - Controla la visibilidad del modal.
 * @param {string} title - Título de la alerta (ej: SECURITY_BREACH).
 * @param {string} message - Descripción de la acción necesaria.
 * @param {function} onConfirm - Acción al presionar EXECUTE.
 * @param {function} onCancel - Acción al presionar ABORT.
 */

import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { theme } from '../utils/theme';

export const TerminalOverlay = ({ 
  visible, 
  title = "SYSTEM_MESSAGE", 
  message, 
  onConfirm, 
  onCancel,
  variant = "green" 
}) => {
  const color = theme.colors[variant] || theme.colors.green;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.modalBox, { borderColor: color, ...theme.glow(color) }]}>
          
          {/* HEADER: Estilo de pestaña de sistema antiguo */}
          <View style={[styles.header, { backgroundColor: color }]}>
            <Text style={styles.headerText}>!! {title} !!</Text>
          </View>

          {/* BODY */}
          <View style={styles.content}>
            <Text style={[styles.message, { color }]}>{message}</Text>
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.buttonRow}>
            {onCancel && (
              <TouchableOpacity onPress={onCancel} style={styles.button}>
                <Text style={[styles.buttonText, { color, opacity: 0.5 }]}>[ ABORT ]</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={[styles.buttonText, { color, fontWeight: 'bold' }]}>[ EXECUTE ]</Text>
            </TouchableOpacity>
          </View>
          
          {/* DECORATIVE CORNERS: Estética de retícula [+] */}
          <Text style={[styles.corner, styles.tl, { color }]}>+</Text>
          <Text style={[styles.corner, styles.tr, { color }]}>+</Text>
          <Text style={[styles.corner, styles.bl, { color }]}>+</Text>
          <Text style={[styles.corner, styles.br, { color }]}>+</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Fondo más oscuro para enfoque total
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  modalBox: {
    width: '100%',
    backgroundColor: '#000',
    borderWidth: 1,
    padding: 25,
    position: 'relative',
  },
  header: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginBottom: 20,
    marginTop: -35,
  },
  headerText: {
    fontFamily: 'Courier New',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  message: {
    fontFamily: 'Courier New',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Courier New',
    fontSize: 13,
    letterSpacing: 1,
  },
  corner: { position: 'absolute', fontSize: 16, fontFamily: 'Courier New' },
  tl: { top: 5, left: 5 },
  tr: { top: 5, right: 5 },
  bl: { bottom: 5, left: 5 },
  br: { bottom: 5, right: 5 },
});