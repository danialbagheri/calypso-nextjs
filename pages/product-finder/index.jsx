import {useEffect, useRef, useState} from 'react'

import {Box} from '@mui/material'
import {getSPFFinderQuestions} from 'services'

import {Background, InfoCards, QuestionCards} from 'components/productFinder'

//Constants
const INFO = 'info'
const QUESTION = 'question'

export default function ProductFinder(props) {
  const [steps, setSteps] = useState({
    mode: INFO,
    infoStep: 0,
    questionsStep: 0,
  })
  const infoMode = steps.mode === INFO

  const surveyData = useRef({
    survey: 'spf-finder',
    email: '',
    started_at: '',
    finished_at: '',
    answers: [],
  })
  const isSurveyInitialized = useRef(false)

  useEffect(() => {
    //Initialize the survey
    if (!isSurveyInitialized.current) {
      props.data.questions.forEach(question => {
        surveyData.current.answers.push({
          question: question.id,
          choices: [],
          started_at: '',
          finished_at: '',
        })
      })
      isSurveyInitialized.current = true
    }
  }, [])

  return (
    <Box bgcolor="PFsand.main">
      <Background infoMode={infoMode} />
      <Box
        minHeight="800px"
        pb={{xs: '133px', md: '156px'}}
        pt={{xs: infoMode ? 11 : 4, md: 14}}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'column',
          alignItems: 'center',
        }}
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
            <InfoCards
              constants={{INFO, QUESTION}}
              questions={props.data.questions}
              setSteps={setSteps}
              steps={steps}
              surveyData={surveyData}
            />
          ) : null}

          {/* Question cards */}
          {steps.mode === QUESTION ? (
            <QuestionCards
              constants={{INFO, QUESTION}}
              questions={props.data.questions}
              setSteps={setSteps}
              steps={steps}
              surveyData={surveyData}
            />
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
    // {props:{error:}}
  }
}
