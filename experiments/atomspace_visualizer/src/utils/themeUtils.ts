// Theme utilities for canvas rendering
export interface ThemeColors {
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  primaryColor: string;
  secondaryColor: string;
  successColor: string;
  warningColor: string;
  dangerColor: string;
}

// Helper function to get CSS variable values
export const getCSSVariable = (varName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
};

// Theme-aware color getters for canvas rendering
export const getThemeColors = (): ThemeColors => ({
  textPrimary: getCSSVariable('--text-primary') || '#1f2937',
  textSecondary: getCSSVariable('--text-secondary') || '#6b7280',
  textMuted: getCSSVariable('--text-muted') || '#9ca3af',
  textInverse: getCSSVariable('--text-inverse') || '#f9fafb',
  primaryColor: getCSSVariable('--color-primary-500') || '#6366f1',
  secondaryColor: getCSSVariable('--color-secondary-500') || '#d946ef',
  successColor: getCSSVariable('--color-success-500') || '#22c55e',
  warningColor: getCSSVariable('--color-warning-500') || '#f59e0b',
  dangerColor: getCSSVariable('--color-danger-500') || '#ef4444'
});

// Get theme-aware background color for canvas
export const getCanvasBackgroundColor = (): string => {
  return getCSSVariable('--background-canvas') || '#ffffff';
};

// Get theme-aware grid pattern color
export const getGridPatternColor = (): string => {
  return getCSSVariable('--border-secondary') || '#e4e4e7';
};