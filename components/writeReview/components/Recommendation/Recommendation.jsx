import * as React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import {AppContext} from 'components/appProvider'

function Recommendation(props) {
  const [appState] = React.useContext(AppContext)
  const [selectedAnswer, setSelectedAnswer] = React.useState({})

  const BpIcon = styled('span')(({theme}) => ({
    borderRadius: '50%',
    width: 38,
    height: 38,
    border: `1px solid ${theme.palette.primary.light}`,
    position: 'relative',
  }))

  const BpCheckedIcon = styled(BpIcon)(({theme}) => ({
    '&:before': {
      display: 'block',
      width: 30,
      height: 30,
      backgroundColor: theme.palette.primary.main,
      content: '""',
      borderRadius: '50%',

      position: 'absolute',
      top: 3,
      left: 3,
    },
  }))

  const controlProps = (item, id) => ({
    checked: selectedAnswer[id] === item,
    onChange: e => handleChange(e, id),
    value: item,
    name: 'size-radio-button-demo',
    inputProps: {'aria-label': item},
    icon: <BpIcon />,
    checkedIcon: <BpCheckedIcon />,
  })

  const handleChange = (event, id) => {
    const index = props.data.answers.findIndex(
      answer => answer.question_id === id,
    )
    props.data.answers[index].answer = event.target.value

    setSelectedAnswer(prev => ({...prev, [id]: event.target.value}))
  }

  React.useEffect(() => {
    const answers = {}
    appState.productQuestions.forEach(question => {
      answers[question.id] = question.answer_choices[0]
    })
    setSelectedAnswer({...answers})
  }, [])

  return (
    <>
      {appState.productQuestions.map(question => (
        <Stack
          alignItems={{xs: 'flex-start', md: 'center'}}
          direction={{md: 'row'}}
          justifyContent={'space-between'}
          key={question.id}
          mt={17}
        >
          <Typography variant={'body3'}>{question.text}</Typography>
          <Stack alignItems={'center'} direction={'row'} spacing={6}>
            {question.answer_choices.map(choice => (
              <Box key={choice}>
                <label>
                  <Typography variant={'body3'}>{choice}</Typography>
                </label>
                <Radio {...controlProps(choice, question.id)} />
              </Box>
            ))}
          </Stack>
        </Stack>
      ))}
    </>
  )
}

export default Recommendation
