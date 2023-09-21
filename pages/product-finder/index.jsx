import {useState} from 'react'

import {
  Box,
  Button as MuiButton,
  IconButton,
  Slider,
  Typography,
  useTheme,
} from '@mui/material'
import {getSPFFinderQuestions} from 'services'
import Image from 'next/image'

//Constants
const INFO = 'info'
const QUESTION = 'question'

const Button = props => {
  const {sx = {}} = props

  return (
    <MuiButton
      {...props}
      sx={{
        py: 3,
        width: '100%',
        borderRadius: '78px',
        boxShadow: 'none',
        bgcolor: props.bgcolor,
        color: props.fontColor,
        textTransform: 'none',
        '&:hover': {
          boxShadow: 'none',
          bgcolor: props.bgcolor,
        },
        ...sx,
      }}
    >
      {props.children}
    </MuiButton>
  )
}

export default function ProductFinder(props) {
  const theme = useTheme()
  const [steps, setSteps] = useState({
    mode: INFO,
    infoStep: 0,
    questionsStep: 0,
  })
  const infoMode = steps.mode === INFO
  const questionsCount = props.data.questions.length

  console.log('DATA::::', props.data.questions)

  const backArrowClickHandler = () => {
    if (steps.questionsStep === 0) {
      setSteps(prev => ({...prev, mode: INFO, infoStep: 0}))
    } else {
      setSteps(prev => ({
        ...prev,
        mode: QUESTION,
        questionsStep: steps.questionsStep - 1,
      }))
    }
  }

  const renderChoiceBtnColor = (text, title) => {
    const lowerCaseText = text.toLowerCase()
    const lowerCaseTitle = title.toLowerCase()

    if (lowerCaseTitle.includes('skin tone')) {
      if (lowerCaseText.includes('pale')) {
        return '#FFF8F3'
      } else if (lowerCaseText.includes('fair')) {
        return '#FFEDDF'
      } else if (lowerCaseText.includes('olive')) {
        return '#F9D1B4'
      } else if (lowerCaseText.includes('medium')) {
        return '#D8AE7E'
      } else {
        return '#766149'
      }
    } else return '#FFF'
  }

  const renderFontColor = (text, title) => {
    if (
      text.toLowerCase().includes('dark skin') &&
      title.toLowerCase().includes('skin tone')
    ) {
      return '#FFF'
    } else {
      return '#000'
    }
  }

  const renderChoiceBtnVariant = (text, title) => {
    if (
      text.toLowerCase().includes('skin') &&
      title.toLowerCase().includes('skin tone')
    ) {
      return 'contained'
    } else return 'outlined'
  }

  const choiceClickHandler = () => {
    if (steps.questionsStep < questionsCount - 1)
      setSteps(prev => ({
        ...prev,
        questionsStep: steps.questionsStep + 1,
        mode: QUESTION,
      }))
  }

  const infoCards = [
    {
      type: 'start',
      mode: INFO,
      title: (
        <Typography variant="PFInfo" textAlign="center">
          Ready to find your product?
        </Typography>
      ),
      body: [
        <Button
          key="btn_1"
          variant="contained"
          bgcolor="#000"
          onClick={() =>
            setSteps(prev => ({...prev, mode: QUESTION, questionsStep: 0}))
          }
        >
          Start
        </Button>,
      ],

      imgSrc: '/productFinder/start.svg',
      footer: <Typography mt={5}>It’ll take only 2 minutes!</Typography>,
      additionalInfo: (
        <Typography
          mt={5}
          sx={{position: 'absolute', bottom: '-40px'}}
          color="green.main"
        >
          No personal information needed.
        </Typography>
      ),
    },
  ]

  return (
    <Box bgcolor="sand.main">
      <Box sx={{position: 'relative'}}>
        <Box sx={{height: {xs: 112, md: 225}, bgcolor: '#ABD7FF'}} />
        <Box
          sx={{
            height: {xs: infoMode ? 53 : 12, md: 24},
            bgcolor: '#3CBFDC',
            position: 'relative',

            '&>img': {
              position: 'absolute',
            },

            '&>.bigBoat': {
              top: 0,
              left: '50%',
              transform: {
                xs: 'translate(-150px,-65%)',
                md: 'translate(-180px,-65%)',
              },
            },

            '&>.smallBoat': {
              top: 0,
              right: '50%',
              transform: {
                xs: 'translate(130px,-70%)',
                md: 'translate(160px,-70%)',
              },
            },
          }}
        >
          <Image
            className="bigBoat"
            src="/productFinder/boat.svg"
            alt="boat"
            width={27}
            height={38}
          />
          <Image
            className="smallBoat"
            src="/productFinder/boat.svg"
            alt="boat"
            width={13}
            height={16}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        height="800px"
        pb={{xs: '133px', md: '156px'}}
        pt={{xs: infoMode ? 11 : 4, md: 14}}
      >
        <Box
          sx={{
            width: 'min(343px , 90%)',
            height: infoMode ? 'fit-content' : '100%',

            bgcolor: '#FFF',

            borderRadius: '25px',
            boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.25)',

            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',

            position: 'relative',

            pb: infoMode ? 5 : 11,
            pt: infoMode ? 9 : 5,
            px: 9,
          }}
        >
          {/* Info cards */}
          {steps.mode === INFO ? (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  width: 200,
                  height: 200,
                  top: 0,
                  left: '50%',
                  transform: 'translate(-40%,calc(-100% + 6px))',
                }}
              >
                <Image
                  alt="type"
                  src={infoCards[steps.infoStep].imgSrc}
                  fill
                  style={{objectFit: 'contain'}}
                />
              </Box>
              {infoCards[steps.infoStep].title}
              <Box sx={{width: 'min(100% , 271px)', mt: 8}}>
                {infoCards[steps.infoStep].body.map(_body => _body)}
              </Box>
              {infoCards[steps.infoStep].footer ??
                infoCards[steps.infoStep].footer}
              {infoCards[steps.infoStep].additionalInfo ??
                infoCards[steps.infoStep].additionalInfo}
            </>
          ) : null}

          {/* Question cards */}
          {steps.mode === QUESTION ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* <Box
                sx={{
                  position: 'absolute',
                  width: 70,
                  height: 125,
                  top: 0,
                  left: '50%',
                  transform: 'translate(-50%,calc(-100%))',
                }}
              > */}
              <Image
                alt="type"
                width={95}
                height={125}
                src={props.data.questions[steps.questionsStep].image}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translate(-50%,calc(-100%))',
                }}
              />
              {/* </Box> */}
              <Box
                className="centralize"
                sx={{
                  width: '100%',
                  px: 3,
                  flexDirection: 'column',
                  position: 'relative',
                  mb: 2,
                }}
              >
                <IconButton
                  sx={{position: 'absolute', left: -4, top: 0}}
                  onClick={backArrowClickHandler}
                >
                  <Image
                    src="/productFinder/arrow.png"
                    width={24}
                    height={13}
                    alt="back"
                  />
                </IconButton>
                <Typography>
                  {steps.questionsStep + 1}/{questionsCount}
                </Typography>
                <Slider
                  max={questionsCount - 1}
                  min={0}
                  value={steps.questionsStep}
                  size="small"
                  sx={{
                    color: theme.palette.golden.main,
                    height: 6,
                    '&>.MuiSlider-thumb': {height: 14, width: 14},
                    '&>.MuiSlider-rail': {
                      bgcolor: '#E2E2E2',
                      opacity: 1,
                    },
                  }}
                />
              </Box>
              <Typography variant="PFQuestion" textAlign="left">
                {props.data.questions[steps.questionsStep].text}
              </Typography>
              <Box
                sx={{
                  width: '100%',

                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '10px',

                  mt: 10,
                }}
              >
                {props.data.questions[steps.questionsStep].choices.map(
                  choice => {
                    const title = props.data.questions[steps.questionsStep].text
                    return (
                      <Button
                        key={choice.id}
                        variant={renderChoiceBtnVariant(choice.text, title)}
                        bgcolor={renderChoiceBtnColor(choice.text, title)}
                        fontColor={renderFontColor(choice.text, title)}
                        onClick={() => choiceClickHandler(choice)}
                        sx={{borderColor: '#226F61'}}
                      >
                        {choice.text}
                      </Button>
                    )
                  },
                )}
              </Box>

              <Box sx={{flexGrow: 1, width: '100%'}}>
                {props.data.questions[steps.questionsStep].is_skippable ? (
                  <Button>skip</Button>
                ) : null}
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}

export async function getStaticProps() {
  try {
    const questions = await getSPFFinderQuestions()
    return {props: {data: questions}}
  } catch (err) {
    console.log('\n\nERROR:::::', err)
    // {props:{error:}}
  }
}
