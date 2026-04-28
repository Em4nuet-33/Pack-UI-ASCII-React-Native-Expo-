/**
 * @component TerminalCard
 * @description Contenedor con bordes ASCII dinámicos, feedback táctil y 
 * animación de pulso. Es el bloque de construcción principal de la UI.
 * * @param {string} title - Texto que aparece en la etiqueta superior.
 * @param {string} variant - Esquema cromático: 'green', 'amber', 'alert'.
 * @param {string} borderType - Estilo ASCII: 'solid', 'hash', 'dots', 'glitch'.
 */

import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { theme } from '../utils/theme';

export const TerminalCard = ({ 
  title = "STATUS_REPORT", 
  children, 
  variant = "green", 
  borderType = "dots", 
  onPress 
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef(null);

  // Gestión de carga de Audio
  useEffect(() => {
    async function loadSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/beep.mp3'));
        soundRef.current = sound;
      } catch (e) { console.log("CardAudio: Error"); }
    }
    loadSound();
    return () => soundRef.current?.unloadAsync(); // Limpieza de memoria
  }, []);

  // Configuración de Variantes ASCII
  const borderVariants = {
    solid: { char: "═", corner: "╚", top: "═" },
    hash: { char: "%", corner: "§", top: "%" },
    dots: { char: "░", corner: "▒", top: "░" },
    glitch: { char: "X", corner: "Ø", top: "!" }
  };

  const selectedColor = theme.colors[variant] || theme.colors.green;
  const config = borderVariants[borderType] || borderVariants.solid;

  const handlePress = async () => {
    // Animación de pulso (Feedback Visual)
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.97, duration: 60, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 60, useNativeDriver: true }),
    ]).start();

    // Feedback Físico y Sonoro
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (soundRef.current) await soundRef.current.replayAsync();

    if (onPress) onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity 
        activeOpacity={0.85} 
        onPress={handlePress} 
        style={[
          styles.card, 
          { borderColor: selectedColor, ...theme.glow(selectedColor) }
        ]}
      >
        {/* HEADER: Badge de título con relleno de color sólido */}
        <View style={styles.headerContainer}>
          <Text style={[styles.borderSymbol, { color: selectedColor }]}>
            {config.top.repeat(4)}
          </Text>
          <View style={[styles.headerBadge, { backgroundColor: selectedColor }]}>
            <Text style={styles.headerText}>[ {title} ]</Text>
          </View>
          <Text numberOfLines={1} style={[styles.borderSymbol, { color: selectedColor, flex: 1 }]}>
            {config.top.repeat(25)}
          </Text>
        </View>

        {/* CONTENT: Soporta tanto strings como componentes complejos */}
        <View style={styles.content}>
          {typeof children === 'string' ? (
            <Text style={[styles.bodyText, { color: selectedColor }]}>{children}</Text>
          ) : (
            children
          )}
        </View>

        {/* FOOTER: Decoración ASCII y metadatos del componente */}
        <View style={styles.footerContainer}>
           <Text style={[styles.footerAscii, { color: selectedColor }]}>
            {`${config.corner}${"═".repeat(20)}╝`}
          </Text>
          <Text style={[styles.typeIndicator, { color: selectedColor }]}>
            UID_{borderType.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    backgroundColor: '#000',
    marginVertical: 8,
    paddingTop: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  headerText: {
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 10,
  },
  borderSymbol: {
    fontFamily: 'Courier New',
    fontSize: 12,
    letterSpacing: -1,
  },
  content: {
    padding: 16,
  },
  bodyText: {
    fontFamily: 'Courier New',
    fontSize: 13,
    lineHeight: 18,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 4,
  },
  footerAscii: {
    fontSize: 10,
    fontFamily: 'Courier New',
    opacity: 0.6,
  },
  typeIndicator: {
    fontSize: 7,
    fontFamily: 'Courier New',
    opacity: 0.3,
  }
});