import { useThemeMode } from './theme-context';

export function useColorScheme() {
  const { theme } = useThemeMode();
  return theme;
}
