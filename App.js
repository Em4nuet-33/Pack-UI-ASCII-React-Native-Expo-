/**
 * ASCII TERMINAL UI KIT - Main Entry Point
 * ---------------------------------------
 * Este archivo gestiona la navegación principal y las vistas de demostración.
 * Utiliza React Navigation con una arquitectura de alto rendimiento.
 */

import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Text, FlatList, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Shield, Database, Layout } from 'lucide-react-native';

// Importación de Componentes Atómicos
import { TerminalOverlay } from './src/components/TerminalOverlay';
import { HeroAscii } from './src/components/HeroAscii';
import { TerminalCard } from './src/components/TerminalCard';
import { FloatingNav } from './src/components/FloatingNav';
import { GlitchText } from './src/components/GlitchText';
import { AsciiLoader } from './src/components/AsciiLoader';

const Stack = createStackNavigator();

/**
 * COMPONENTE MEMOIZADO: MemoizedCard
 * Previene re-renders innecesarios de las cards durante el scroll o animaciones.
 * Es vital para mantener 60 FPS en listas largas.
 */
const MemoizedCard = React.memo(({ item }) => (
  <TerminalCard 
    title={item.title} 
    variant={item.variant} 
    borderType={item.border}
  >
    <Text style={styles.cardBody}>{item.content}</Text>
  </TerminalCard>
));

// Simulación de datos para el scroll infinito
const INFINITE_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i.toString(),
  title: `LOG_ENTRY_${1000 + i}`,
  content: `Data packet ${i} verified. Integrity: NOMINAL.`,
  variant: i % 3 === 0 ? "green" : i % 3 === 1 ? "amber" : "alert",
  border: i % 2 === 0 ? "hash" : "dots"
}));

/**
 * PANTALLA: Dashboard (HomeScreen)
 * Demuestra el uso de FlatList optimizado y el HeroAscii.
 */
const HomeScreen = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  // Handlers de scroll optimizados con useCallback para evitar fugas de memoria
  const handleScrollBegin = useCallback(() => setIsScrolling(true), []);
  const handleScrollEnd = useCallback(() => setIsScrolling(false), []);
  const renderItem = useCallback(({ item }) => <MemoizedCard item={item} />, []);

  return (
    <SafeAreaView style={styles.main}>
      <FlatList
        data={INFINITE_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onScrollBeginDrag={handleScrollBegin}
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        // Configuración de rendimiento de FlatList
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        windowSize={5}
        initialNumToRender={8}
        ListHeaderComponent={
          <HeroAscii 
            title="CORE_DASHBOARD" 
            subtitle="SCROLL_TO_COLLAPSE_NAV"
            cards={[{title: "NODES", content: "ACTIVE"}, {title: "LOAD", content: "LOW"}]}
          />
        }
        ListFooterComponent={<View style={{ height: 120 }} />}
        contentContainerStyle={{ padding: 20 }}
      />
      {/* El Navbar detecta el estado isScrolling para colapsar automáticamente */}
      <FloatingNav items={NAV_ITEMS} isScrolling={isScrolling} />
    </SafeAreaView>
  );
};

/**
 * PANTALLA: Seguridad (SecurityScreen)
 * Demuestra el uso de TerminalOverlay (Modales) y alertas críticas.
 */
const SecurityScreen = () => {
  const [scrolling, setScrolling] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView 
        onScrollBeginDrag={() => setScrolling(true)} 
        onScrollEndDrag={() => setScrolling(false)} 
        contentContainerStyle={{padding: 20}}
      >
        <GlitchText text="SECURITY_LOGS" style={styles.header} />
        
        <TerminalCard title="FIREWALL" variant="alert" borderType="glitch">
          <Text style={{color: '#FF3131'}}>ATTEMPTED BREACH IN SECTOR 7G</Text>
        </TerminalCard>

        <AsciiLoader label="SCANNING_THREATS" type="block" color="#FF3131" />

        <TerminalCard title="SYSTEM_ACTION" onPress={() => setShowModal(true)}>
          <Text style={{color: '#00FF00'}}>PRESS TO TRIGGER MODAL OVERLAY</Text>
        </TerminalCard>

        {/* Componente de diálogo de alto nivel */}
        <TerminalOverlay 
          visible={showModal}
          title="SECURITY_ALERT"
          message="You are about to purge the system database. This action is irreversible. Proceed?"
          variant="alert"
          onConfirm={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
        />
      </ScrollView>
      <FloatingNav items={NAV_ITEMS} isScrolling={scrolling} />
    </SafeAreaView>
  );
}

// ... Las pantallas de DataScreen y VariantsScreen siguen el mismo patrón modular
/**
 * PANTALLA: Datos (DataScreen)
 * Muestra el estado de sincronización y loaders.
 */
const DataScreen = () => {
  return (
    <SafeAreaView style={styles.main}>
      <View style={{padding: 20}}>
        <GlitchText text="DATABASE_SYNCHRONIZATION" style={styles.header} />
        <AsciiLoader type="classic" label="REMOTE_SERVER" />
        <AsciiLoader type="bullet" label="LOCAL_STORAGE" color="#FFB000" />
        <AsciiLoader type="arrow" label="VOLATILE_CACHE" color="#FF3131" />
      </View>
      <FloatingNav items={NAV_ITEMS} isScrolling={false} />
    </SafeAreaView>
  );
}
/**
 * PANTALLA: Variantes (VariantsScreen)
 * Catálogo visual de los diferentes bordes ASCII.
 */
const VariantsScreen = () => {
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView contentContainerStyle={{padding: 20}}>
        <Text style={styles.header}>UI_LIBRARY_VARIANTS</Text>
        <TerminalCard title="TYPE_HASH" borderType="hash" variant="green">
          <Text style={styles.cardBody}>Usando bordes tipo hash %%%</Text>
        </TerminalCard>
        <TerminalCard title="TYPE_DOTS" borderType="dots" variant="amber">
          <Text style={styles.cardBody}>Usando bordes tipo dots ░░░</Text>
        </TerminalCard>
        <TerminalCard title="TYPE_GLITCH" borderType="glitch" variant="alert">
          <Text style={styles.cardBody}>Usando bordes tipo glitch XXX</Text>
        </TerminalCard>
      </ScrollView>
      <FloatingNav items={NAV_ITEMS} isScrolling={false} />
    </SafeAreaView>
  );
}
/**
 * CONFIGURACIÓN DE NAVEGACIÓN
 * Define los iconos (Lucide-React) y las rutas del kit.
 */
const NAV_ITEMS = [
  { name: 'Dashboard', icon: Home },
  { name: 'Security', icon: Shield },
  { name: 'Data', icon: Database },
  { name: 'UI_Variants', icon: Layout },
];

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator 
        screenOptions={{ 
            headerShown: false, 
            animationEnabled: false, // El estilo retro prefiere cambios de estado instantáneos sin transiciones suaves
            detachPreviousScreen: true 
        }}
      >
        <Stack.Screen name="Dashboard" component={HomeScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="Data" component={DataScreen} />
        <Stack.Screen name="UI_Variants" component={VariantsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#000' },
  header: { color: '#00FF00', fontFamily: 'Courier New', fontSize: 20, paddingVertical: 20, fontWeight: 'bold' },
  cardBody: { color: '#00FF00', fontFamily: 'Courier New', fontSize: 12 },
  body: { color: '#00FF00', fontFamily: 'Courier New' }
});