import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt_decode from 'jwt-decode'

const YOUR_API_URL = 'https://service.calypsosun.com/api/'

//  based on https://dev.to/mabaranowski/nextjs-authentication-jwt-refresh-token-rotation-with-nextauthjs-5696
async function refreshAccessToken(tokenObject) {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await axios.post(YOUR_API_URL + 'auth/refreshToken', {
      token: tokenObject.refreshToken,
    })

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      refreshToken: tokenResponse.data.refreshToken,
    }
  } catch (error) {
    return {
      ...tokenObject,
      error: 'RefreshAccessTokenError',
    }
  }
}

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    authorize: async credentials => {
      try {
        // Authenticate user with credentials
        const user = await axios.post(YOUR_API_URL + 'users/token/', {
          password: credentials.password,
          email: credentials.email,
        })
        if (user.data.access) {
          return user.data
        }

        return null
      } catch (e) {
        throw new Error(e)
      }
    },
  }),
]

const callbacks = {
  jwt: async ({token, user}) => {
    if (user) {
      // This will only be executed at login. Each next invocation will skip this part.
      token.accessToken = user.data.access
      token.refreshToken = user.data.refresh
    }

    // If accessTokenExpiry is 24 hours, we have to refresh token before 24 hours pass.
    const expiryDate = jwt_decode(token.accessToken).exp
    const shouldRefreshTime = Math.round(
      expiryDate - 60 * 60 * 1000 - Date.now(),
    )

    // If the token is still valid, just return it.
    if (shouldRefreshTime > 0) {
      return Promise.resolve(token)
    }

    // If the call arrives after 23 hours have passed, we allow to refresh the token.
    token = refreshAccessToken(token)
    return Promise.resolve(token)
  },
  session: async ({session, token}) => {
    // Here we pass accessToken to the client to be used in authentication with your API
    session.accessToken = token.accessToken
    session.accessTokenExpiry = jwt_decode(token.accessToken).exp
    session.error = token.error

    return Promise.resolve(session)
  },
}

export const options = {
  providers,
  callbacks,
  pages: {
    signIn: '/accounts/login',
  },
  secret: 'jkolkojkiojmiujijh45t8y90uihjuihu98ihhiunlkjnj',
}

const Auth = (req, res) => NextAuth(req, res, options)
export default Auth
