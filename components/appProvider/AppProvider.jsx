import * as React from 'react'

const AppContext = React.createContext(undefined)

function AppProvider(props) {
  const initState = {
    searchValues:{
      value: '',
      results:[]
    }
  }
  const [appState, setAppState] = React.useState(initState)

  const value = [appState,setAppState]

  return (
    <AppContext.Provider value={value} {...props}/>
  )
}

export {AppProvider , AppContext}