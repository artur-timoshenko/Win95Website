import { createGlobalStyle, withTheme } from 'styled-components';
import { ThemeProps } from './themes';

type GlobalThemeProps = {
    theme: ThemeProps;
};

const globalStyle = createGlobalStyle`
  html, body {
    background-color: ${({ theme }: GlobalThemeProps) => theme.background};
  }

  input {
    color: ${({ theme }: GlobalThemeProps) => theme.input_text};
    background-color: ${({ theme }: GlobalThemeProps) => theme.background};
  }

  textarea {
      color: ${({ theme }: GlobalThemeProps) => theme.input_text};
      background-color: ${({ theme }: GlobalThemeProps) => theme.background};
  }

  textarea:focus,
  textarea:active,
  input:focus,
  input:active {
      color: ${({ theme }: GlobalThemeProps) => theme.input_text};
      background-color: ${({ theme }: GlobalThemeProps) => theme.input_background};
  }

  ::placeholder {
    color: ${({ theme }: GlobalThemeProps) => theme.placeholder};
  }

  ::-ms-input-placeholder { /* Edge 12 -18 */
    color: ${({ theme }: GlobalThemeProps) => theme.placeholder};
  }

  .big-button-container:hover {
    background-color: ${({ theme }: GlobalThemeProps) => theme.surface_hover}; 
  }

  .button-border {
    background: ${({ theme }: GlobalThemeProps) => theme.surface_hover}; 
  }
  
  .site-button {
    background: ${({ theme }: GlobalThemeProps) => theme.surface_hover}; 
    color: ${({ theme }: GlobalThemeProps) => theme.text};
  }

  .site-button:hover {
    background-color: ${({ theme }: GlobalThemeProps) => theme.surface_hover};
  }

  .router-link:link {
    color: ${({ theme }: GlobalThemeProps) => theme.a_link};
  }

  .router-link:visited {
    color: ${({ theme }: GlobalThemeProps) => theme.a_visited};
  }

  a:link {
    color: ${({ theme }: GlobalThemeProps) => theme.a_link};
  }
  a:visited {
    color: ${({ theme }: GlobalThemeProps) => theme.a_visited};
  }

  #showcase {
    background-color: ${({ theme }: GlobalThemeProps) => theme.background}; 
    color: ${({ theme }: GlobalThemeProps) => theme.text};
  }

  #hereIndicator {
    border-color: ${({ theme }: GlobalThemeProps) => theme.a_visited};
  }

  #resumeContainer {
    border: 2px solid ${({ theme }: GlobalThemeProps) => theme.text};
  }

  #credits-app {
    background-color: ${({ theme }: GlobalThemeProps) => theme.background};
    color: ${({ theme }: GlobalThemeProps) => theme.text};
  }

`;

export default withTheme(globalStyle);