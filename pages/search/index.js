import * as React from 'react'
import Head from 'next/head'

import {AppContext, SearchResultElements} from 'components'

import style from './search.module.css'
import {Box, Container, Typography, useTheme} from '@mui/material'
import Link from 'next/link'

export default function SearchPage() {
  const theme = useTheme()
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
                  <SearchResultElements key={p.id} product={p} />
                ))}
              </Box>
              <Typography
                color={theme.palette.palm.main}
                sx={{p: 8}}
                textAlign={'center'}
                variant="h6"
              >
                Not what you&rsquo;re looking for? Check our{' '}
                <Link href={'/products/'}>product page</Link>
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  )
}
