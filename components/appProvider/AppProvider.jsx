import * as React from 'react'
import {MUIThemeProvider} from 'components/MUIThemeProvider'

const AppContext = React.createContext(undefined)

function AppProvider(props) {
  const initState = {
    searchValues: {
      value: '',
      results: [],
      count: 0,
    },
    productQuestions: [],
  }
  const [appState, setAppState] = React.useState(initState)

  const value = [appState, setAppState]
  return (
    <MUIThemeProvider>
      <AppContext.Provider value={value} {...props} />
    </MUIThemeProvider>
  )
}

export {AppProvider, AppContext}
