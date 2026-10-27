import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface VideoProps {
  titleText: string;
  subtitleText: string;
  bgColor1: string;
  bgColor2: string;
  textColor: string;
}

export const MainVideo: React.FC<VideoProps> = ({
  titleText = "Shiv AI Motion",
  subtitleText = "Canva Style Web Video Studio",
  bgColor1 = "#1e1e2f",
  bgColor2 = "#0f0c29",
  textColor = "#00FFA3",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // टेक्स्ट बाउंस एनिमेशन
  const scale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  // फेड-इन इफ़ेक्ट
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${bgColor1} 0%, ${bgColor2} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ transform: `scale(${scale})`, opacity: opacity, textAlign: 'center', padding: '20px' }}>
        <h1
          style={{
            fontSize: '70px',
            color: textColor,
            margin: '0',
            fontWeight: 'bold',
            textShadow: `0 0 25px ${textColor}88`,
          }}
        >
          {titleText}
        </h1>
        <p
          style={{
            fontSize: '32px',
            color: '#FFFFFF',
            marginTop: '25px',
            letterSpacing: '2px',
          }}
        >
          {subtitleText}
        </p>
      </div>
    </AbsoluteFill>
  );
};
