import * as React from 'react'

import Box from '@mui/material/Box'
import ReCAPTCHA from 'react-google-recaptcha'

const reCaptchaRef = React.createRef()

function Recaptcha(props) {
  const RECAPTCHA = 'recaptcha'

  const field = {
    id: RECAPTCHA,
    type: RECAPTCHA,
  }

  const onChange = (e, type) => {
    let content = e
    props.changeHandler(type, content)
  }

  return (
    <Box key={field.id} sx={{mt: 2}}>
      <ReCAPTCHA
        ref={reCaptchaRef}
        sitekey="6LfjPaEUAAAAAPGfkx7Nxp3glAdPGbLZE3lwY5c9"
        onChange={value => {
          // setFieldValue("recaptcha", value);
          onChange(reCaptchaRef.current.getValue(), field.type)
        }}
      />
    </Box>
  )
}

export default Recaptcha
