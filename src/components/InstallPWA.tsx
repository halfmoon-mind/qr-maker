import { useState, useEffect } from 'react';

// PWA 설치 관련 타입 선언
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// PWA 설치 안내 컴포넌트
export default function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showInstallMessage, setShowInstallMessage] = useState(false);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    // iOS 디바이스 확인
    const ios = /iphone|ipad|ipod/.test(
      window.navigator.userAgent.toLowerCase()
    );
    setIsIOS(ios);

    // 앱이 이미 설치되었는지 확인
    const isStandalone = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;

    if (!isStandalone) {
      setShowInstallMessage(true);
      window.addEventListener('beforeinstallprompt', handler as EventListener);
    }

    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        handler as EventListener
      );
  }, []);

  const onClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (!showInstallMessage) return null;

  return (
    <div className="install-pwa">
      {supportsPWA ? (
        <button className="install-button" onClick={onClick}>
          앱 설치하기
        </button>
      ) : isIOS ? (
        <div className="ios-install-guide">
          <p>
            앱을 설치하려면 <span className="highlight">공유 버튼</span>을 누른
            다음 <span className="highlight">홈 화면에 추가</span>를 선택하세요
          </p>
        </div>
      ) : null}
    </div>
  );
}
