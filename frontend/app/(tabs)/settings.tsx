import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeMode } from '@/hooks/theme-context';

const featureList = [
  { title: 'Pump alerts', subtitle: 'Push + SMS when pressure drifts' },
  { title: 'Maintenance reminder', subtitle: 'Filter swap every 14 days' },
];

export default function SettingsScreen() {
  const scheme = useColorScheme();
  const palette = Colors[scheme];
  const { theme, setTheme } = useThemeMode();
  const isDark = theme === 'dark';

  return (
    <ScrollView
      style={{ backgroundColor: palette.background }}
      contentContainerStyle={styles.content}>
      <View style={[styles.profileCard, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <View style={[styles.avatar, { borderColor: palette.border, backgroundColor: palette.background }]}>
          <Text style={[styles.avatarInitial, { color: palette.text }]}>HO</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={[styles.profileName, { color: palette.text }]}>Hydrigo Operator</Text>
          <Text style={[styles.profileRole, { color: palette.muted }]}>IoT Supervisor</Text>
          <Text style={[styles.profileMeta, { color: palette.muted }]}>Node ID • HG-09</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <Text style={[styles.sectionTitle, { color: palette.text }]}>Appearance</Text>
        <View style={styles.themeRow}>
          <View>
            <Text style={[styles.themeTitle, { color: palette.text }]}>Dark mode</Text>
            <Text style={[styles.themeSubtitle, { color: palette.muted }]}>Switch between black & white palettes</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
            trackColor={{ false: 'rgba(0,0,0,0.2)', true: 'rgba(255,255,255,0.3)' }}
            thumbColor={isDark ? '#FFFFFF' : '#000000'}
            ios_backgroundColor="rgba(0,0,0,0.2)"
          />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <Text style={[styles.sectionTitle, { color: palette.text }]}>Controls</Text>
        {featureList.map((feature) => (
          <View key={feature.title} style={[styles.featureRow, { borderBottomColor: palette.border }]}>
            <View>
              <Text style={[styles.featureTitle, { color: palette.text }]}>{feature.title}</Text>
              <Text style={[styles.featureSubtitle, { color: palette.muted }]}>{feature.subtitle}</Text>
            </View>
            <View style={[styles.chevron, { borderColor: palette.border }]}>
              <Text style={[styles.chevronText, { color: palette.text }]}>›</Text>
            </View>
          </View>
        ))}
        <View style={styles.inlineActions}>
          <InlineStat label="Secure mode" value="PIN enabled" palette={palette} />
          <InlineStat label="Alerts" value="3 active" palette={palette} />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: palette.surface, borderColor: palette.border }]}>
        <Text style={[styles.sectionTitle, { color: palette.text }]}>Quick actions</Text>
        <View style={styles.quickActions}>
          <QuickAction label="Pause Pump" value="3 min" palette={palette} />
          <QuickAction label="Prime Line" value="Ready" palette={palette} />
          <QuickAction label="Sync IoT" value="Now" palette={palette} />
        </View>
      </View>
    </ScrollView>
  );
}

type Palette = (typeof Colors)['light'];

type InlineStatProps = {
  label: string;
  value: string;
  palette: Palette;
};

function InlineStat({ label, value, palette }: InlineStatProps) {
  return (
    <View style={[styles.inlineStat, { borderColor: palette.border, backgroundColor: palette.surface }]}>
      <Text style={[styles.inlineLabel, { color: palette.muted }]}>{label}</Text>
      <Text style={[styles.inlineValue, { color: palette.text }]}>{value}</Text>
    </View>
  );
}

type QuickActionProps = {
  label: string;
  value: string;
  palette: Palette;
};

function QuickAction({ label, value, palette }: QuickActionProps) {
  return (
    <View
      style={[styles.quickAction, { borderColor: palette.border, backgroundColor: palette.surface }]}
    >
      <Text style={[styles.quickActionLabel, { color: palette.muted }]}>{label}</Text>
      <Text style={[styles.quickActionValue, { color: palette.text }]}>{value}</Text>
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
  profileCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 20,
    fontWeight: '700',
  },
  profileCopy: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
  },
  profileRole: {
    fontSize: 14,
    marginTop: 4,
  },
  profileMeta: {
    fontSize: 13,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  themeSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  featureSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  chevron: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronText: {
    fontSize: 20,
  },
  inlineActions: {
    flexDirection: 'row',
    gap: 12,
  },
  inlineStat: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    flex: 1,
  },
  inlineLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inlineValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  quickAction: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    flexBasis: '30%',
    flexGrow: 1,
  },
  quickActionLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quickActionValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
  },
});
