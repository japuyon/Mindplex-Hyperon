import { Component, createSignal } from 'solid-js';
import styles from './ChatToggle.module.css';

interface ChatToggleProps {
  isOpen: boolean;
  onClick: () => void;
  hasNewMessages?: boolean;
}

const ChatToggle: Component<ChatToggleProps> = (props) => {
  const [isHovered, setIsHovered] = createSignal(false);

  return (
    <button
      class={`${styles.chatToggle} ${props.isOpen ? styles.open : ''}`}
      onClick={props.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={props.isOpen ? 'Close Chat' : 'Open AI Assistant'}
    >
      {/* Ripple effect container */}
      <div class={styles.rippleContainer}>
        <div class={`${styles.ripple} ${styles.ripple1}`}></div>
        <div class={`${styles.ripple} ${styles.ripple2}`}></div>
        <div class={`${styles.ripple} ${styles.ripple3}`}></div>
      </div>

      {/* Main icon container */}
      <div class={styles.iconContainer}>
        {props.isOpen ? (
          <svg
            class={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            class={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"/>
            <path d="M21 9V7L15 1L9 7V9"/>
            <path d="M22 17.5C22 19.9853 20.0147 22 17.5 22C14.9853 22 13 19.9853 13 17.5C13 15.0147 14.9853 13 17.5 13C20.0147 13 22 15.0147 22 17.5Z"/>
            <path d="M8 21V19C8 17.8954 8.89543 17 10 17H12"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        )}
      </div>

      {/* Notification badge */}
      {props.hasNewMessages && !props.isOpen && (
        <div class={styles.badge}>
          <div class={styles.badgeContent}></div>
        </div>
      )}

      {/* Heartbeat pulse overlay */}
      <div class={`${styles.heartbeat} ${isHovered() ? styles.active : ''}`}></div>
    </button>
  );
};

export default ChatToggle;