import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import Padding from './padding';

interface QrCodeImageProps {
  text: string;
  color: string;
  backgroundColor?: string;
}

export const QrCodeImage = ({ text, color, backgroundColor }: QrCodeImageProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // QR 코드를 생성하고 canvas에 그리기
      QRCode.toCanvas(canvasRef.current, text, {
        color: { dark: color, light: backgroundColor },
        scale: 4,
      });
      // canvas를 이미지 데이터로 변환하여 다운로드 링크용 URL 설정
      const url = canvasRef.current.toDataURL('image/png');
      setImageURL(url);
    }
  }, [text, color, backgroundColor]);

  const downloadQRCode = () => {
    if (imageURL) {
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = 'qrcode.png'; // 다운로드할 파일 이름 설정
      link.click();
    }
  };

  return (
    <div>
      <div>
        <canvas ref={canvasRef} style={{ color: backgroundColor }} />
      </div>
      <Padding />
      <div>
        <button onClick={downloadQRCode}>QR 코드 다운로드</button>
      </div>
    </div>
  );
};
