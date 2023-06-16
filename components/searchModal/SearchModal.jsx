import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import * as ga from 'components/common/googleAnalytics'
import {getSearchData} from 'services'
import {AppContext} from 'components/appProvider'
/* -------------------------------------------------------------------------- */

/* --------------------------------- Styles --------------------------------- */
import style from './searchModal.module.css'
/* -------------------------------------------------------------------------- */

function SearchModal({setOpenSearchModal}) {
  const [, setAppState] = React.useContext(AppContext)
  const [searchValue, setSearchValue] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const router = useRouter()

  const handleSearch = value => {
    if (value) {
      setLoading(true)

      getSearchData(value)
        .then(response => {
          setAppState(prev => ({
            ...prev,
            searchValues: {
              value: searchValue,
              results: [...response.results],
              count: response.count,
            },
          }))
          setLoading(false)
          router.push({pathname: '/search'}).then(() => {
            closeSearchModal()
          })

          return searchValue
        })
        .then(searchVal => {
          ga.event({
            action: 'search',
            params: {
              search_term: searchVal,
            },
          })
        })
        .catch(err => {
          console.log(err)
          setLoading(false)
        })
    }
  }

  const searchOnEnter = e => {
    if (e.code === 'Enter') handleSearch(searchValue)
  }

  const closeSearchModal = () => {
    setOpenSearchModal(false)
  }

  React.useEffect(() => {
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSearchModal()
    })
  }, [])

  return (
    <Box
      className={`${style.container} centralize`}
      sx={{backgroundColor: '#fcf5ecef'}}
      onClick={e => {
        e.stopPropagation()
        closeSearchModal()
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          '& label': {fontSize: 20},
          '& input': {fontSize: 22},
        }}
        className={style.searchContainer}
        onClick={e => e.stopPropagation()}
      >
        <TextField
          id="outlined-adornment-search"
          variant="standard"
          type="search"
          fullWidth
          onKeyDown={e => searchOnEnter(e)}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          autoFocus
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  sx={{
                    '&.MuiButtonBase-root': {
                      width: 60,
                      height: 60,
                    },

                    '&  svg.MuiSvgIcon-root': {
                      width: 40,
                      marginBottom: 2,
                    },
                  }}
                  type="submit"
                  onClick={e => {
                    e.preventDefault()
                    handleSearch(searchValue)
                  }}
                >
                  <SearchIcon fontSize="large" color={'primary'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Search our catalogue 🧴 🌞 🏖️"
          sx={{p: '12px 0'}}
        />

        {loading ? (
          <Box
            sx={{'& svg': {width: 'unset !important'}}}
            className={style.loadingContainer}
          >
            <CircularProgress />
          </Box>
        ) : null}
      </Box>

      <Box
        className={style.crossContainer}
        onClick={e => {
          e.stopPropagation()
          setOpenSearchModal(false)
        }}
        sx={{
          '& svg.MuiSvgIcon-root': {width: 30, transition: 'all 200ms'},
          '& svg.MuiSvgIcon-root:hover': {transform: 'rotate(90deg)'},
        }}
      >
        <CloseIcon fontSize="large" />
      </Box>
    </Box>
  )
}

export default SearchModal
