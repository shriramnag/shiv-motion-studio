import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { MainVideo } from './Video';

export const App = () => {
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('9:16');
  const [titleText, setTitleText] = useState('Shiv AI Motion');
  const [subtitleText, setSubtitleText] = useState('आधुनिक मोशन ग्राफ़िक्स एडिटर');
  const [textColor, setTextColor] = useState('#00FFA3');
  const [bgColor1, setBgColor1] = useState('#1e1e2f');
  const [bgColor2, setBgColor2] = useState('#0f0c29');

  const width = aspectRatio === '16:9' ? 1920 : 1080;
  const height = aspectRatio === '16:9' ? 1080 : 1920;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0e1017' }}>
      {/* टॉप बार */}
      <header style={{ padding: '16px 24px', background: '#161922', borderBottom: '1px solid #232736', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '20px', color: '#00FFA3' }}>✨ Shiv Motion Studio</h2>
        <span style={{ fontSize: '13px', background: '#232736', padding: '6px 12px', borderRadius: '20px', color: '#a0a5b5' }}>Canva Style Web App</span>
      </header>

      {/* मुख्य लेआउट */}
      <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1, padding: '16px', gap: '20px', justifyContent: 'center' }}>

        {/* बायां हिस्सा: कंट्रोल पैनल */}
        <div style={{ flex: '1 1 340px', maxWidth: '420px', background: '#161922', padding: '20px', borderRadius: '12px', border: '1px solid #232736', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* वीडियो साइज टॉगल */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#8c93a8' }}>वीडियो साइज</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button
                onClick={() => setAspectRatio('9:16')}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: aspectRatio === '9:16' ? '#00FFA3' : '#232736', color: aspectRatio === '9:16' ? '#000' : '#fff', fontWeight: 'bold', cursor: 'pointer' }}
              >
                📱 Shorts (9:16)
              </button>
              <button
                onClick={() => setAspectRatio('16:9')}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: aspectRatio === '16:9' ? '#00FFA3' : '#232736', color: aspectRatio === '16:9' ? '#000' : '#fff', fontWeight: 'bold', cursor: 'pointer' }}
              >
                🖥️ YouTube (16:9)
              </button>
            </div>
          </div>

          {/* टेक्स्ट इनपुट्स */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#8c93a8' }}>मुख्य शीर्षक (Title)</label>
            <input
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', background: '#0e1017', border: '1px solid #2b3042', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#8c93a8' }}>उप-शीर्षक (Subtitle)</label>
            <input
              value={subtitleText}
              onChange={(e) => setSubtitleText(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', background: '#0e1017', border: '1px solid #2b3042', color: '#fff', boxSizing: 'border-box' }}
            />
          </div>

          {/* कलर सेटिंग्स */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#8c93a8' }}>टेक्स्ट का रंग</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              style={{ width: '100%', height: '36px', marginTop: '6px', borderRadius: '6px', border: 'none', background: 'transparent', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* दायां हिस्सा: लाइव प्रीव्यू प्लेयर */}
        <div style={{ flex: '2 1 450px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#161922', padding: '20px', borderRadius: '12px', border: '1px solid #232736' }}>
          <div style={{ width: '100%', maxWidth: aspectRatio === '9:16' ? '320px' : '640px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }}>
            <Player
              component={MainVideo}
              inputProps={{
                titleText,
                subtitleText,
                bgColor1,
                bgColor2,
                textColor,
              }}
              durationInFrames={150}
              compositionWidth={width}
              compositionHeight={height}
              fps={30}
              style={{ width: '100%', height: 'auto' }}
              controls
              autoPlay
              loop
            />
          </div>
        </div>
      </div>
    </div>
  );
};