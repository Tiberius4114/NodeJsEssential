const express = require("express")
const app = express()
const path = require("path")

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
app.get("/contact-us", mySystemMiddleware, (req, res) => {
  const root_path = path.join(process.cwd(), "./views/contact-us.html")
  res.sendFile(root_path)
})
app.post("/contact-us", mySystemMiddleware, (req, res) => {
  res.end("form received")
})

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "./views/not-found.html"))
})

app.listen(3012, "127.0.0.1", () => {
  console.log("server listening on port 3012")
})
