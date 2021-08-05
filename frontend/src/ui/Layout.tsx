import React from 'react';
import { useAppSelector } from 'hooks';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from 'styles/appTheme';
import GlobalStyles from 'styles/globalStyles';
import Header from './Header/Header';
import { selectTheme } from 'store/ducks/theme/slice';
import Footer from './Footer';

const CommonLayout: React.FC = (props) => {
  const theme = useAppSelector(selectTheme);
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Header />
      {props.children}
      <Footer/>
    </ThemeProvider>
  );
};

export default CommonLayout;
