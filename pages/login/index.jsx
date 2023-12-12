import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import Image from 'next/image'

export default function Login() {
  const theme = useTheme()
  return (
    <Box
      sx={{
        maxWidth: '880px',
        margin: '0 auto',
        pt: {xs: '50px', md: '100px'},
        pb: {xs: '55px', md: '193px'},
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: {xs: 'column', md: 'row'},
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: {
            xs: '100%',
            md: '50%',
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: {xs: 'column-reverse', md: 'column'},
          px: '78px',
        }}
      >
        <Typography
          sx={{
            color: '#000',
            textAlign: 'center',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            display: {xs: 'none', md: 'block'},
          }}
        >
          New member?
        </Typography>
        <Box mt={{xs: '64px', md: '60px'}}>
          <Typography
            sx={{
              color: '#226F61',
              textAlign: 'center',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: 'normal',
            }}
          >
            Sign in with your other accounts
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '30px',
              mt: 10,
            }}
          >
            <IconButton>
              <Image
                alt="Google icon"
                height={39}
                src="/icons/social-media/google-logo.svg"
                width={39}
              />
            </IconButton>
            <IconButton>
              <Image
                alt="Facebook icon"
                height={39}
                src="/icons/social-media/facebook-logo.svg"
                width={39}
              />
            </IconButton>
            <IconButton>
              <Image
                alt="Apple icon"
                height={39}
                src="/icons/social-media/apple-logo.svg"
                width={39}
              />
            </IconButton>
          </Box>
        </Box>
        <Button
          sx={{
            textAlign: 'center',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            textTransform: 'none',

            p: '8px 50px',
            mt: {xs: '20px', md: '90px'},

            borderRadius: '78px',

            boxShadow: 'none',

            '&:hover': {
              bgcolor: '#FFF !important',
              boxShadow: 'none !important',
            },
          }}
          variant="outlined"
        >
          Sign up now
        </Button>
        <Typography
          sx={{
            color: '#226F61',
            textAlign: 'center',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            display: {xs: 'block', md: 'none'},
            mt: '50px',
          }}
        >
          New member?
        </Typography>
        <Image alt="logo" height={32} src="/logo.svg" width={161} />
      </Box>

      <Box
        sx={{
          width: {xs: '100%', md: '8px'},
          height: {xs: '5px', md: '520px'},
          bgcolor: theme.palette.sand.main,
          borderRadius: '5px',
          mt: {xs: '36px', md: 0},
        }}
      />

      <Box
        sx={{
          width: {
            xs: '100%',
            md: '50%',
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',

          px: '78px',
        }}
      >
        <Typography
          sx={{
            color: '#000',
            textAlign: 'center',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            display: {xs: 'none', md: 'block'},
          }}
        >
          Already a member?
        </Typography>
        <Box
          sx={{
            mt: {xs: '58px', md: '40px'},
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            '& .MuiInputBase-root:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            },
            '& fieldset': {
              border: '1px solid',
              borderColor: theme.palette.primary.main,

              '& legend': {
                fontSize: '16px',
              },
            },

            '& label.Mui-focused': {
              transform: 'translate(14px, -9px) scale(0.75)',
            },
            '& input': {
              p: '13px 20px',
            },
          }}
        >
          <TextField
            id="email-sing-in"
            label="Email"
            sx={{
              '& label': {
                color: '#D4D4D4',
                fontSize: '18px',
                fontWeight: 500,
                transform: 'translate(14px, 10px) scale(1)',
              },
            }}
            type="email"
            variant="outlined"
          />
          <TextField
            id="email-sing-in"
            label="Password"
            sx={{
              '& label': {
                color: '#D4D4D4',
                fontSize: '18px',
                fontWeight: 500,
                transform: 'translate(14px, 13px) scale(1)',
              },
            }}
            type="password"
            variant="outlined"
          />
          <FormControlLabel
            control={<Checkbox sx={{color: theme.palette.primary.main}} />}
            label="Keep me signed in"
            sx={{
              m: 0,
              '&>span:nth-child(2)': {
                padding: 0,
                color: '#226F61',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 500,
                letterSpacing: '0',
                ml: 2,
              },
              '&>span:first-child': {
                p: 0,
              },
            }}
          />
        </Box>
        <Button
          sx={{
            textAlign: 'center',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: 'normal',
            textTransform: 'none',

            color: '#FFF',

            p: '8px 50px',
            mt: '50px',

            borderRadius: '78px',

            boxShadow: 'none',

            '&:hover': {
              bgcolor: `${theme.palette.primary.main} !important`,
              boxShadow: 'none !important',
            },
          }}
          variant="contained"
        >
          Sign in
        </Button>
        <Button
          sx={{
            textAlign: 'center',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            textTransform: 'none',

            color: '#226F61',
            mt: '42px',

            boxShadow: 'none',

            '&:hover': {
              bgcolor: '#FFF !important',
              boxShadow: 'none !important',
            },
          }}
          variant="text"
        >
          Forgot your password?
        </Button>
      </Box>
    </Box>
  )
}
