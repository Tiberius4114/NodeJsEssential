const express = require("express")
const app = express()
const path = require("path")

app.get(
  "/",
  (req, res, next) => {
    console.log("root middleware")
    next()
  },
  (req, res) => {
    //to get project directory path we could use process.cwd() and __dirname
    //also using path to join them or join them with plus +

    const root_path = path.join(process.cwd(), "./views/index.html")
    //   const root_path = path.join(__dirname, "./views/index.html")
    //   const root_path = __dirname + "/views/index.html"
    res.sendFile(root_path)
  }
)

app.get(
  "/products",
  (req, res, next) => {
    console.log("products middleware")
    next()
  },
  (req, res) => {
    const root_path = path.join(process.cwd(), "./views/products.html")
    //   const root_path = path.join(__dirname, "./views/products.html")
    //   const root_path = __dirname + "/views/products.html"
    res.sendFile(root_path)
  }
)

app.listen(3012, "127.0.0.1", () => {
  console.log("server listening on port 3012")
})
