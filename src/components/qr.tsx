import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

interface QrCodeImageProps {
  text: string;
  color: string;
  backgroundColor?: string;
}

export const QrCodeImage = ({
  text,
  color,
  backgroundColor = '#FFFFFF',
}: QrCodeImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      setIsGenerating(true);
      // QR 코드를 생성하고 canvas에 그리기
      QRCode.toCanvas(canvasRef.current, text, {
        color: { dark: color, light: backgroundColor },
        scale: 8,
        margin: 2,
        errorCorrectionLevel: 'H', // 오류 수정 수준을 향상
      })
        .then(() => {
          // canvas를 이미지 데이터로 변환하여 다운로드 링크용 URL 설정
          const url = canvasRef.current?.toDataURL('image/png');
          if (url) setImageURL(url);
          setIsGenerating(false);
        })
        .catch((err) => {
          console.error('QR 코드 생성 중 오류 발생:', err);
          setIsGenerating(false);
        });
    }
  }, [text, color, backgroundColor]);

  const downloadQRCode = () => {
    if (imageURL) {
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = `qrcode-${new Date().getTime()}.png`; // 타임스탬프 추가하여 고유한 파일명 생성
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="qr-code-container">
      <div className="qr-canvas-wrapper">
        {isGenerating && <div className="loading-indicator">생성 중...</div>}
        <canvas ref={canvasRef} className="qr-canvas" />
      </div>

      <button
        onClick={downloadQRCode}
        className="download-button"
        disabled={!imageURL || isGenerating}
      >
        <svg
          className="download-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        QR 코드 다운로드
      </button>
    </div>
  );
};
