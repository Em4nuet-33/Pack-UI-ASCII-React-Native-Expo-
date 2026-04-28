/**
 * @component HeroAscii
 * @description El encabezado principal de la aplicación. Combina arte ASCII, 
 * efectos de texto glitch y mini-tarjetas de métricas rápidas.
 * * @param {string} title - Título principal (blanco resaltado).
 * @param {string} subtitle - Texto con efecto glitch debajo del título.
 * @param {Array} cards - Array de objetos {title, content} para las métricas.
 * @param {string} color - Color principal del tema (hex).
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { GlitchText } from './GlitchText';

const { width } = Dimensions.get('window');

export const HeroAscii = ({ 
  title = "TERMINAL_OS", 
  subtitle = "SYSTEM_READY",
  cards = [],
  color = '#00FF00' 
}) => {
  
  const soundRef = useRef(null);

  // Carga el sonido una sola vez al montar el componente
  useEffect(() => {
    async function loadSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/sounds/beep.mp3')
        );
        soundRef.current = sound;
      } catch (e) {
        console.log("HeroAscii: Error al cargar audio");
      }
    }
    loadSound();

    // Limpieza: descarga el sonido cuando el componente se destruye
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  /**
   * Ejecuta feedback táctil y auditivo al interactuar con las mini-cards.
   */
  const playFeedback = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (soundRef.current) {
      try {
        await soundRef.current.replayAsync();
      } catch (e) { /* Fallback silencioso */ }
    }
  };

  return (
    <View style={styles.container}>
      
      {/* CAPA 1: ARTE ASCII DE FONDO (Watermark)
          Aporta profundidad visual sin distraer del contenido principal. */}
      <View style={styles.backgroundArtContainer}>
        <Text style={[styles.asciiWatermark, { color }]}>
          {`
    ________________________________________________
   /                                                \\
  |     _________________________________________    |
  |    |                                         |   |
  |    |   > CORE_INIT.................[ OK ]    |   |
  |    |   > MEMORY_TEST...............[ OK ]    |   |
  |    |   > NETWORK_SYNC..............[ OK ]    |   |
  |    |_________________________________________|   |
   \\________________________________________________/
          `}
        </Text>
      </View>

      {/* CAPA 2: BRANDING CENTRAL
          Utiliza fuentes monoespaciadas para el look 'mainframe'. */}
      <View style={styles.mainLogoContainer}>
        <Text style={[styles.asciiBanner, { color }]}>
          {`
     █████╗ ███████╗ ██████╗██╗
    ██╔══██╗██╔════╝██╔════╝██║
    ███████║███████╗██║     ██║
    ██╔══██║╚════██║██║     ██║
    ██║  ██║███████║╚██████╗██║
    ╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝
          `}
        </Text>
        
        <View style={styles.titleWrapper}>
           <Text style={styles.mainTitle}>{title}</Text>
           <GlitchText text={subtitle} style={[styles.subtitle, { color }]} />
        </View>
      </View>

      {/* CAPA 3: MÉTRICAS RÁPIDAS (Quick Metrics)
          Ideal para mostrar Uptime, CPU, Memoria o estatus de conexión. */}
      <View style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.miniCard, { borderColor: color }]} 
            onPress={playFeedback}
            activeOpacity={0.7}
          >
            <Text style={styles.miniCardTitle}>{card.title}</Text>
            <Text style={styles.miniCardContent}>{card.content}</Text>
            <Text style={[styles.miniCardCorner, { color }]}>[+]</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* OVERLAY: SCANLINES
          Mantiene el área reservada para efectos de post-procesado visual. */}
      <View style={styles.scanlines} pointerEvents="none" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backgroundArtContainer: {
    position: 'absolute',
    top: 0,
    opacity: 0.07, 
  },
  asciiWatermark: {
    fontFamily: 'Courier New',
    fontSize: 8,
    textAlign: 'center',
  },
  mainLogoContainer: {
    alignItems: 'center',
    zIndex: 2,
  },
  asciiBanner: {
    fontFamily: 'Courier New',
    fontSize: width > 400 ? 12 : 9,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 255, 0, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  titleWrapper: {
    marginTop: 15,
    alignItems: 'center',
  },
  mainTitle: {
    fontFamily: 'Courier New',
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subtitle: {
    fontFamily: 'Courier New',
    fontSize: 12,
    marginTop: 5,
    letterSpacing: 4,
  },
  cardsContainer: {
    marginTop: 30,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  miniCard: {
    width: '48%',
    borderWidth: 1,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginBottom: 10,
    position: 'relative',
  },
  miniCardTitle: {
    fontFamily: 'Courier New',
    color: '#FFD700', // Ámbar clásico para destacar etiquetas
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  miniCardContent: {
    fontFamily: 'Courier New',
    color: '#FFFFFF',
    fontSize: 10,
    marginTop: 4,
    opacity: 0.9,
  },
  miniCardCorner: {
    position: 'absolute',
    bottom: 2,
    right: 5,
    fontSize: 8,
    fontFamily: 'Courier New',
  },
  scanlines: {
    ...StyleSheet.absoluteFillObject,
  }
});