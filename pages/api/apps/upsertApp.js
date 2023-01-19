export default function handler(req, res) {
    if(req.method === "POST"){
  fetch(`${process.env.DATA_API_URL}/insertOne`, {
  method: "POST",
  body: JSON.stringify(req.body),
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers":"*",
    "api-key": `${process.env.DATA_API_KEY}`
  }
}).then(response => {
        res.status(200).json(response)
      })
      .catch(error => {
        res.status(201).json(error)
      });
    }
  }