const save_to_db = (name, callback) => {
  setTimeout(() => {
    return callback(name)
  }, 2000)
}

const my_name = "mohammad"

save_to_db(my_name, (name) => {
  console.log("in callback", name)
})
