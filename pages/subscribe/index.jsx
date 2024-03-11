import {Box, Typography} from '@mui/material'
import {CustomButton, CustomOutlinedInput} from 'components/shared'
import Image from 'next/image'
import {useState} from 'react'
import {userSubscription} from 'services'
import {validateEmail} from 'utils'

const privileges = [
  {id: 'privileges_1', text: '10% off your first order'},
  {id: 'privileges_2', text: 'Exclusive offers'},
  {id: 'privileges_3', text: 'Be the first to hear about new product launches'},
  {id: 'privileges_4', text: 'The best sun safety tips and advice'},
]

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChangeHandler = e => {
    setEmail(e.target.value)
  }
  const errorHandler = () => {
    if (!email) {
      setError('Email is required')
      return true
    } else if (!validateEmail(email)) {
      setError('Invalid email address')
      return true
    }
    return false
  }
  const subscribeHandler = async () => {
    setError('')
    setSuccess(false)
    const hasError = errorHandler()

    if (!hasError) {
      setLoading(true)
      try {
        await userSubscription({email})
        setSuccess(true)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 543,
        px: 8,

        m: '0 auto',
        pt: 5,
        pb: 77,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        alt="subscription-girl"
        height={149}
        src="/subscribe/subscription_girl.png"
        width={335}
      />
      <Typography
        color="#000"
        fontSize={{xs: 32, md: 36}}
        fontWeight={700}
        lineHeight={{xs: '36px'}}
        mt="18px"
        textAlign="center"
      >
        Subscribe to our newsletter
      </Typography>
      <Box sx={{height: 48, mt: 7, maxWidth: 405, width: '100%'}}>
        <Box className="centralize">
          <CustomOutlinedInput
            error={error}
            onChange={onChangeHandler}
            placeholder="Your email address"
            sx={{width: '100%', height: 48, '& input': {py: 0, height: 48}}}
            value={email}
            variant="outlined"
          />
          <CustomButton
            color="primary"
            loading={loading}
            onClick={subscribeHandler}
            sx={{
              borderRadius: '10px',
              height: 48,
              width: {xs: 105, md: 138},
              ml: '-10px',
            }}
            variant="contained"
          >
            Subscribe
          </CustomButton>
        </Box>

        {success ? (
          <Box
            className="centralize"
            sx={{
              width: '100%',
              p: '7px',
              mt: '14px',
              bgcolor: '#EDF8F6',
              borderRadius: '5px',
            }}
          >
            <Typography color="secondary" variant="h5">
              Thank you for subscribing!
            </Typography>
          </Box>
        ) : null}

        <Box
          sx={{
            mt: success ? 7 : 10,
            width: '100%',
            '& ul': {display: 'flex', flexDirection: 'column', gap: 3},
          }}
        >
          <Typography color="secondary" variant="h7">
            You will also get
          </Typography>
          <ul style={{padding: 0, paddingLeft: '15px'}}>
            {privileges.map(({id, text}) => (
              <li key={id}>
                <Typography color="#000" variant="h5">
                  {text}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  )
}
