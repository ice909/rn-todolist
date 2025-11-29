import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg';
import { StyleSheet, Text, View } from 'react-native';

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Svg width={240} height={200} viewBox="0 0 240 200" fill="none">
        <Circle cx={120} cy={100} r={80} fill="#4772fa" opacity={0.03} />

        <Circle cx={50} cy={80} r={4} fill="#F8B31C" opacity={0.4} />
        <Circle cx={200} cy={60} r={6} fill="#4772fa" opacity={0.1} />

        <Rect x={80} y={40} width={80} height={110} rx={12} fill="#F3F4F6" />

        <Rect x={90} y={55} width={60} height={85} rx={4} fill="white" />

        <Rect x={98} y={75} width={44} height={4} rx={2} fill="#E5E7EB" />
        <Rect x={98} y={87} width={44} height={4} rx={2} fill="#E5E7EB" />
        <Rect x={98} y={99} width={28} height={4} rx={2} fill="#E5E7EB" />

        <Rect x={105} y={35} width={30} height={12} rx={4} fill="#4772fa" />

        <G transform="translate(135, 115)">
          <Circle
            cx={15}
            cy={15}
            r={18}
            fill="#4772fa"
            stroke="white"
            strokeWidth={3}
          />
          <Path
            d="M9 15 L13 19 L21 11"
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>

        <Path
          d="M190 140 L192 144 L196 146 L192 148 L190 152 L188 148 L184 146 L188 144 Z"
          fill="#D74A46"
          opacity={0.6}
        />
        <Circle cx={60} cy={140} r={3} fill="#4772fa" opacity={0.3} />
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
