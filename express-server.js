const express = require("express")
const app = express()
const path = require("path")

const mySystemMiddleware = (req, res, next) => {
  const url = req.url
  if (url === "/") {
    console.log("root middleware")
  } else {
    console.log("products middleware")
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
  //   const root_path = path.join(__dirname, "./views/products.html")
  //   const root_path = __dirname + "/views/products.html"
  res.sendFile(root_path)
})

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "./views/not-found.html"))
})

app.listen(3012, "127.0.0.1", () => {
  console.log("server listening on port 3012")
})
