import {Box} from '@mui/material'
import {Title} from 'components/user/localShared'
import {SignUpFields} from 'components/user'
import {CustomButton} from '../../components/user/localShared'

export default function SignUp() {
  return (
    <Box
      className="centralize"
      sx={{
        maxWidth: 880,
        margin: '0 auto',
        py: '120px',
        flexDirection: 'column',
      }}
    >
      <Title>Account details</Title>
      <Title subTitle sx={{mt: 3}}>
        Please make sure you complete all the boxes
      </Title>

      <SignUpFields />

      <CustomButton sx={{mt: '42px'}} variant="contained">
        Save details
      </CustomButton>
    </Box>
  )
}
