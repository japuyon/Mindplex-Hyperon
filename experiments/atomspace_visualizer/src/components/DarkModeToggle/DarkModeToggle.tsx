import { Component, createSignal, createEffect } from 'solid-js';
import styles from './DarkModeToggle.module.css';

interface DarkModeToggleProps {
  onToggle?: (isDark: boolean) => void;
}

const DarkModeToggle: Component<DarkModeToggleProps> = (props) => {
  const [isDark, setIsDark] = createSignal(false);
  const [isHovered, setIsHovered] = createSignal(false);

  // Load saved theme preference
  createEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialIsDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    setIsDark(initialIsDark);
    updateTheme(initialIsDark);
  });

  const updateTheme = (dark: boolean) => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleToggle = () => {
    const newIsDark = !isDark();
    setIsDark(newIsDark);
    updateTheme(newIsDark);
    props.onToggle?.(newIsDark);
  };

  return (
    <button
      class={`${styles.themeToggle} ${isDark() ? styles.dark : styles.light}`}
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={`Switch to ${isDark() ? 'light' : 'dark'} mode`}
    >
      {/* Background orbital rings */}
      <div class={styles.orbitalRings}>
        <div class={`${styles.ring} ${styles.ring1}`}></div>
        <div class={`${styles.ring} ${styles.ring2}`}></div>
        <div class={`${styles.ring} ${styles.ring3}`}></div>
      </div>

      {/* Icon container with transition */}
      <div class={`${styles.iconContainer} ${isHovered() ? styles.hovered : ''}`}>
        {/* Sun Icon */}
        <div class={`${styles.sunIcon} ${!isDark() ? styles.active : ''}`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="4"/>
            <path d="m12 2 0 2"/>
            <path d="m12 20 0 2"/>
            <path d="m4.93 4.93 1.41 1.41"/>
            <path d="m17.66 17.66 1.41 1.41"/>
            <path d="m2 12 2 0"/>
            <path d="m20 12 2 0"/>
            <path d="m6.34 17.66-1.41 1.41"/>
            <path d="m19.07 4.93-1.41 1.41"/>
          </svg>
        </div>

        {/* Moon Icon */}
        <div class={`${styles.moonIcon} ${isDark() ? styles.active : ''}`}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
          </svg>
        </div>
      </div>

      {/* Interactive particles */}
      <div class={`${styles.particles} ${isHovered() ? styles.active : ''}`}>
        <div class={`${styles.particle} ${styles.particle1}`}></div>
        <div class={`${styles.particle} ${styles.particle2}`}></div>
        <div class={`${styles.particle} ${styles.particle3}`}></div>
        <div class={`${styles.particle} ${styles.particle4}`}></div>
      </div>

      {/* Glow effect */}
      <div class={`${styles.glow} ${isDark() ? styles.moonGlow : styles.sunGlow}`}></div>
    </button>
  );
};

export default DarkModeToggle;