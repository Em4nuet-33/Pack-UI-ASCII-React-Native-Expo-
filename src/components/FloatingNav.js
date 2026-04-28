/**
 * @component FloatingNav
 * @description Barra de navegación persistente con comportamiento elástico.
 * Se contrae a una forma minimalista durante el scroll para maximizar el área de lectura.
 * * @param {boolean} isScrolling - Determina si la barra debe estar contraída o expandida.
 * @param {Array} items - Lista de objetos {name, icon} para las rutas.
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Dimensions, Text } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { theme } from '../utils/theme';

const { width } = Dimensions.get('window');

export const FloatingNav = ({ isScrolling, items = [] }) => {
    const navigation = useNavigation();
    const currentRoute = useNavigationState(state => state?.routes[state.index]?.name);
    
    const widthAnim = useRef(new Animated.Value(width * 0.9)).current;
    const soundRef = useRef(null);

    useEffect(() => {
        async function loadSound() {
            try {
                const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/beep.mp3'));
                soundRef.current = sound;
            } catch (e) { console.log("NavAudio: Error"); }
        }
        loadSound();
        return () => soundRef.current?.unloadAsync();
    }, []);

    // Feedback al tocar cualquier opción
    const playFeedback = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        if (soundRef.current) await soundRef.current.replayAsync();
    };

    const handlePress = (routeName) => {
        playFeedback();
        if (navigation.navigate) navigation.navigate(routeName);
    };

    // Animación elástica (Spring) al detectar cambio en isScrolling
    useEffect(() => {
        Animated.spring(widthAnim, {
            toValue: isScrolling ? 70 : width * 0.92,
            friction: 7,
            tension: 40,
            useNativeDriver: false, // El ancho no es soportado por Native Driver
        }).start();
    }, [isScrolling]);

    return (
        <View style={styles.container} pointerEvents="box-none">
            <Animated.View style={[styles.bar, { width: widthAnim, ...theme.glow(theme.colors.green) }]}>
                {!isScrolling ? (
                    <View style={styles.fullNav}>
                        {items.map((item, index) => (
                            <TouchableOpacity 
                                key={index} 
                                onPress={() => handlePress(item.name)}
                                hitSlop={{ top: 15, bottom: 15, left: 10, right: 10 }}
                                style={styles.navItem}
                            >
                                <item.icon 
                                    color={currentRoute === item.name ? theme.colors.green : theme.colors.darkGreen} 
                                    size={22} 
                                />
                                {currentRoute === item.name && (
                                    <Text style={styles.activeIndicator}>^</Text>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <TouchableOpacity style={styles.circle} onPress={() => handlePress(items[0]?.name)}>
                        <Text style={styles.asciiIcon}>[::]</Text>
                    </TouchableOpacity>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { position: 'absolute', bottom: 30, width: '100%', alignItems: 'center' },
    bar: {
        height: 56,
        backgroundColor: '#000',
        borderWidth: 1.5,
        borderColor: '#00FF00',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    fullNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1 },
    navItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    activeIndicator: { color: '#00FF00', fontSize: 10, marginTop: -4, fontWeight: 'bold' },
    circle: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    asciiIcon: { color: '#00FF00', fontFamily: 'Courier New', fontSize: 18 }
});