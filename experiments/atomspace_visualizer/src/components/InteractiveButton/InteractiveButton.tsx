import { Component, createSignal, JSX } from 'solid-js';
import styles from './InteractiveButton.module.css';

interface InteractiveButtonProps {
  children: JSX.Element;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  title?: string;
  ariaLabel?: string;
}

const InteractiveButton: Component<InteractiveButtonProps> = (props) => {
  const [isHovered, setIsHovered] = createSignal(false);
  const [isPressed, setIsPressed] = createSignal(false);
  const [ripples, setRipples] = createSignal<Array<{ id: number; x: number; y: number }>>([]);

  let buttonRef: HTMLButtonElement | undefined;
  let rippleCounter = 0;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  const handleMouseDown = (e: MouseEvent) => {
    setIsPressed(true);
    createRipple(e);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const createRipple = (e: MouseEvent) => {
    if (!buttonRef) return;
    
    const rect = buttonRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: ++rippleCounter, x, y };
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  const handleClick = (e: MouseEvent) => {
    if (props.disabled || props.loading) return;
    props.onClick?.();
  };

  const variant = () => props.variant || 'primary';
  const size = () => props.size || 'md';

  return (
    <button
      ref={buttonRef}
      class={`
        ${styles.interactiveButton}
        ${styles[variant()]}
        ${styles[size()]}
        ${isHovered() ? styles.hovered : ''}
        ${isPressed() ? styles.pressed : ''}
        ${props.disabled ? styles.disabled : ''}
        ${props.loading ? styles.loading : ''}
        ${props.className || ''}
      `}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      disabled={props.disabled || props.loading}
      title={props.title}
      aria-label={props.ariaLabel}
    >
      {/* Background gradient overlay */}
      <div class={styles.backgroundOverlay}></div>

      {/* Content wrapper */}
      <div class={styles.contentWrapper}>
        {props.loading ? (
          <div class={styles.spinner}>
            <div class={styles.spinnerRing}></div>
          </div>
        ) : (
          props.children
        )}
      </div>

      {/* Ripple effects */}
      <div class={styles.rippleContainer}>
        {ripples().map(ripple => (
          <div
            class={styles.ripple}
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
            }}
          ></div>
        ))}
      </div>

      {/* Hover glow effect */}
      <div class={`${styles.glowEffect} ${isHovered() ? styles.active : ''}`}></div>

      {/* Micro-interaction particles */}
      <div class={`${styles.particles} ${isHovered() ? styles.active : ''}`}>
        <div class={`${styles.particle} ${styles.particle1}`}></div>
        <div class={`${styles.particle} ${styles.particle2}`}></div>
        <div class={`${styles.particle} ${styles.particle3}`}></div>
        <div class={`${styles.particle} ${styles.particle4}`}></div>
      </div>

      {/* Success feedback ring */}
      <div class={styles.successRing}></div>
    </button>
  );
};

export default InteractiveButton;