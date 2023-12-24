import * as mongoose from "npm:mongoose";
import { load } from "https://deno.land/std@0.209.0/dotenv/mod.ts";


async function initMongooseConnection() {
	const env = await load();
	const MONGO_USERNAME = env["MONGO_USERNAME"]!;
	const MONGO_PASSWORD = env["MONGO_PASSWORD"]!;
	const MONGO_DATABASE_URI = env["MONGO_DATABASE_URI"]
	?.replace("$MONGO_USERNAME", MONGO_USERNAME)
	.replace("$MONGO_PASSWORD", MONGO_PASSWORD)!;
  console.log(` [LOG] - try to connect to\n\t ${MONGO_DATABASE_URI}`);
  await mongoose.connect(MONGO_DATABASE_URI);
  console.log(` [LOG] - connected to\n\t ${MONGO_DATABASE_URI}`);
  console.log(` [INFO] -  success to use <MongoDB> and <Mongoose>`);
}
export { initMongooseConnection };
