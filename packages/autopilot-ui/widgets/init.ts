fetch("/widget").then(async (res) => {
  console.log(await res.text());
});
