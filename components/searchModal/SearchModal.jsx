import * as React from 'react'

import {useRouter} from 'next/router'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner'

import * as ga from 'components/common/googleAnalytics'
import {getSearchData} from 'services'
import {AppContext} from 'components/appProvider'

import style from './searchModal.module.css'

function SearchModal({setOpenSearchModal}) {
  const [,setAppState] = React.useContext(AppContext)

  const [searchValue, setSearchValue] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const router = useRouter()

  const handleSearch = (value) => {
    if(value){
      setLoading(true);

      getSearchData(value).then(response => {
        setAppState(prev => ({
          ...prev, searchValues: {value: searchValue, results: [...response.results], count: response.count}
        }))
        setLoading(false)
        router.push({pathname:'search'}).then(() => {closeSearchModal()})

        return searchValue

      }).then(searchVal=>{
        ga.event({
          action: "search",
          params: {
            search_term: searchVal,
          },
        });
      }).catch(err =>{
        console.log(err)
        setLoading(false)
      })
    }
  }

  const searchOnEnter = (e) => {
    if(e.code === "Enter")
      handleSearch(searchValue)
  }

  const closeSearchModal= () => {
    setOpenSearchModal(false)
  }

  React.useEffect(()=>{
    window.addEventListener('keydown',function(e){
      if(e.key === 'Escape') closeSearchModal()
    })
  },[])

  return (
    <div className={`${style.container} centralize`} onClick={(e)=> {
      e.stopPropagation()
      closeSearchModal()
    }}>
      <div className={style.searchContainer} onClick={e => e.stopPropagation()}>
        <div className={style.searchInputContainer}>
          <input
            type='search'
            name="searchVal"
            value={searchValue}
            placeholder="Search our catalogue 🧴 🌞 🏖️"
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => searchOnEnter(e)}
            autoFocus
          />
          <div className={style.searchIconContainer} onClick={()=>handleSearch(searchValue)}>
            <FontAwesomeIcon
              icon={faSearch}
              className="calypso-orange-text"
              size={'2x'}
            />
          </div>
        </div>

        {loading?<div className={style.loadingContainer}>
          <FontAwesomeIcon
            spin
            icon={faSpinner}
            className='calypso-orange-text'
            size={'2x'}
          />
        </div>:null}
      </div>


      <div className={style.crossContainer} onClick={(e) => {
        e.stopPropagation()
        setOpenSearchModal(false)
      }}>

          <span>x</span>
      </div>
    </div>
  )
}

export default SearchModal