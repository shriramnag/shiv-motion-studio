import React, { useState } from 'react';
import { Player } from '@remotion/player';
import { ModernMotionVideo, TimelineLayer } from './Video';

export const App = () => {
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('9:16');
  const [durationSec, setDurationSec] = useState<number>(15);
  const [rawVideoUrl, setRawVideoUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [bgColor1, setBgColor1] = useState('#0a0d14');
  const [bgColor2, setBgColor2] = useState('#141c2b');

  // डिफ़ॉल्ट रूप से २ टाइमलाइन लेयर्स
  const [layers, setLayers] = useState<TimelineLayer[]>([
    {
      id: '1',
      type: 'text',
      content: 'Shiv AI Video Editor',
      startSec: 0,
      durationSec: 5,
      position: 'top',
      animation: '3d-pop',
      color: '#00FFA3',
      fontSize: 42,
    },
    {
      id: '2',
      type: 'emoji',
      content: '🔥',
      startSec: 2,
      durationSec: 4,
      position: 'center',
      animation: '3d-pop',
    },
  ]);

  // नई लेयर जोड़ने का फंक्शन
  const addLayer = (type: 'text' | 'image' | 'emoji') => {
    const newLayer: TimelineLayer = {
      id: Date.now().toString(),
      type,
      content: type === 'text' ? 'नया शीर्षक यहाँ लिखें' : type === 'emoji' ? '🚀' : 'https://picsum.photos/300/300',
      startSec: 1,
      durationSec: 4,
      position: 'center',
      animation: '3d-pop',
      color: '#FFD700',
      fontSize: 38,
    };
    setLayers([...layers, newLayer]);
  };

  // लेयर हटाने का फंक्शन
  const removeLayer = (id: string) => {
    setLayers(layers.filter((l) => l.id !== id));
  };

  // लेयर वैल्यू बदलने का फंक्शन
  const updateLayer = (id: string, key: keyof TimelineLayer, value: any) => {
    setLayers(
      layers.map((l) => (l.id === id ? { ...l, [key]: value } : l))
    );
  };

  const width = aspectRatio === '16:9' ? 1920 : 1080;
  const height = aspectRatio === '16:9' ? 1080 : 1920;
  const totalFrames = durationSec * 30;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#090a0f', color: '#fff', fontFamily: 'sans-serif' }}>
      {/* टॉप बार */}
      <header style={{ padding: '12px 20px', background: '#12151f', borderBottom: '1px solid #1f2433', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '18px', color: '#00FFA3' }}>⚡ Shiv Multi-Layer Motion Studio</h2>
        <span style={{ fontSize: '12px', background: '#1f2433', padding: '4px 12px', borderRadius: '14px', color: '#8c93a8' }}>
          Non-Linear Timeline Engine
        </span>
      </header>

      {/* मुख्य कार्यक्षेत्र */}
      <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1, padding: '16px', gap: '16px', justifyContent: 'center' }}>
        {/* बायां हिस्सा: लेयर मैनेजर और टाइमलाइन कंट्रोल्स */}
        <div style={{ flex: '1 1 380px', maxWidth: '480px', background: '#12151f', padding: '18px', borderRadius: '12px', border: '1px solid #1f2433', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '86vh', overflowY: 'auto' }}>
          {/* १. प्रोजेक्ट सेटिंग्स (साइज और लंबाई) */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setAspectRatio('9:16')}
              style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', background: aspectRatio === '9:16' ? '#00FFA3' : '#1f2433', color: aspectRatio === '9:16' ? '#000' : '#fff', fontWeight: 'bold', cursor: 'pointer' }}
            >
              📱 Shorts (9:16)
            </button>
            <button
              onClick={() => setAspectRatio('16:9')}
              style={{ flex: 1, padding: '8px', borderRadius: '6px', border: 'none', background: aspectRatio === '16:9' ? '#00FFA3' : '#1f2433', color: aspectRatio === '16:9' ? '#000' : '#fff', fontWeight: 'bold', cursor: 'pointer' }}
            >
              🖥️ YouTube (16:9)
            </button>
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#8c93a8' }}>कुल वीडियो अवधि: {durationSec} सेकंड</label>
            <input type="range" min="5" max="60" step="1" value={durationSec} onChange={(e) => setDurationSec(Number(e.target.value))} style={{ width: '100%', accentColor: '#00FFA3', cursor: 'pointer' }} />
          </div>

          {/* २. बेस मीडिया इनपुट (रॉ वीडियो और ऑडियो) */}
          <div>
            <label style={{ fontSize: '11px', color: '#8c93a8' }}>रॉ वीडियो URL / लिंक (वैकल्पिक)</label>
            <input placeholder="https://... mp4 वीडियो लिंक" value={rawVideoUrl} onChange={(e) => setRawVideoUrl(e.target.value)} style={{ width: '100%', padding: '7px', borderRadius: '6px', background: '#090a0f', border: '1px solid #232838', color: '#fff', boxSizing: 'border-box', fontSize: '12px' }} />
          </div>

          <div>
            <label style={{ fontSize: '11px', color: '#8c93a8' }}>वॉयसओवर / ऑडियो URL (वैकल्पिक)</label>
            <input placeholder="https://... mp3 ऑडियो लिंक" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} style={{ width: '100%', padding: '7px', borderRadius: '6px', background: '#090a0f', border: '1px solid #232838', color: '#fff', boxSizing: 'border-box', fontSize: '12px' }} />
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #1f2433', margin: '4px 0' }} />

          {/* ३. नई लेयर जोड़ने के बटन */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#00FFA3' }}>+ नई टाइमलाइन लेयर जोड़ें</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <button onClick={() => addLayer('text')} style={{ flex: 1, padding: '7px', borderRadius: '6px', border: 'none', background: '#2563eb', color: '#fff', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>+ टेक्स्ट</button>
              <button onClick={() => addLayer('image')} style={{ flex: 1, padding: '7px', borderRadius: '6px', border: 'none', background: '#9333ea', color: '#fff', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>+ PNG इमेज</button>
              <button onClick={() => addLayer('emoji')} style={{ flex: 1, padding: '7px', borderRadius: '6px', border: 'none', background: '#d97706', color: '#fff', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>+ इमोजी</button>
            </div>
          </div>

          {/* ४. एक्टिव लेयर्स लिस्ट और टाइमिंग कंट्रोल */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
            {layers.map((l, index) => (
              <div key={l.id} style={{ background: '#090a0f', border: '1px solid #1f2433', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#00FFA3', textTransform: 'uppercase' }}>
                    लेयर {index + 1}: {l.type}
                  </span>
                  <button onClick={() => removeLayer(l.id)} style={{ border: 'none', background: '#ef4444', color: '#fff', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', cursor: 'pointer' }}>हटाएं</button>
                </div>

                {/* कंटेंट इनपुट */}
                <input
                  value={l.content}
                  onChange={(e) => updateLayer(l.id, 'content', e.target.value)}
                  placeholder={l.type === 'image' ? 'PNG इमेज का URL' : 'सामग्री'}
                  style={{ width: '100%', padding: '6px', borderRadius: '5px', background: '#12151f', border: '1px solid #232838', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                />

                {/* टाइमिंग: स्टार्ट सेकंड और लंबाई */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10px', color: '#8c93a8' }}>शुरू (सेकंड): {l.startSec}s</label>
                    <input type="number" min="0" max={durationSec} step="0.5" value={l.startSec} onChange={(e) => updateLayer(l.id, 'startSec', Number(e.target.value))} style={{ width: '100%', padding: '4px', borderRadius: '4px', background: '#12151f', border: '1px solid #232838', color: '#fff', fontSize: '11px', boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10px', color: '#8c93a8' }}>दिखेगा (अवधि): {l.durationSec}s</label>
                    <input type="number" min="0.5" max={durationSec} step="0.5" value={l.durationSec} onChange={(e) => updateLayer(l.id, 'durationSec', Number(e.target.value))} style={{ width: '100%', padding: '4px', borderRadius: '4px', background: '#12151f', border: '1px solid #232838', color: '#fff', fontSize: '11px', boxSizing: 'border-box' }} />
                  </div>
                </div>

                {/* पोज़ीशन और स्टाइल */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select value={l.position} onChange={(e) => updateLayer(l.id, 'position', e.target.value)} style={{ flex: 1, padding: '4px', borderRadius: '4px', background: '#12151f', border: '1px solid #232838', color: '#fff', fontSize: '11px' }}>
                    <option value="top">ऊपर (Top)</option>
                    <option value="center">बीच में (Center)</option>
                    <option value="bottom">नीचे (Bottom)</option>
                  </select>

                  <select value={l.animation} onChange={(e) => updateLayer(l.id, 'animation', e.target.value)} style={{ flex: 1, padding: '4px', borderRadius: '4px', background: '#12151f', border: '1px solid #232838', color: '#fff', fontSize: '11px' }}>
                    <option value="3d-pop">👑 3D Pop</option>
                    <option value="slide-up">⬆️ Slide Up</option>
                    <option value="fade">✨ Fade In</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* दायां हिस्सा: लाइव मल्टी-लेयर प्लेयर */}
        <div style={{ flex: '2 1 450px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#12151f', padding: '20px', borderRadius: '12px', border: '1px solid #1f2433' }}>
          <div style={{ width: '100%', maxWidth: aspectRatio === '9:16' ? '300px' : '600px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.8)' }}>
            <Player
              component={ModernMotionVideo}
              inputProps={{
                rawVideoUrl,
                audioUrl,
                bgColor1,
                bgColor2,
                layers,
              }}
              durationInFrames={totalFrames}
              compositionWidth={width}
              compositionHeight={height}
              fps={30}
              style={{ width: '100%', height: 'auto' }}
              controls
              autoPlay
              loop
            />
          </div>
          <p style={{ marginTop: '14px', color: '#8c93a8', fontSize: '12px', textAlign: 'center' }}>
            लाइव टाइमलाइन प्लेयर • जो लेयर जिस सेकंड पर सेट है, वह ठीक उसी समय स्क्रीन पर दिखेगी और गायब होगी।
          </p>
        </div>
      </div>
    </div>
  );
};
