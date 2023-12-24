import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { User } from "../database/schema/Userschema";

export const signup = async ({
    request,
    response,
  }: {
    request: any;
    response: any;
  }) => {
    const { username, password } = await request.body().value;
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    // check if user exists
    const user = await User.findOne({ username });
    if (user) {
      // user exists, send an error message
      response.status = 400;
      response.body = { message: "User exists" };
    } else {
      // user does not exist, create a new user
      const UsersResponse = await User.insertMany({
        username,
        password: hashedPassword,
      });
      response.status = 201;
      response.body = { message: "User created", user: UsersResponse };
    }
  };
