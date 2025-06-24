// src/components/ui/ImageUpload.tsx
import { useState, useRef } from 'react';
import { uploadImage, validateFileSize, validateImageType } from '../../services/storage';
import LoadingSpinner from './LoadingSpinner';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  onImageRemoved?: () => void;
  currentImageUrl?: string;
  folder?: string;
  maxSizeMB?: number;
  className?: string;
}

const ImageUpload = ({ 
  onImageUploaded, 
  onImageRemoved,
  currentImageUrl,
  folder = 'dream-hospitals',
  maxSizeMB = 5,
  className = ''
}: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');

    // 파일 검증
    if (!validateImageType(file)) {
      setError('지원되는 이미지 형식: JPG, PNG, GIF, WebP');
      return;
    }

    if (!validateFileSize(file, maxSizeMB)) {
      setError(`파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`);
      return;
    }

    try {
      setUploading(true);
      
      // 미리보기 생성
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Firebase Storage에 업로드
      const downloadUrl = await uploadImage(file, folder);
      
      // 부모 컴포넌트에 업로드된 URL 전달
      onImageUploaded(downloadUrl);
      
    } catch (error) {
      console.error('Upload error:', error);
      setError('이미지 업로드에 실패했습니다.');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageRemoved?.();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`image-upload ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          {error}
        </div>
      )}

      <div className="upload-area" style={{ position: 'relative' }}>
        {preview ? (
          <div className="image-preview" style={{ position: 'relative' }}>
            <img
              src={preview}
              alt="업로드된 이미지"
              style={{
                width: '100%',
                maxWidth: '400px',
                height: '250px',
                objectFit: 'cover',
                borderRadius: '0.75rem',
                border: '2px solid #dee2e6'
              }}
            />
            {uploading && (
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '0.75rem'
                }}
              >
                <LoadingSpinner color="white" />
                <span className="text-white ms-2">업로드 중...</span>
              </div>
            )}
            <div className="image-actions mt-2">
              <button
                type="button"
                onClick={handleUploadClick}
                className="btn btn-outline-primary me-2"
                disabled={uploading}
              >
                이미지 변경
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="btn btn-outline-danger"
                disabled={uploading}
              >
                이미지 제거
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={handleUploadClick}
            style={{
              border: '2px dashed #dee2e6',
              borderRadius: '0.75rem',
              padding: '3rem 2rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: '#f8f9fa',
              transition: 'all 0.2s ease'
            }}
            className="upload-placeholder"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#0d6efd';
              e.currentTarget.style.background = '#e3f2fd';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#dee2e6';
              e.currentTarget.style.background = '#f8f9fa';
            }}
          >
            <div className="text-muted">
              <i className="bi bi-cloud-upload" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
              <h5>이미지를 업로드하세요</h5>
              <p className="mb-0">
                클릭하여 파일을 선택하세요<br />
                <small>지원 형식: JPG, PNG, GIF, WebP (최대 {maxSizeMB}MB)</small>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;