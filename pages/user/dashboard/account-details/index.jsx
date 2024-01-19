import * as React from 'react'

import {Box, Typography} from '@mui/material'

import {
  assetsEndPoints,
  getAssets,
  validateMobileNumber,
  validateName,
} from '../../../../utils'
import UserDetailsFields from '../../../../components/user/UserDetailsFields'
import {CustomButton} from '../../../../components/user/localShared'
import {
  getUserInfo,
  patchUserInfo,
  postRefreshToken,
} from '../../../../services'
import {parseCookies, setCookie} from 'nookies'
import {EMAIL, FIRST_NAME, LAST_NAME, MOBILE_NUMBER} from '..'
import {useRouter} from 'next/router'
import SideBar from '../../../../components/user/dashboard/SideBar'

const ACCOUNT_DETAILS = 'account details'

export default function AccountDetails(props) {
  const {assets} = props
  const [fieldData, setFieldData] = React.useState({
    id: '',
    [FIRST_NAME]: '',
    [LAST_NAME]: '',
    [EMAIL]: '',
    [MOBILE_NUMBER]: '',
  })
  const [error, setError] = React.useState({
    [FIRST_NAME]: null,
    [LAST_NAME]: null,
    [EMAIL]: null,
    [MOBILE_NUMBER]: null,
  })
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [isEdit, setIsEdit] = React.useState(false)
  const router = useRouter()
  const initialFieldData = React.useRef({
    id: '',
    [FIRST_NAME]: '',
    [LAST_NAME]: '',
    [EMAIL]: '',
    [MOBILE_NUMBER]: '',
  })

  const {userAccountTopIcons} = assetsEndPoints

  const girlIcon = assets[userAccountTopIcons]?.items.find(
    item =>
      item.name.toLowerCase().trim() === ACCOUNT_DETAILS.toLowerCase().trim(),
  )

  const renderSubtitle = () => {
    if (isEdit) {
      return 'Make sure your details are up to date'
    } else if (success) {
      return 'Your account details has been successfully updated'
    }
    return 'You can view or change your personal details'
  }

  const errorHandler = () => {
    let errorState = false
    setError({
      [FIRST_NAME]: false,
      [LAST_NAME]: false,
      [EMAIL]: false,
      [MOBILE_NUMBER]: false,
    })

    if (fieldData[FIRST_NAME] && !validateName(fieldData[FIRST_NAME])) {
      errorState = true
      setError(prev => ({...prev, [FIRST_NAME]: 'Please enter a valid name'}))
    }
    if (fieldData[LAST_NAME] && !validateName(fieldData[LAST_NAME])) {
      errorState = true
      setError(prev => ({...prev, [LAST_NAME]: 'Please enter a valid name'}))
    }
    if (
      fieldData[MOBILE_NUMBER] &&
      !validateMobileNumber(fieldData[MOBILE_NUMBER])
    ) {
      errorState = true
      setError(prev => ({
        ...prev,
        [MOBILE_NUMBER]: 'Please enter a valid mobile number',
      }))
    }

    return errorState
  }

  const saveHandler = async () => {
    const {calacc, calref} = parseCookies()
    const errorState = errorHandler()
    setSuccess(false)

    if (!errorState) {
      setLoading(true)
      try {
        const res = await patchUserInfo(fieldData, calacc)
        const response = await res.json()
        setFieldData({...response})
        initialFieldData.current = {...response}

        setSuccess(true)
        setIsEdit(false)
      } catch (err) {
        if (err.status === 401) {
          try {
            const {access} = await postRefreshToken({
              refresh: calref || 'null_token',
            })
            setCookie(null, 'calacc', access, {
              maxAge: 30 * 60 * 1000,
              path: '/',
            })
            const res = await patchUserInfo(fieldData, access)
            const response = await res.json()
            setFieldData({...response})
            initialFieldData.current = {...response}
            setSuccess(true)
            setIsEdit(false)
          } catch {
            if (err.status === 401) {
              console.error(err)
              router.push('/user')
              setSuccess(false)
            } else {
              console.error(err)
              setSuccess(false)
            }
          }
        } else {
          console.error(err)
          setSuccess(false)
        }
      } finally {
        setLoading(false)
      }
    }
  }

  const discardHandler = () => {
    setFieldData({...initialFieldData.current})
    setError({
      [FIRST_NAME]: false,
      [LAST_NAME]: false,
      [EMAIL]: false,
      [MOBILE_NUMBER]: false,
    })
    setIsEdit(false)
  }

  const handleGetUserInfo = async () => {
    const {calacc, calref} = parseCookies()
    try {
      const data = await getUserInfo(calacc)
      initialFieldData.current = {...data}
      setFieldData({...data})
    } catch (err) {
      if (err.status === 401) {
        try {
          const {access} = await postRefreshToken({
            refresh: calref || 'null_token',
          })

          setCookie(null, 'calacc', access, {
            maxAge: 30 * 60 * 1000,
            path: '/',
          })

          const data = await getUserInfo(access)
          initialFieldData.current = {...data}
          setFieldData({...data})
        } catch (err) {
          if (err.status === 401) {
            console.error(err)
            router.push('/user')
          } else {
            console.error(err)
          }
        }
      } else {
        console.error(err)
      }
    }
  }

  React.useEffect(() => {
    handleGetUserInfo()
  }, [])

  return (
    <Box
      sx={{
        width: {xs: '100%', sm: 480, md: 740},
        m: '0 auto',
        py: {xs: 6, md: 21},
        px: {xs: 10, sm: 20, md: 0},
        gap: 5,

        display: 'flex',
        justifyContent: 'space-between',
        alignItems: {xs: 'center', md: 'flex-start'},
        flexDirection: {xs: 'column-reverse', md: 'row'},

        '&>#user_details_girl_icon': {
          width: {xs: 145, md: 290},
          height: {xs: 145, md: 290},
        },
      }}
    >
      <SideBar girlIcon={girlIcon} route="account-details" />

      <Box width={{xs: '100%', md: 318}}>
        <Typography sx={{fontSize: 24, fontWeight: 700}} textAlign="center">
          Account details
        </Typography>

        <Typography color="secondary.main" mt={3} textAlign="center">
          {renderSubtitle()}
        </Typography>

        <UserDetailsFields
          error={error}
          fieldData={fieldData}
          isEdit={isEdit}
          setError={setError}
          setFieldData={setFieldData}
        />

        {!isEdit ? (
          <CustomButton
            onClick={() => setIsEdit(true)}
            sx={{width: 220, mx: 'auto', display: 'flex', mt: 12, height: 52}}
            variant="contained"
          >
            Edit details
          </CustomButton>
        ) : null}

        {isEdit ? (
          <>
            <CustomButton
              loading={loading}
              onClick={saveHandler}
              sx={{width: 220, mx: 'auto', display: 'flex', mt: 12, height: 52}}
              variant="contained"
            >
              Save changes
            </CustomButton>
            <CustomButton
              onClick={discardHandler}
              sx={{width: 220, mx: 'auto', display: 'flex', mt: 3, height: 52}}
              variant="outlined"
            >
              Discard changes
            </CustomButton>
          </>
        ) : null}
      </Box>
    </Box>
  )
}

export async function getStaticProps() {
  try {
    const {userAccountTopIcons} = assetsEndPoints

    const assets = await getAssets([userAccountTopIcons])

    return {
      props: {
        assets,
      },
      revalidate: 120, // will be passed to the page component as props
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        assets: {},
      },
      revalidate: 120, // will be passed to the page component as props
    }
  }
}
