async function run() {
  const bcrypt = await import("bcryptjs");
  console.log(Object.keys(bcrypt));
  if (bcrypt.default) {
    console.log("has default");
  } else {
    console.log("no default");
  }
}
run();
