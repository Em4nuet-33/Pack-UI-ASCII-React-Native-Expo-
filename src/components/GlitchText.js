/**
 * @component GlitchText
 * @description Componente de texto decorativo que simula interferencias 
 * digitales y un efecto de escritura mecánica (typing).
 * * @param {string} text - El texto a mostrar.
 * @param {number} glitchChance - Probabilidad (0 a 1) de que ocurra una interferencia.
 * @param {boolean} useTypingEffect - Si es true, el texto se escribe letra por letra al inicio.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';

export const GlitchText = ({ 
  text = "", 
  style, 
  interval = 500, 
  glitchChance = 0.3, 
  active = true,
  useTypingEffect = true 
}) => {
  const [displayText, setDisplayText] = useState(useTypingEffect ? "" : text);
  const chars = "!@#$%^&*()_+{}:<>?|abcXYZ0123▒░█";
  const timerRef = useRef(null);
  const typingIdx = useRef(0);

  // EFECTO 1: Escritura inicial (Typing)
  useEffect(() => {
    typingIdx.current = 0; // Reset en caso de que cambie el texto
    if (useTypingEffect) {
      const type = () => {
        if (typingIdx.current < text.length) {
          setDisplayText(text.substring(0, typingIdx.current + 1));
          typingIdx.current++;
          timerRef.current = setTimeout(type, 50);
        }
      };
      type();
    } else {
      setDisplayText(text);
    }
    return () => clearTimeout(timerRef.current);
  }, [text, useTypingEffect]);

  // EFECTO 2: Glitch aleatorio
  useEffect(() => {
    if (!active) return;

    const glitchInterval = setInterval(() => {
      // Solo iniciar glitch si el efecto de escritura terminó
      if (!useTypingEffect || typingIdx.current >= text.length) {
        
        if (Math.random() < glitchChance) {
          const glitched = text.split('').map(char => {
            if (char === " ") return " "; 
            return Math.random() > 0.8 
              ? chars[Math.floor(Math.random() * chars.length)] 
              : char;
          }).join('');
          
          setDisplayText(glitched);

          // El glitch dura apenas 70ms para ser un "parpadeo" molesto pero estético
          setTimeout(() => {
            setDisplayText(text);
          }, 70);
        }
      }
    }, interval);

    return () => clearInterval(glitchInterval);
  }, [text, active, interval, glitchChance, useTypingEffect]);

  return (
    <Text style={[styles.defaultStyle, style]}>
      {displayText}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: 'Courier New',
    color: '#00FF00',
  }
});