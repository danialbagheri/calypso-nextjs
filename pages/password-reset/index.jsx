import * as React from 'react'

import {Box, Typography, useTheme} from '@mui/material'

import {postResetPasswordEmail} from 'services'
import {CustomButton, CustomOutlinedInput} from 'components/shared'
import {CalypsoGirlPassword, GreenCheck} from 'components/icons'
import {validateEmail} from 'utils'

export default function Password() {
  const [step, setStep] = React.useState(1)
  const [email, setEmail] = React.useState('')

  const [error, setError] = React.useState(null)

  const [loading, setLoading] = React.useState(false)
  const [resendState, setResendState] = React.useState(false)
  const theme = useTheme()

  const reEnterEnterEmailHandler = () => {
    setStep(1)
  }

  const errorHandler = value => {
    if (value === '') {
      setError('Email is required')
    } else if (!validateEmail(value)) {
      setError('Email is invalid')
    } else {
      setError('')
    }
  }

  const onChangeHandler = e => {
    errorHandler(e.target.value)
    setEmail(e.target.value)
  }

  const sendEmailHandler = async () => {
    if (!error) {
      setLoading(true)
      try {
        await postResetPasswordEmail({email})
        setStep(2)
      } catch (err) {
        setError(err?.res?.email)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
  }

  const resendEmailHandler = async () => {
    if (!error) {
      setLoading(true)
      try {
        await postResetPasswordEmail({email})
        setResendState(true)
      } catch (err) {
        setError(err?.res?.email)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Box
      sx={{
        width: {xs: 297, md: 740},
        m: '0 auto',
        py: {xs: 6, md: 21},

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: {xs: 'center', md: 'flex-start'},
        flexDirection: {xs: 'column-reverse', md: 'row'},
        gap: {xs: 3, md: 15},

        '&>#user_details_girl_icon': {
          width: {xs: 145, md: 290},
          height: {xs: 145, md: 290},
        },
      }}
    >
      <Box width="100%">
        <Typography sx={{fontSize: 24, fontWeight: 700}} textAlign="center">
          Retrieve password
        </Typography>
        {step === 1 ? (
          <>
            <Typography color="secondary.main" mt={3} textAlign="center">
              Please enter the email you used to create your account
            </Typography>
            <Box className="centralize" sx={{gap: 3, mt: 4, ml: '30px'}}>
              <CustomOutlinedInput
                error={error}
                id={'change_password_email_address'}
                label="Email address"
                onChange={onChangeHandler}
                placeholder="Email address"
                sx={{width: {xs: '100%', md: 260}}}
                type="email"
                value={email}
              />
              <Box className="centralize" sx={{width: 30, minWidth: 30}}>
                <GreenCheck
                  sx={{
                    width: 20,
                    height: 20,
                    mt: 4,
                    display: !error && error !== null ? 'block' : 'none',
                  }}
                />
              </Box>
            </Box>
            <CustomButton
              disabled={error || !email}
              loading={loading}
              onClick={sendEmailHandler}
              sx={{width: 260, mx: 'auto', display: 'flex', mt: 12, height: 46}}
              variant="contained"
            >
              Send
            </CustomButton>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <Box
              className="centralize"
              sx={{
                p: {xs: 4, md: 7},
                bgcolor: theme.palette.palm.main,
                borderRadius: '11px',
                gap: {xs: 2, md: 5},
                mt: 8,
              }}
            >
              <Box
                className="centralize"
                sx={{border: '2px solid #FFF', borderRadius: '50%'}}
              >
                <GreenCheck sx={{width: 30, height: 30}} />
              </Box>
              <Typography color="#FFF" sx={{fontSize: 20, fontWeight: 600}}>
                {resendState
                  ? 'You just resent the link'
                  : 'A password reset link is on its way to your email'}
              </Typography>
            </Box>
            <Typography color="secondary.main" mt={8} textAlign="center">
              {resendState
                ? 'if you still not received the email within 10 minutes please check your spam folder or try re-enter your email address'
                : 'if you have not received the email within 5 minutes please continue with the below options'}
            </Typography>
            <Box>
              <CustomButton
                loading={loading}
                onClick={resendEmailHandler}
                sx={{
                  width: 260,
                  mx: 'auto',
                  display: 'flex',
                  mt: 9,
                  height: 46,
                }}
                variant="contained"
              >
                Resend
              </CustomButton>
              <CustomButton
                onClick={reEnterEnterEmailHandler}
                sx={{
                  width: 260,
                  mx: 'auto',
                  display: 'flex',
                  mt: 3,
                  height: 46,
                }}
                variant="outlined"
              >
                Re-enter email address
              </CustomButton>
            </Box>
          </>
        ) : null}
      </Box>
      <CalypsoGirlPassword sx={{width: 290, height: 290}} />
    </Box>
  )
}
