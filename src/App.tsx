import './App.css';
import Desktop from './components/os/Desktop';
import { ThemeContextProvider } from './hooks/ThemeProvider';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './constants/global';
import { lightTheme, darkTheme } from './constants/themes';
import { useThemeMode } from './hooks/ThemeProvider';

function App() {
    const { theme, themeToggler } = useThemeMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;

    return (
        <div className="App">
            <ThemeContextProvider>
                <ThemeProvider theme={themeMode}>
                    <GlobalStyle />
                    <Desktop toggleTheme={themeToggler} />
                </ThemeProvider>
            </ThemeContextProvider>
        </div>
    );
}

export default App;