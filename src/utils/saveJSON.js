const saveJSON = (object, name = "learnBridge.json") => {
  const out = JSON.stringify(object)

  console.log(out)

  var blob = new Blob([out], {
    type: "application/octet-stream",
  })

  var url = URL.createObjectURL(blob)
  console.log(url)
  var link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", name)

  link.click()
  window.URL.revokeObjectURL(url)
}

export default saveJSON
