
export const getUserId = async (req, res, next) => {
  const auth = req.auth
  const userId = await axios.get('https://dev-fyc850ikobc57pdt.us.auth0.com/userinfo', {
    headers: { Authorization: token }
  }).catch(e => {
    console.log(e);
    return res.status(401).json({ message: 'Invalid authorization code' });
  })

  console.log(user);
  console.log(userId)
  req.userId = userId
  next()
}
