import clientPromise from "../../pages/lib/mongodb";


export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("nextjs-mongodb-demo");
  console.log("req.body============>",(req.body))
  switch (req.method) {
    case "POST":
    //   let bodyObject = JSON.stringify(req.body);
       let bodyObject = {"name":"CW Suite","company":"CW Suite India Pvt Ltd"}
      let myPost = await db.collection("allPosts").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const allPosts = await db.collection("allPosts").find({}).toArray();
      res.json({ status: 200, data: allPosts });
      break;
  }
}

  