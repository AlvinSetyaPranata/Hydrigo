import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const pumpStatus = {
  label: 'Water Pump Alpha',
  state: 'Running',
  mode: 'Automatic mode',
  heartbeat: 'Last heartbeat • 2 min ago',
  uptime: 'Uptime • 36h 12m',
};

const metrics = [
  { title: 'Humidity', value: '68%', detail: 'Greenhouse ambient' },
  { title: 'Water level', value: '75%', detail: 'Reservoir capacity' },
  { title: 'Flow rate', value: '42 L/min', detail: 'Outlet velocity' },
  { title: 'Pressure', value: '1.3 bar', detail: 'Line pressure' },
  { title: 'Temperature', value: '26°C', detail: 'Pump casing' },
  { title: 'TDS', value: '320 ppm', detail: 'Water quality' },
];

const signalSummary = [
  { label: 'IoT Node', value: 'HG-09 Sync' },
  { label: 'Battery', value: '91% • Stable' },
  { label: 'Valve', value: 'Zone 3 open' },
];

type Palette = (typeof Colors)['light'];

export default function HomeScreen() {
  const scheme = useColorScheme();
  const palette = Colors[scheme];

  return (
    <ScrollView
      style={{ backgroundColor: palette.background }}
      contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <Text style={[styles.overline, { color: palette.muted }]}>{pumpStatus.label}</Text>
        <Text style={[styles.status, { color: palette.text }]}>{pumpStatus.state}</Text>
        <Text style={[styles.mode, { color: palette.text }]}>{pumpStatus.mode}</Text>
        <View style={styles.statusRow}>
          <StatusItem label="Heartbeat" value="2 min ago" color={palette.muted} textColor={palette.text} />
          <StatusItem label="Uptime" value="36h 12m" color={palette.muted} textColor={palette.text} />
        </View>
        <View style={styles.signalRow}>
          {signalSummary.map((item) => (
            <View
              key={item.label}
              style={[styles.signalPill, { borderColor: palette.border, backgroundColor: palette.background }]}
            >
              <Text style={[styles.signalLabel, { color: palette.muted }]}>{item.label}</Text>
              <Text style={[styles.signalValue, { color: palette.text }]}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View>
        <Text style={[styles.sectionTitle, { color: palette.text }]}>Live statistics</Text>
        <View style={styles.metricGrid}>
          {metrics.map((metric) => (
            <MetricCard key={metric.title} palette={palette} metric={metric} />
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <Text style={[styles.sectionTitle, { color: palette.text }]}>Environment timeline</Text>
        <TimelineRow
          palette={palette}
          title="Soil moisture"
          primary="54%"
          subtitle="Irrigation in 18 min"
        />
        <TimelineRow
          palette={palette}
          title="Reservoir refresh"
          primary="Next cycle 22:00"
          subtitle="Pump schedule synced"
        />
        <TimelineRow
          palette={palette}
          title="Last maintenance"
          primary="12 days ago"
          subtitle="Filter swap not required"
        />
      </View>
    </ScrollView>
  );
}

type MetricCardProps = {
  palette: Palette;
  metric: { title: string; value: string; detail: string };
};

function MetricCard({ palette, metric }: MetricCardProps) {
  return (
    <View style={[styles.metricCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
      <Text style={[styles.metricLabel, { color: palette.muted }]}>{metric.title}</Text>
      <Text style={[styles.metricValue, { color: palette.text }]}>{metric.value}</Text>
      <Text style={[styles.metricDetail, { color: palette.muted }]}>{metric.detail}</Text>
    </View>
  );
}

type TimelineRowProps = {
  palette: Palette;
  title: string;
  primary: string;
  subtitle: string;
};

function TimelineRow({ palette, title, primary, subtitle }: TimelineRowProps) {
  return (
    <View style={[styles.timelineRow, { borderBottomColor: palette.border }]}>
      <View>
        <Text style={[styles.timelineTitle, { color: palette.text }]}>{title}</Text>
        <Text style={[styles.timelineSubtitle, { color: palette.muted }]}>{subtitle}</Text>
      </View>
      <Text style={[styles.timelinePrimary, { color: palette.text }]}>{primary}</Text>
    </View>
  );
}

type StatusItemProps = {
  label: string;
  value: string;
  color: string;
  textColor: string;
};

function StatusItem({ label, value, color, textColor }: StatusItemProps) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={[styles.statusLabel, { color }]}>{label}</Text>
      <Text style={[styles.statusValue, { color: textColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    gap: 24,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    gap: 16,
  },
  overline: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
  },
  status: {
    fontSize: 32,
    fontWeight: '700',
  },
  mode: {
    fontSize: 18,
    fontWeight: '500',
  },
  statusRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statusLabel: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  signalRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  signalPill: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexGrow: 1,
    minWidth: '30%',
  },
  signalLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  signalValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    width: '48%',
    minHeight: 120,
    justifyContent: 'space-between',
  },
  metricLabel: {
    fontSize: 13,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  metricDetail: {
    fontSize: 13,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  timelineSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  timelinePrimary: {
    fontSize: 16,
    fontWeight: '700',
  },
});
