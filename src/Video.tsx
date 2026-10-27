import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Audio,
  Img,
  Video,
} from 'remotion';

export interface TimelineLayer {
  id: string;
  type: 'text' | 'image' | 'emoji';
  content: string; // टेक्स्ट, इमेज URL या इमोजी
  startSec: number; // किस सेकंड पर शुरू होगा
  durationSec: number; // कितने सेकंड तक दिखेगा
  position: 'top' | 'center' | 'bottom';
  animation: '3d-pop' | 'slide-up' | 'fade';
  color?: string;
  bgColor?: string;
  fontSize?: number;
}

export interface MultiLayerProjectProps {
  rawVideoUrl?: string;
  audioUrl?: string;
  bgColor1: string;
  bgColor2: string;
  layers: TimelineLayer[];
}

// हर स्वतंत्र लेयर का एनिमेटेड कंपोनेंट
const AnimatedLayerItem: React.FC<{ layer: TimelineLayer }> = ({ layer }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const isVertical = width < 1200;

  // 3D Pop स्प्रिंग
  const popScale = spring({ frame, fps, config: { damping: 10, mass: 0.5 } });

  // Slide Up
  const slideY = interpolate(frame, [0, 15], [80, 0], { extrapolateRight: 'clamp' });

  // Fade
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  // 3D रोटेशन इफ़ेक्ट
  const rotateY = Math.sin(frame / 12) * 6;

  let transformStyle = 'none';
  if (layer.animation === '3d-pop') {
    transformStyle = `perspective(800px) scale(${popScale}) rotateY(${rotateY}deg)`;
  } else if (layer.animation === 'slide-up') {
    transformStyle = `translateY(${slideY}px)`;
  }

  // पोज़ीशन स्टाइल
  let justifyStyle = 'center';
  if (layer.position === 'top') justifyStyle = 'flex-start';
  if (layer.position === 'bottom') justifyStyle = 'flex-end';

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: justifyStyle,
        alignItems: 'center',
        padding: isVertical ? '40px 20px' : '50px 40px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          transform: transformStyle,
          opacity: opacity,
          textAlign: 'center',
          transformStyle: 'preserve-3d',
        }}
      >
        {layer.type === 'text' && (
          <h2
            style={{
              fontSize: (layer.fontSize || 48) * (isVertical ? 1 : 1.3) + 'px',
              color: layer.color || '#00FFA3',
              margin: 0,
              fontWeight: 900,
              textShadow: '0 4px 15px rgba(0,0,0,0.8), 0 0 25px rgba(0,255,163,0.5)',
              background: layer.bgColor || 'rgba(0, 0, 0, 0.6)',
              padding: '10px 24px',
              borderRadius: '12px',
              border: `2px solid ${layer.color || '#00FFA3'}`,
            }}
          >
            {layer.content}
          </h2>
        )}

        {layer.type === 'emoji' && (
          <div
            style={{
              fontSize: isVertical ? '85px' : '110px',
              filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.7))',
            }}
          >
            {layer.content}
          </div>
        )}

        {layer.type === 'image' && (
          <Img
            src={layer.content}
            style={{
              maxWidth: isVertical ? '240px' : '340px',
              maxHeight: isVertical ? '240px' : '340px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.8))',
              borderRadius: '12px',
            }}
          />
        )}
      </div>
    </div>
  );
};

export const ModernMotionVideo: React.FC<MultiLayerProjectProps> = ({
  rawVideoUrl = '',
  audioUrl = '',
  bgColor1 = '#0f2027',
  bgColor2 = '#203a43',
  layers = [],
}) => {
  const { fps, width } = useVideoConfig();
  const isVertical = width < 1200;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${bgColor1} 0%, ${bgColor2} 100%)`,
        overflow: 'hidden',
        fontFamily: 'sans-serif',
      }}
    >
      {/* १. बेस रॉ वीडियो लेयर (अगर दी गई है) */}
      {rawVideoUrl && (
        <>
          {/* बैकग्राउंड ब्लर वीडियो (9:16 में ऑटो-रिफ्रेम के लिए) */}
          {isVertical && (
            <Video
              src={rawVideoUrl}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'blur(25px) brightness(0.6)',
              }}
            />
          )}

          {/* मुख्य वीडियो (सेंटर में बिना कटे) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Video
              src={rawVideoUrl}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              }}
            />
          </div>
        </>
      )}

      {/* २. बेस ऑडियो लेयर */}
      {audioUrl && <Audio src={audioUrl} />}

      {/* ३. स्वतंत्र टाइमलाइन लेयर्स (Sequence Engine) */}
      {layers.map((layer) => {
        const fromFrame = Math.round(layer.startSec * fps);
        const durationFrames = Math.max(1, Math.round(layer.durationSec * fps));

        return (
          <Sequence
            key={layer.id}
            from={fromFrame}
            durationInFrames={durationFrames}
          >
            <AnimatedLayerItem layer={layer} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
