import { useState } from 'react';
import { QrCodeImage } from '../components/qr';
import { ColorResult } from 'react-color';
import Compact from 'react-color/lib/components/compact/Compact';

export default function Home() {
  const [text, setText] = useState('https://www.google.com');
  const [color, setColor] = useState('#000000');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
  };

  return (
    <main className="container">
      <header>
        <h1>QR 코드 생성기</h1>
        <p className="subtitle">
          텍스트나 URL을 입력하여 맞춤형 QR 코드를 만들어보세요.
        </p>
      </header>

      <section className="input-section" aria-labelledby="input-heading">
        <h2 id="input-heading" className="visually-hidden">
          URL 입력
        </h2>
        <label htmlFor="qr-input" className="input-label">
          URL 또는 텍스트 입력
        </label>
        <input
          id="qr-input"
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="링크를 넣어보세요!"
          className="text-input"
          aria-describedby="input-description"
        />
        <p id="input-description" className="visually-hidden">
          입력한 텍스트나 URL로 QR코드가 생성됩니다.
        </p>
      </section>

      <section className="qr-preview" aria-labelledby="preview-heading">
        <h2 id="preview-heading" className="visually-hidden">
          QR 코드 미리보기
        </h2>
        <QrCodeImage text={text} color={color} backgroundColor="#FFFFFF" />
      </section>

      <section className="color-section" aria-labelledby="color-heading">
        <h2 id="color-heading">QR 코드 색상</h2>
        <div
          className="color-picker-container"
          role="region"
          aria-label="색상 선택기"
        >
          <Compact onChange={handleColorChange} color={color} />
        </div>
        <div className="current-color" aria-live="polite">
          <span>선택된 색상: </span>
          <div
            className="color-preview"
            style={{ backgroundColor: color }}
            role="img"
            aria-label={`선택된 색상 미리보기: ${color}`}
          ></div>
          <span>{color}</span>
        </div>
      </section>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} QR 코드 생성기 - 모든 권리 보유</p>
      </footer>
    </main>
  );
}
