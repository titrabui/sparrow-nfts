import React from 'react';
import { useAppSelector } from 'hooks';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'styles/appTheme';
import GlobalStyles from 'styles/globalStyles';
import CommonHeader from './Header/Header';
import { selectTheme } from 'store/ducks/theme/slice';

const CommonLayout: React.FC = (props) => {
  const theme = useAppSelector(selectTheme);
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <CommonHeader />
      {props.children}
    </ThemeProvider>
  );
};

export default CommonLayout;
