import PaymentIcon from './payment-icons'
// import lincoDropLet from 'public/home-page/Droplets.png'
import LinkIcon from '@mui/icons-material/Link'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

export default function BottomBar() {
  var date = new Date()
  const BottomBarSchema = {
    itemScope: true,
    itemProp: 'publisher',
    itemType: 'https://schema.org/Organization',
  }

  const BottomBarStyle = {
    m: 2,
    mb: 5,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: {
      xs: 'column',
      md: 'row',
    },
    textAlign: {
      xs: 'center',
      md: 'left',
    },
  }
  return (
    <Container>
      <Box {...BottomBarSchema} sx={BottomBarStyle}>
        <meta content="Linco Care limited" itemProp="name" />
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          <Box>
            <img
              alt="Linco Care logo Icon"
              height="auto"
              loading="lazy"
              src={'/home-page/Droplets.png'}
              width={26}
            />
          </Box>
          <p>
            Copyright&#169; Linco Care Ltd {date.getFullYear()} | United Kingdom
          </p>
        </Box>
        <Box>
          <Box sx={{display: 'flex', gap: 2}}>
            <a
              href="https://lincocare.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              lincocare.com <LinkIcon />
            </a>
            <PaymentIcon />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}
