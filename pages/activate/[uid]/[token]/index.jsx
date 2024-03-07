import * as React from 'react'

import {useRouter} from 'next/router'

import {Box, CircularProgress, Typography} from '@mui/material'

import {postUserActivation} from 'services'
import {CustomButton} from 'components/shared'

const ERROR = 'error'
const SUCCESS = 'success'

export default function Activation() {
  const [activation, setActivation] = React.useState({
    state: '',
    text: '',
  })
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()
  const {uid, token} = router.query

  const activationHandler = async (uid, token) => {
    setLoading(true)
    if (uid && token) {
      try {
        await postUserActivation({uid, token})

        setActivation({
          state: SUCCESS,
          text: 'Congratulations! Your account activation was successful! 😊',
        })
      } catch (err) {
        console.error(err)
        if (err?.res?.detail?.toLowerCase().includes('stale')) {
          setActivation({
            state: SUCCESS,
            text: 'Your account is active!',
          })
        } else {
          setActivation({
            state: ERROR,
            text: 'Sorry, your account activation failed. Please try again. 🙁',
          })
        }
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(false)
      setActivation({
        state: ERROR,
        text: 'Sorry, your account activation failed. Please try again. 🙁',
      })
    }
  }

  React.useEffect(() => {
    activationHandler(uid, token)
  }, [uid, token])

  return (
    <Box
      className="centralize"
      sx={{height: 400, width: {xs: '100%', md: 640}, px: 6, m: '0 auto'}}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          {activation.state === SUCCESS ? (
            <>
              <Typography sx={{fontWeight: 700, fontSize: 20}}>
                {activation.text}
              </Typography>
              <CustomButton
                onClick={() => router.push('/user/sign-in')}
                sx={{display: 'flex', mx: 'auto', mt: 5}}
                variant="contained"
              >
                Sign in
              </CustomButton>
            </>
          ) : (
            <>
              <Typography sx={{fontWeight: 700, fontSize: 20}}>
                {activation.text}
              </Typography>
              <CustomButton
                onClick={() => router.push('/user/sign-up')}
                sx={{display: 'flex', mx: 'auto', mt: 5}}
                variant="contained"
              >
                Sign up
              </CustomButton>
            </>
          )}
        </Box>
      )}
    </Box>
  )
}
