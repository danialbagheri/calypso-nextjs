import {createTheme, ThemeProvider} from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B00',
    },
    secondary: {
      main: '#226F61',
    },
    golden: {
      main: '#F5AF3F',
    },
    grey: {
      main: '#E2E2E2',
    },
    darkGrey: {
      main: '#414141',
    },
    sun: {main: '#F5AF3F'},
    palm: {
      main: '#226F61',
    },
    sand: {main: '#FCF5EC'},
    earth: {
      main: '#3C1510',
    },
    success: {main: '#2ECC71'},
    warning: {main: '#F1C40F'},
    failure: {main: '#E74C3C'},
    PFsand: {
      main: '#FFEFD6',
    },
    green: {
      main: '#226F61',
    },
  },
  spacing: 4,
  typography: {
    htmlFontSize: 10,
    fontWeightMedium: '500',
    h2: {
      fontFamily: 'Helvetica Neue, sans',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '38px !important',
      lineHeight: '46px',
    },
    h3: {
      fontWeight: 700,
      fontSize: '26px !important',
      lineHeight: '32px',
    },
    h4: {
      fontWeight: 400,
      fontSize: '18px !important',
      lineHeight: '21px',
    },
    h5: {
      fontFamily: 'Helvetica Neue, sans',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '18px !important',
      lineHeight: '20px',
    },
    h6: {
      fontFamily: 'Helvetica Neue, sans',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '16px !important',
      lineHeight: '20px',
    },
    subtitle1: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '12px !important',
      lineHeight: '15px',
    },
    body1: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '22px',
    },
    body2: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
    },
    body3: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '18px',
    },
    body4: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '17px',
    },
    PFInfo: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '28px',
      lineHeight: 'normal',
    },
    PFQuestion: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '22px',
      lineHeight: 'normal',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      ssm: 450,
      sm: 600,
      smd: 750,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1900,
    },
  },
})

export default function MUIThemeProvider(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}
