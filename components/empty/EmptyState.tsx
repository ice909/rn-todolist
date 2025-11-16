import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg';
import { StyleSheet, Text, View } from 'react-native';

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Svg width={240} height={200} viewBox="0 0 240 200" fill="none">
        <Rect
          x={75}
          y={70}
          width={90}
          height={100}
          rx={8}
          fill="white"
          stroke="#1F2937"
          strokeWidth={2}
        />

        <Path
          d="M95 70 L95 65 Q95 60 100 60 L140 60 Q145 60 145 65 L145 70"
          stroke="#1F2937"
          strokeWidth={2}
          fill="none"
        />

        <G>
          <Circle
            cx={92}
            cy={95}
            r={8}
            fill="#4772fa"
            stroke="#4772fa"
            strokeWidth={2}
          />
          <Path
            d="M89 95 L91.5 97.5 L95 93"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Line
            x1={108}
            y1={95}
            x2={148}
            y2={95}
            stroke="#D1D5DB"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </G>

        <G opacity={0.4}>
          <Circle
            cx={92}
            cy={120}
            r={8}
            fill="white"
            stroke="#1F2937"
            strokeWidth={2}
          />
          <Line
            x1={108}
            y1={120}
            x2={145}
            y2={120}
            stroke="#D1D5DB"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </G>

        <G opacity={0.3}>
          <Circle
            cx={92}
            cy={145}
            r={8}
            fill="white"
            stroke="#1F2937"
            strokeWidth={2}
          />
          <Line
            x1={108}
            y1={145}
            x2={140}
            y2={145}
            stroke="#D1D5DB"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </G>

        <Path
          d="M55 60 Q50 55 45 60"
          stroke="#D1D5DB"
          strokeWidth={1.5}
          strokeDasharray="3 3"
          fill="none"
        />
        <Circle
          cx={180}
          cy={70}
          r={12}
          stroke="#D1D5DB"
          strokeWidth={1.5}
          strokeDasharray="3 3"
          fill="none"
        />
        <Path
          d="M175 45 L176.5 48.5 L180 50 L176.5 51.5 L175 55 L173.5 51.5 L170 50 L173.5 48.5 Z"
          fill="#1F2937"
        />
        <Path
          d="M60 155 L61 157.5 L63.5 158.5 L61 159.5 L60 162 L59 159.5 L56.5 158.5 L59 157.5 Z"
          fill="#4772fa"
          opacity={0.6}
        />
        <Circle cx={50} cy={110} r={3} fill="#D1D5DB" />
        <Circle cx={185} cy={130} r={3} fill="#4772fa" opacity={0.5} />
      </Svg>
      <Text style={styles.title}>没有任务</Text>
      <Text style={styles.desc}>在这里记录任务和想法</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  desc: {
    fontSize: 14,
    color: '#6B7280',
  },
});
