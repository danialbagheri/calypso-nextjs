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
    const content = e
    props.changeHandler(type, content)
  }

  return (
    <Box key={field.id} sx={{mt: 2}}>
      <ReCAPTCHA
        onChange={() => {
          // setFieldValue("recaptcha", value);
          onChange(reCaptchaRef.current.getValue(), field.type)
        }}
        ref={reCaptchaRef}
        sitekey="6LfjPaEUAAAAAPGfkx7Nxp3glAdPGbLZE3lwY5c9"
      />
    </Box>
  )
}

export default Recaptcha
