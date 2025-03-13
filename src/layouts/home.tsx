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
    <div className="container">
      <header>
        <h1>QR 코드 생성기</h1>
        <p className="subtitle">
          텍스트나 URL을 입력하여 맞춤형 QR 코드를 만들어보세요.
        </p>
      </header>

      <section className="input-section">
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
        />
      </section>

      <section className="qr-preview">
        <QrCodeImage text={text} color={color} backgroundColor="#FFFFFF" />
      </section>

      <section className="color-section">
        <h2>QR 코드 색상</h2>
        <div className="color-picker-container">
          <Compact onChange={handleColorChange} color={color} />
        </div>
        <div className="current-color">
          <span>선택된 색상: </span>
          <div
            className="color-preview"
            style={{ backgroundColor: color }}
          ></div>
          <span>{color}</span>
        </div>
      </section>
    </div>
  );
}
