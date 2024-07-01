import axios from 'axios'

export const getUserId = async (req, res, next) => {
  console.log('SE ESTA EJECUTANDO EL MIDDLEWARE')
  req.token = req.headers.authorization
  console.log(req.token)

  const userData = await axios.get('https://dev-fyc850ikobc57pdt.us.auth0.com/userinfo', {
    headers: { Authorization: req.token }
  }).catch(e => {
    console.log(e)
    return res.status(401).json({ message: 'Invalid authorization code' })
  })

  console.log(userData.data)
  if (!userData.data) return res.status(403).send({ message: 'Cant retrieve user info' })
  req.userId = userData.data.email
  next()
}
