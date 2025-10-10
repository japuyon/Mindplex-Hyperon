import { Component, createSignal, createEffect } from 'solid-js';
import styles from './NodeCircle.module.css';

interface NodeCircleProps {
  text: string;
  color?: string;
  size?: number;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
  isHighlighted?: boolean;
  className?: string;
}

const NodeCircle: Component<NodeCircleProps> = (props) => {
  const [isHovered, setIsHovered] = createSignal(false);
  const [isPressed, setIsPressed] = createSignal(false);
  const [truncatedText, setTruncatedText] = createSignal('');

  const size = () => props.size || 80;
  const maxLength = () => Math.max(8, Math.floor(size() / 8));

  createEffect(() => {
    const text = props.text || '';
    if (text.length <= maxLength()) {
      setTruncatedText(text);
    } else {
      setTruncatedText(text.substring(0, maxLength() - 2) + '...');
    }
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
    props.onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    props.onHover?.(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    props.onClick?.();
  };

  return (
    <div
      class={`${styles.nodeCircle} ${props.className || ''} ${
        isHovered() ? styles.hovered : ''
      } ${isPressed() ? styles.pressed : ''} ${
        props.isHighlighted ? styles.highlighted : ''
      }`}
      style={{
        width: `${size()}px`,
        height: `${size()}px`,
        '--node-color': props.color || 'var(--node-default)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
      title={props.text}
    >
      {/* Background glow ring */}
      <div class={styles.glowRing}></div>

      {/* Main circle content */}
      <div class={styles.circleContent}>
        {/* Animated border */}
        <div class={styles.animatedBorder}></div>

        {/* Text content with smart truncation */}
        <div class={styles.textContainer}>
          <span class={styles.mainText}>{truncatedText()}</span>
          {props.text.length > maxLength() && (
            <div class={styles.tooltip}>
              <div class={styles.tooltipContent}>
                {props.text}
              </div>
            </div>
          )}
        </div>

        {/* Interaction ripples */}
        <div class={styles.rippleEffect}></div>

        {/* Micro-interaction particles */}
        <div class={`${styles.particles} ${isHovered() ? styles.active : ''}`}>
          <div class={`${styles.particle} ${styles.particle1}`}></div>
          <div class={`${styles.particle} ${styles.particle2}`}></div>
          <div class={`${styles.particle} ${styles.particle3}`}></div>
          <div class={`${styles.particle} ${styles.particle4}`}></div>
        </div>

        {/* Selection indicator */}
        {props.isHighlighted && (
          <div class={styles.selectionIndicator}>
            <div class={styles.pulseRing}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeCircle;