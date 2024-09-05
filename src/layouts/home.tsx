import { useState } from 'react';
import { QrCodeImage } from '../components/qr';
import Padding from '../components/padding';

export default function Home() {
  const [text, setText] = useState('https://www.google.com');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <h1>QR 코드 생성기</h1>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="QR로 연결될 링크를 넣어보세요!"
        style={{ fontSize: '18px', padding: '10px', width: '80%' }}
      />
      <Padding />
      <QrCodeImage text={text} />
    </div>
  );
}
