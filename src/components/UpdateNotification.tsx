import { useState, useEffect } from 'react';
import { registerSW } from 'virtual:pwa-register';

export default function UpdateNotification() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [updateSW, setUpdateSW] = useState<
    ((reloadPage?: boolean) => Promise<void>) | undefined
  >();

  useEffect(() => {
    // PWA 업데이트 등록
    const update = registerSW({
      onNeedRefresh() {
        setNeedRefresh(true);
      },
      onOfflineReady() {
        setOfflineReady(true);
        // 5초 후 자동으로 오프라인 알림 닫기
        setTimeout(() => setOfflineReady(false), 5000);
      },
    });

    setUpdateSW(() => update);
  }, []);

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  const updateApp = () => {
    if (updateSW) {
      updateSW(true);
    }
  };

  if (!needRefresh && !offlineReady) return null;

  return (
    <div className="update-notification">
      {offlineReady && (
        <div className="offline-ready">
          <p>앱이 오프라인에서도 사용할 수 있도록 준비되었습니다.</p>
          <button className="close-button" onClick={close}>
            닫기
          </button>
        </div>
      )}

      {needRefresh && (
        <div className="new-version">
          <p>새 버전이 사용 가능합니다!</p>
          <div className="button-container">
            <button className="update-button" onClick={updateApp}>
              업데이트
            </button>
            <button className="close-button" onClick={close}>
              나중에
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
