import * as React from "react";
import Head from "next/head";

import {AppContext, SearchResultElements} from 'components'

import style from './search.module.css'

export default function SearchPage() {
  const [appState] = React.useContext(AppContext)

  return (
    <div className="search-page">
      <Head>
        <title>Calypso - Search</title>
      </Head>
      <div className={style.search}>
        <span className={style.searchTitle}>Found {appState.searchValues?.count} results for:</span>
        <span className={style.searchValue}>
          {appState.searchValues?.value}
        </span>
      </div>
      <div className="container">
        {!appState.searchValues.results.length?<div className={style.noResult}>No results found</div>:appState.searchValues?.results.map(p=>
          <SearchResultElements product={p} key={p.id} />
        )}
      </div>
    </div>
  );
}
