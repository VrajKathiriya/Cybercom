async function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("error");
    }, 2000);
    setTimeout(() => {
      resolve("not error");
    }, 1000);
  });
}

async function fun() {
  console.log("start...");
  await delay()
    .then((msg) => {
      console.log(msg);
    })
    .catch((err) => {
      console.log(err);
    });
}

fun();
