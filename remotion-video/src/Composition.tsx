import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Composition,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {
  title: string;
  subtitle: string;
};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: "Your Video Starts Here",
        subtitle: "Made with Remotion",
      }}
      calculateMetadata={calculateMetadata}
    />
  );
};

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${interpolate(
          frame,
          [0, durationInFrames],
          [120, 200],
        )}deg, #0b1d3a, #3b1e6e)`,
      }}
    />
  );
};

const Title: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name="Title"
      style={{
        fontFamily: "Inter, Helvetica, Arial, sans-serif",
        fontSize: 120,
        fontWeight: 800,
        color: "white",
        textAlign: "center",
        letterSpacing: -2,
        opacity: interpolate(frame, [0, 0.8 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [0, 1 * fps], ["0px 60px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      {text}
    </Interactive.Div>
  );
};

const Underline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name="Underline"
      style={{
        height: 10,
        borderRadius: 5,
        marginTop: 36,
        background: "linear-gradient(90deg, #4cc9f0, #f72585)",
        width: interpolate(frame, [0.6 * fps, 1.6 * fps], [0, 640], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
      }}
    />
  );
};

const Subtitle: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name="Subtitle"
      style={{
        fontFamily: "Inter, Helvetica, Arial, sans-serif",
        fontSize: 52,
        fontWeight: 500,
        color: "rgba(255,255,255,0.85)",
        marginTop: 36,
        opacity: interpolate(frame, [1.2 * fps, 2 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {text}
    </Interactive.Div>
  );
};

const FadeOut: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        opacity: interpolate(
          frame,
          [durationInFrames - 0.6 * fps, durationInFrames],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
      }}
    />
  );
};

export const MyComponent: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Title text={title} />
        <Underline />
        <Subtitle text={subtitle} />
      </AbsoluteFill>
      <FadeOut />
    </AbsoluteFill>
  );
};
