import axios from "axios";
export default async function handler(req, res) {
//   const reqData = {...req.body}
console.log(JSON.stringify(req.body))
const response = await axios({
    
  url: `${process.env.DATA_API_URL}/updateOne`,
  method: 'POST',
  data:JSON.stringify(req.body),
 headers: {
  "Content-Type": "application/json",
  "Access-Control-Request-Headers":"*",
  "api-key": `${process.env.DATA_API_KEY}`
}
})
response.status === 200 ? res.status(200).json(response.data) : res.status(201)
}