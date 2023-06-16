import * as React from 'react'
import Head from 'next/head'

import {AppContext, SearchResultElements} from 'components'

import style from './search.module.css'
import {Box, Typography, Container} from '@mui/material'
import Link from 'next/link'

export default function SearchPage() {
  const [appState] = React.useContext(AppContext)

  return (
    <div>
      <Head>
        <title>Calypso - Search</title>
      </Head>
      <Container sx={{minHeight: '100vh'}}>
        <div className={style.search}>
          <Typography variant="body1">
            Found {appState.searchValues?.count} results for:{' '}
            {appState.searchValues?.value}
          </Typography>
        </div>
        <Box>
          {!appState.searchValues.results.length ? (
            <div className={style.noResult}>No results found</div>
          ) : (
            <Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 250px))',
                  gridTemplateRows: 'auto',
                  rowGap: 7,
                  columnGap: 3,
                  justifyContent: 'center',
                  marginBottom: 4,
                }}
              >
                {appState.searchValues?.results.map(p => (
                  <SearchResultElements product={p} key={p.id} />
                ))}
              </Box>
              <Typography variant="h6" sx={{p: 4}} textAlign={'center'}>
                Not what you're looking for? Check our{' '}
                <Link href={'https://uk.cocoandeve.com/collections/all'}>
                  shop all page
                </Link>
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  )
}
