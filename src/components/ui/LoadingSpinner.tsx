// src/components/ui/LoadingSpinner.tsx

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const LoadingSpinner = ({ size = 'md', color = 'var(--primary-blue)', className = '' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'loading-spinner-sm',
    md: 'loading-spinner',
    lg: 'loading-spinner-lg'
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div 
        className={`${sizeClasses[size]} ${className}`}
        style={{ borderTopColor: color }}
        role="status"
        aria-label="Loading"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;