import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { useMemo } from 'react';
// @mui
import { alpha, ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
//
import { useSettingsContext } from './SettingsContext';
import { purplePreset } from './presets';

// ----------------------------------------------------------------------

ThemeColorPresets.propTypes = {
  children: PropTypes.node,
};

export default function ThemeColorPresets({ children }) {
  const outerTheme = useTheme();

  const { purplePreset } = useSettingsContext();

  const themeOptions = useMemo(
    () => ({
      palette: {
        primary: purplePreset,
      },
      customShadows: {
        primary: `0 8px 16px 0 ${alpha(purplePreset.main, 0.24)}`,
      },
    }),
    [purplePreset]
  );

  const theme = createTheme(merge(outerTheme, themeOptions));

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
