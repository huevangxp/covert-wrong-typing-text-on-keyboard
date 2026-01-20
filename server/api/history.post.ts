import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);

  // Get IP address
  const xForwardedFor = getRequestHeader(event, "x-forwarded-for");
  const ip = xForwardedFor
    ? xForwardedFor.split(",")[0]
    : event.node.req.socket.remoteAddress;

  const { data, error } = await client
    .from("translation_history")
    .insert({
      ip_address: ip,
      original: body.original,
      result: body.result,
      type: body.type,
    })
    .select();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return data;
});
