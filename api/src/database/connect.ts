main().catch((err) => console.log(err));

async function main() {
  await mangoose.connect(process.env.MONGODB_URL);
}
