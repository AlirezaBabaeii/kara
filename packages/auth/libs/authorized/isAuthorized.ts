// deno-lint-ignore-file
import { verify } from "https://deno.land/x/djwt@v2.4/mod.ts";
import { key } from "../utils/apiKey";
import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";

export const authourized = async (ctx: Context, next: any) => {
  ctx.response.status = 401;

  const headers: Headers = ctx.request.headers;
  const authorization = headers.get("Authorization");
  if (!authorization)
    return (ctx.response.body = {
      message: 'The "Authorization" Property Not Exists',
    });

  const jwt = authorization.split(" ")[1];
  if (!jwt) return (ctx.response.body = { message: "Invalid token" });

  const payload = await verify(jwt, key);
  if (!payload)
    return (ctx.response.body = { message: 'Invlaid "payload" in token' });

  ctx.response.status = 200;
  await next();
};
