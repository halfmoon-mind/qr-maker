import { useState } from 'react';
import { QrCodeImage } from '../components/qr';
import Padding from '../components/padding';
import { ColorResult } from 'react-color';
import Compact from 'react-color/lib/components/compact/Compact';

export default function Home() {
  const [text, setText] = useState('https://www.google.com');
  const [color, setColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
  };

  const handleBackgroundColorChange = (color: ColorResult) => {
    setBackgroundColor(color.hex);
  };

  return (
    <div>
      <h1>QR 코드 생성기</h1>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="링크를 넣어보세요!"
        style={{ fontSize: '18px', padding: '10px', width: '80%' }}
      />
      <Padding />
      <QrCodeImage text={text} color={color} backgroundColor={backgroundColor} />
      <h2>QR코드 색상 변경</h2>
      <Compact onChange={handleColorChange} color={color} />
      <h2>배경 색상 변경</h2>
      <Compact onChange={handleBackgroundColorChange} color={backgroundColor} />
    </div>
  );
}
