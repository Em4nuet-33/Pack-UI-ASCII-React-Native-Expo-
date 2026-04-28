/**
 * THEME CONFIGURATION v1.0.0
 * --------------------------
 * Este archivo centraliza la identidad visual. 
 * Modifica los valores de 'colors' para cambiar el estilo de toda la interfaz.
 */

export const theme = {
    colors: {
        // --- COLORES TEMÁTICOS (Modo Terminal) ---
        green: '#00FF00',      // Clásico Terminal Matrix
        amber: '#FFB000',      // Retro CRT / Advertencias
        alert: '#FF3131',      // Errores Críticos
        darkGreen: '#004400',  // Fondos y bordes sutiles
        
        // --- BASE DE INTERFAZ ---
        background: '#000000', // Negro puro para contraste OLED
        surface: '#050505',    // Elevación sutil de componentes
        text: '#FFFFFF',       // Texto general
        textDim: '#6B6B6B',    // Texto secundario o desactivado
        
        // --- ESTADOS DE PROCESO (Opcionales para lógica de negocio) ---
        status: {
            pending: '#FAD02E',
            processing: '#5DADE2',
            success: '#00FF00',
            failed: '#E74C3C',
        }
    },
    
    // Configuración de espaciados para layouts consistentes
    spacing: {
        s: 8,
        m: 16,
        l: 24,
    },
    
    // Radios de borde (usar con precaución en estilos ASCII)
    borderRadius: {
        m: 12,
        full: 99,
    },

    // Efectos de iluminación (Glow) para el look Cyberpunk
    glow: (color) => ({
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 4,
    })
};