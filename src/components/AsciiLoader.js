/**
 * @component AsciiLoader
 * @description Barra de carga estilo ASCII con múltiples variantes visuales.
 * Ideal para simular procesos de sistema o transiciones de datos.
 * * @param {number} width - Cantidad de caracteres de ancho de la barra.
 * @param {number} speed - Velocidad de actualización en ms.
 * @param {string} type - Estilo visual: 'classic', 'block', 'bullet', 'arrow'.
 * @param {string} label - Texto descriptivo superior.
 */

import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { theme } from '../utils/theme';

export const AsciiLoader = ({ 
  width = 20, 
  speed = 150, 
  color = '#00FF00',
  type = 'classic', 
  showPercentage = true,
  onComplete,
  label = "LOADING"
}) => {
  const [progress, setProgress] = useState(0);

  // Diccionario de caracteres para la construcción de la barra
  const loaderStyles = {
    classic: { fill: '#', empty: '-' },
    block: { fill: '█', empty: '░' },
    bullet: { fill: '●', empty: '○' },
    arrow: { fill: '>', empty: ' ' },
  };

  const style = loaderStyles[type] || loaderStyles.classic;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (onComplete) onComplete();
          return 0; // Reinicio automático para demostración
        }
        // Incremento aleatorio para simular carga real (no lineal)
        const step = Math.random() > 0.7 ? 10 : 5;
        return Math.min(prev + step, 100);
      });
    }, speed);

    return () => clearInterval(interval);
  }, [speed, onComplete]);

  // Lógica de renderizado de la cadena ASCII
  const filledLength = Math.floor((progress / 100) * width);
  const emptyLength = Math.max(0, width - filledLength);
  const bar = `[${style.fill.repeat(filledLength)}${style.empty.repeat(emptyLength)}]`;

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color }]}>{label}...</Text>
      )}
      <View style={styles.loaderRow}>
        <Text style={[styles.loader, { color }]}>
          {bar}
        </Text>
        {showPercentage && (
          <Text style={[styles.percentage, { color }]}>
            {progress.toString().padStart(3, ' ')}%
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    alignItems: 'flex-start',
  },
  label: {
    fontFamily: 'Courier New',
    fontSize: 10,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.8,
  },
  loaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loader: {
    fontFamily: 'Courier New',
    fontSize: 14,
    letterSpacing: -1, // Ajuste para que los caracteres se unan visualmente
  },
  percentage: {
    fontFamily: 'Courier New',
    fontSize: 12,
    marginLeft: 10,
    minWidth: 40,
  }
});