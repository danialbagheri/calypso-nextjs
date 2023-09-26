import {Box, IconButton, Slider, Typography, useTheme} from '@mui/material'
import Image from 'next/image'
import {Button} from '.'
import {
  renderChoiceBtnColor,
  renderChoiceBtnVariant,
  renderFontColor,
} from './utils'

export function QuestionCards(props) {
  const {steps, setSteps, constants, questions, surveyData} = props
  const theme = useTheme()
  const questionsCount = questions.length
  const question = questions[steps.questionsStep]
  const hasMultipleAnswers = question.has_multiple_answers
  //Find this question index in the survey data
  const index = surveyData.current.answers.findIndex(
    a => a.question === question.id,
  )

  const backArrowClickHandler = () => {
    if (steps.questionsStep === 0) {
      setSteps(prev => ({...prev, mode: constants.INFO, infoStep: 0}))
    } else {
      setSteps(prev => ({
        ...prev,
        mode: constants.QUESTION,
        questionsStep: steps.questionsStep - 1,
      }))
    }
  }

  const nextQuestionHandler = () => {
    const date = new Date()

    surveyData.current.answers[steps.questionsStep].finished_at =
      date.toISOString()

    if (steps.questionsStep < questionsCount - 1) {
      surveyData.current.answers[steps.questionsStep + 1].started_at =
        date.toISOString()

      setSteps(prev => ({
        ...prev,
        questionsStep: steps.questionsStep + 1,
        mode: constants.QUESTION,
      }))
    } else {
      setSteps(prev => ({...prev, infoStep: 1, mode: constants.INFO}))
    }
  }

  const choiceClickHandler = choice => {
    if (hasMultipleAnswers) {
      //Find if the answer was chosen or not
      const choiceIndex = surveyData.current.answers[index].choices.find(
        ch => +ch === choice.id,
      )
      //If answer is not chosen
      if (choiceIndex === -1) {
        surveyData.current.answers[index].choices.push(choice.id)
      } else {
        //Remove the question's id when it was chosen
        surveyData.current.answers[index].choices.splice(choiceIndex, 1)
      }
    } else {
      surveyData.current.answers[index].choices = [choice.id]
      nextQuestionHandler()
    }
  }

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        alt="type"
        height={200}
        src={question.image}
        style={{
          position: 'absolute',
          top: 23,
          left: '50%',
          transform: 'translate(-50%,calc(-100%))',
        }}
        width={200}
      />
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
          onClick={backArrowClickHandler}
          sx={{position: 'absolute', left: -4, top: 0}}
        >
          <Image
            alt="back"
            height={13}
            src="/productFinder/arrow.png"
            width={24}
          />
        </IconButton>
        <Typography>
          {steps.questionsStep + 1}/{questionsCount}
        </Typography>
        <Slider
          max={questionsCount - 1}
          min={0}
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
          value={steps.questionsStep}
        />
      </Box>
      <Typography textAlign="left" variant="PFQuestion">
        {question.text}
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
        {question.choices.map(choice => {
          const title = question.text
          const isChosen = surveyData.current.answers[index].choices.find(
            ch => +ch === +choice.id,
          )

          return (
            <Button
              bgcolor={renderChoiceBtnColor(choice.text, title, isChosen)}
              fontColor={renderFontColor(choice.text, title, isChosen)}
              key={choice.id}
              onClick={() => choiceClickHandler(choice)}
              sx={{borderColor: '#226F61'}}
              variant={renderChoiceBtnVariant(choice.text, title, isChosen)}
            >
              {choice.text}
            </Button>
          )
        })}
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {question.is_skippable ? (
          <Button onClick={nextQuestionHandler} variant="outlined">
            Skip
          </Button>
        ) : null}
      </Box>
    </Box>
  )
}
