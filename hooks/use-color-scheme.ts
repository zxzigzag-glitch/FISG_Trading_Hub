import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

export type ThemePreference = 'system' | 'dark' | 'light';
type ResolvedScheme = 'dark' | 'light';

type ThemePreferenceContextValue = {
	preference: ThemePreference;
	setPreference: (preference: ThemePreference) => void;
};

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | undefined>(undefined);

export function ThemePreferenceProvider({
	children,
	defaultPreference = 'dark',
}: {
	children: React.ReactNode;
	defaultPreference?: ThemePreference;
}) {
	const [preference, setPreference] = useState<ThemePreference>(defaultPreference);

	const value = useMemo(
		() => ({ preference, setPreference }),
		[preference]
	);

	return React.createElement(ThemePreferenceContext.Provider, { value }, children);
}

export function useThemePreference() {
	const ctx = useContext(ThemePreferenceContext);
	if (!ctx) {
		return {
			preference: 'dark' as ThemePreference,
			setPreference: (_preference: ThemePreference) => {},
		};
	}
	return ctx;
}

export function useColorScheme(): ResolvedScheme {
	const systemScheme = useRNColorScheme();
	const { preference } = useThemePreference();

	if (preference === 'dark' || preference === 'light') {
		return preference;
	}

	return systemScheme ?? 'dark';
}
