import axios from 'axios'

export const getUserId = async (req, res, next) => {
  console.log('SE ESTA EJECUTANDO EL MIDDLEWARE');
  const token = req.headers['authorization'];
  console.log(token);
  
  const userData = await axios.get('https://dev-fyc850ikobc57pdt.us.auth0.com/userinfo', {
    headers: { Authorization: token }
  }).catch(e => {
    console.log(e);
    return res.status(401).json({ message: 'Invalid authorization code' });
  })

  console.log(userData.data);
  req.userId = userData.data.email;
  next();
}
