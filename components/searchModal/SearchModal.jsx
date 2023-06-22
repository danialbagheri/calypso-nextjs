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
        .catch(() => {
          setLoading(false)
        })
    }
  }

  const searchOnEnter = e => {
    if (e.code === 'Enter') {
      handleSearch(searchValue)
    }
  }

  const closeSearchModal = () => {
    setOpenSearchModal(false)
  }

  React.useEffect(() => {
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeSearchModal()
      }
    })
  }, [])

  return (
    <Box
      className={`${style.container} centralize`}
      onClick={e => {
        e.stopPropagation()
        closeSearchModal()
      }}
      sx={{backgroundColor: '#fcf5ecef'}}
    >
      <Box
        className={style.searchContainer}
        onClick={e => e.stopPropagation()}
        sx={{
          maxWidth: 600,
          '& label': {fontSize: 20},
          '& input': {fontSize: 22},
        }}
      >
        <TextField
          autoComplete="off"
          autoFocus
          fullWidth
          id="outlined-adornment-search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={e => {
                    e.preventDefault()
                    handleSearch(searchValue)
                  }}
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
                >
                  <SearchIcon color={'primary'} fontSize="large" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Search our catalogue 🧴 🌞 🏖️"
          onChange={e => setSearchValue(e.target.value)}
          onKeyDown={e => searchOnEnter(e)}
          sx={{p: '12px 0'}}
          type="search"
          value={searchValue}
          variant="standard"
        />

        {loading ? (
          <Box
            className={style.loadingContainer}
            sx={{'& svg': {width: 'unset !important'}}}
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
