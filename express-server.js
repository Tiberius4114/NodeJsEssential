const express = require("express")
const app = express()
const path = require("path")
const qs = require("querystring")
const bodyParser = require("body-parser")

const methodOverride = require("method-override")

const mySystemMiddleware = (req, res, next) => {
  const url = req.url
  switch (url) {
    case "/":
      console.log("root middleware")
      break
    case "/products":
      console.log("products middleware")
      break
    case "/contact-us":
      console.log("contact-us middleware")
      break
  }
  next()
}

//using body parser as req methods listeners

// app.use((req, res, next) => {
//   let data = ""
//   req.on("data", (chunk) => {
//     data += chunk
//   })
//   req.on("end", () => {
//     req.body = qs.parse(data)
//     next()
//   })
// })

//using body parser as bodyParser module

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// NOTE: when using req.body, you must fully parse the request body
//       before you call methodOverride() in your middleware stack,
//       otherwise req.body will not be populated.

// parse application/json
app.use(bodyParser.json())

app.use(
  methodOverride((req, res) => {
    const req_body = req.body
    if (req_body && typeof req_body === "object" && "_method" in req_body) {
      // look in urlencoded POST bodies and delete it
      let body_method = req_body._method
      delete body_method
      return body_method
    }
  })
)

app.get("/", mySystemMiddleware, (req, res) => {
  //to get project directory path we could use process.cwd() and __dirname
  //also using path to join them or join them with plus +
  const root_path = path.join(process.cwd(), "./views/index.html")
  //   const root_path = path.join(__dirname, "./views/index.html")
  //   const root_path = __dirname + "/views/index.html"
  res.sendFile(root_path)
})

app.get("/products", mySystemMiddleware, (req, res) => {
  const root_path = path.join(process.cwd(), "./views/products.html")
  res.sendFile(root_path)
})

app.get("/products/:param", (req, res) => {
  const { param } = req.params
  //check param is slug or id
  if (/^\d+$/.test(param)) {
    res.end(JSON.stringify({ id: param }))
  } else {
    res.end(JSON.stringify({ slug: param }))
  }
})

//if we define static param after dynamic param that we defined above,above param got execute
//if we place flowing code above dynamic route it will be execute
app.get("/products/data", (req, res) => {
  res.send("data")
})

app.get("/contact-us", mySystemMiddleware, (req, res) => {
  const root_path = path.join(process.cwd(), "./views/contact-us.html")
  res.sendFile(root_path)
})

app.post("/contact-us", mySystemMiddleware, (req, res) => {
  // res.send(req.body)
  res.send(`${JSON.stringify(req.body)},this is a post request`)
})

app.delete("/contact-us", mySystemMiddleware, (req, res) => {
  res.send(`${JSON.stringify(req.body)},this is a delete request`)
})
app.patch("/contact-us", mySystemMiddleware, (req, res) => {
  res.send(`${JSON.stringify(req.body)},this is a patch request`)
})

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "./views/not-found.html"))
})

app.listen(3012, "127.0.0.1", () => {
  console.log("server listening on port 3012")
})
