// src/components/common/Button.tsx
import React from 'react';
import { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary' | 'outline-light' | 'danger' | 'outline-danger';
  size?: 'sm' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size, 
  onClick, 
  type = 'button', 
  disabled = false, 
  isLoading = false,
  className = '',
  style
}: ButtonProps) => {
  // Convert custom variants to CSS classes
  const getButtonClass = () => {
    const baseClass = 'btn';
    const sizeClass = size ? `btn-${size}` : '';
    
    // Use custom anniversary button classes for primary variants
    if (variant === 'primary') {
      return `${baseClass} btn-anniversary ${sizeClass} ${className}`.trim();
    }
    if (variant === 'outline-primary') {
      return `${baseClass} btn-anniversary-outline ${sizeClass} ${className}`.trim();
    }
    if (variant === 'outline-light') {
      return `${baseClass} btn-outline-light ${sizeClass} ${className}`.trim();
    }
    
    // Default Bootstrap classes for other variants
    return `${baseClass} btn-${variant} ${sizeClass} ${className}`.trim();
  };

  return (
    <button
      type={type}
      className={getButtonClass()}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;