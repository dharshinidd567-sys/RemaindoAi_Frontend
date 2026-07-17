
import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Summary } from '../../screens/home/task_page/task_screen_types';
import { styles, COLORS } from './progresscard_styles';

interface ProgressCardProps {
  summary: Summary;
}

const SIZE = 64;
const STROKE = 7;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ProgressCard({ summary }: ProgressCardProps) {
  const { total, done, pending, overdue, percent } = summary;
  const dashOffset = CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;

  return (
    <View style={styles.card}>
      <View style={styles.ringWrap}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={COLORS.ringTrack}
            strokeWidth={STROKE}
            fill="none"
          />
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={COLORS.ringActive}
            strokeWidth={STROKE}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            fill="none"
            rotation="-90"
            origin={`${SIZE / 2}, ${SIZE / 2}`}
          />
        </Svg>
        <Text style={styles.percentText}>{percent}%</Text>
      </View>

      <View style={styles.infoWrap}>
        <Text style={styles.doneText}>
          {done} of {total} done
        </Text>
        <Text style={styles.subText}>Great progress today! 🔥</Text>

        <View style={styles.pillRow}>
          <View style={[styles.pill, styles.pillPending]}>
            <Text style={styles.pillTextPending}>{pending} pending</Text>
          </View>
          <View style={[styles.pill, styles.pillOverdue]}>
            <Text style={styles.pillTextOverdue}>{overdue} overdue</Text>
          </View>
        </View>
      </View>
    </View>
  );
}