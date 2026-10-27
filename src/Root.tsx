import { Composition } from 'remotion';
import { MainVideo } from './Video';

export const RemotionRoot = () => {
  return (
    <Composition
      id="MainVideo"
      component={MainVideo}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        titleText: "Shiv AI Motion",
        subtitleText: "Canva Style Web Video Studio",
        bgColor1: "#1e1e2f",
        bgColor2: "#0f0c29",
        textColor: "#00FFA3",
      }}
    />
  );
};
