import {Box, TextField, Typography, useTheme} from '@mui/material'
import {useState} from 'react'
import Image from 'next/image'
import WestIcon from '@mui/icons-material/West'
import {Button} from '.'

export function InfoCards(props) {
  const {
    constants,
    steps,
    setSteps,
    surveyData,
    questions,
    showResultsHandler,
  } = props
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const questionsCount = questions.length
  const theme = useTheme()

  const startBtnHandler = () => {
    const date = new Date()
    setSteps(prev => ({
      ...prev,
      mode: constants.QUESTION,
      questionsStep: 0,
    }))
    surveyData.current.started_at = date.toISOString()
    surveyData.current.answers[0].started_at = date.toISOString()
  }

  const infoCards = [
    {
      type: 'start',
      mode: constants.INFO,
      title: (
        <Typography textAlign="center" variant="PFInfo">
          Ready to find your product?
        </Typography>
      ),
      body: [
        <Button
          bgcolor="#000"
          fontColor="#FFF"
          key="btn_1"
          onClick={startBtnHandler}
          sx={{mt: 8}}
          variant="contained"
        >
          Start
        </Button>,
      ],

      imgSrc: '/productFinder/start.svg',
      footer: <Typography mt={5}>It’ll take only 2 minutes!</Typography>,
      additionalInfo: (
        <Typography
          color="green.main"
          mt={5}
          sx={{position: 'absolute', bottom: '-40px'}}
        >
          No personal information needed.
        </Typography>
      ),
    },
    {
      type: 'howToContinue',
      mode: constants.INFO,
      title: (
        <Typography textAlign="center" variant="PFInfo">
          How do you want to continue?
        </Typography>
      ),
      body: [
        <Button
          bgcolor="#000"
          fontColor="#FFF"
          key="btn_1"
          onClick={() =>
            setSteps(prev => ({
              ...prev,
              mode: constants.INFO,
              infoStep: 2,
            }))
          }
          sx={{mt: 8}}
          variant="contained"
        >
          Email me (get 5% off)
        </Button>,
        <Button
          bgcolor="#FFF"
          fontColor="#000"
          key="btn_2"
          mt="10px"
          onClick={showResultsHandler}
          sx={{mt: '10px', borderColor: '#226F61', py: '10px'}}
          variant="outlined"
        >
          Show me the result here
        </Button>,
      ],

      imgSrc: '/productFinder/continue.svg',
      imgTop: '5px',
      footer: (
        <Button
          bgcolor="#FFF"
          fontColor="#000"
          mt="10px"
          onClick={() =>
            setSteps(prev => ({
              ...prev,
              mode: constants.QUESTION,
              questionsStep: questionsCount - 1,
            }))
          }
          startIcon={
            <WestIcon
              sx={{
                color: '#E2E2E2',
                fontSize: 27,
                position: 'absolute',
                left: 25,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          }
          sx={{
            mt: '64px',
            borderColor: '#E2E2E2',
            py: '10px',
            position: 'relative',
          }}
          variant="outlined"
        >
          Back
        </Button>
      ),
    },
    {
      type: 'howToContinue',
      mode: constants.INFO,
      title: (
        <>
          <Typography textAlign="center" variant="PFInfo">
            Please enter your email address
          </Typography>
          <Typography mt={4}>
            You’ll receive the results in a minute!
          </Typography>
        </>
      ),
      body: [
        <TextField
          error={error}
          fullWidth
          helperText={error}
          id="outlined-basic"
          key="email_field"
          label="Email address"
          onChange={e => setEmail(e.target.value)}
          sx={{
            mt: 4,
            '& input': {px: 4, py: 3},
            '& fieldset': {borderRadius: '78px'},
            '& label': {
              transform: 'translate(14px, 11px) scale(1)',
              color: '#C7C7C7',
            },
            '& label.Mui-focused': {
              transform: 'translate(14px, -9px) scale(0.75)',
              color: '#000',
            },
          }}
          value={email}
          variant="outlined"
        />,
        <Button
          bgcolor={theme.palette.golden.main}
          fontColor="#FFF"
          key="btn_2"
          mt="10px"
          onClick={() => {
            if (email) {
              surveyData.current.email = email
              setError('')
              showResultsHandler()
            } else {
              setError('Please enter your email address')
            }
          }}
          sx={{mt: '10px'}}
          variant="contained"
        >
          Send
        </Button>,
      ],

      imgSrc: '/productFinder/start.svg',
      footer: (
        <>
          <Button
            bgcolor="#FFF"
            fontColor="#000"
            key="btn_3"
            mt="10px"
            onClick={() =>
              setSteps(prev => ({
                ...prev,
                mode: constants.INFO,
                infoStep: 1,
              }))
            }
            startIcon={
              <WestIcon
                sx={{
                  color: '#E2E2E2',
                  fontSize: 27,
                  position: 'absolute',
                  left: 25,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            }
            sx={{
              mt: '64px',
              borderColor: '#E2E2E2',
              py: '10px',
              position: 'relative',
            }}
            variant="outlined"
          >
            Back
          </Button>
          <Typography
            sx={{mt: '22px', fontSize: '12px', color: '#BEBEBE'}}
            textAlign="center"
          >
            By entering your email address, you are agreeing to our T&C and
            subscribing to our newsletter. You can unsubscribe at any time.
          </Typography>
        </>
      ),
    },
    {
      type: 'howToContinue',
      mode: constants.INFO,
      title: (
        <Typography mb={4} textAlign="center" variant="PFInfo">
          This is what we recommend for you!
        </Typography>
      ),
      body: [],

      imgSrc: '/productFinder/start.svg',
    },
  ]

  const card = infoCards[steps.infoStep]

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          width: 200,
          height: 200,
          top: card.imgTop ?? 0,
          left: '50%',

          transform: 'translate(-40%,calc(-100% + 6px))',
        }}
      >
        <Image
          alt="type"
          fill
          src={card.imgSrc}
          style={{objectFit: 'contain'}}
        />
      </Box>
      {card.title}
      <Box sx={{width: 'min(100% , 271px)'}}>
        {card.body.map(_body => _body)}
      </Box>
      {card.footer ?? card.footer}
      {card.additionalInfo ?? card.additionalInfo}
    </>
  )
}
