const express = require("express")
const router = express.Router()
const path = require("path")

const homeMiddleware = (req, res, next) => {
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

router.get("/", homeMiddleware, (req, res) => {
  //to get project directory path we could use process.cwd() and __dirname
  //also using path to join them or join them with plus +
  // const root_path = path.join(process.cwd(), "/views/index.ejs")
  //   const p_path = path.join(process.cwd(), "/views/p-index.html")
  //   const p_path_2 = path.join(process.cwd(), "/views/p-index2.html")
  //   const p_path_3 = path.join(process.cwd(), "/views/p-index3.html")
  //!*NOTE*!: there is different between process.cwd() and __dirname in entire directory here
  //process.cwd() : D:\Projects\tuts\NodeJsEssential that is absolute path of project directory but
  //__dirname :D:\Projects\tuts\NodeJsEssential/routes : that in this situation we should come back from
  //entire directory back and find file

  //   const root_path = path.join(__dirname, "./views/index.html")
  //   const root_path = __dirname + "/views/index.html"
  // res.sendFile(root_path)
  //   res.send("ok")

  //using ejs for render files

  let db_title = "showing view with ejs"
  let my_list = ["item 101", "item 102", "item 103"]

  res.render("home/index", { title: db_title, list: my_list })
})

//PRODUCTS :
router.get("/products", homeMiddleware, (req, res) => {
  const root_path = path.join(process.cwd(), "/views/products.html")
  res.sendFile(root_path)
})

router.get("/products/:param", (req, res) => {
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

router
  .route("/contact-us")
  .get((req, res) => {
    const root_path = path.join(process.cwd(), "/views/contact-us.html")
    res.sendFile(root_path)
  })
  .post(homeMiddleware, (req, res) => {
    // res.send(req.body)
    res.send(`${JSON.stringify(req.body)},this is a post request`)
  })
  .delete(homeMiddleware, (req, res) => {
    res.send(`${JSON.stringify(req.body)},this is a delete request`)
  })
  .patch(homeMiddleware, (req, res) => {
    res.send(`${JSON.stringify(req.body)},this is a patch request`)
  })

module.exports = router
