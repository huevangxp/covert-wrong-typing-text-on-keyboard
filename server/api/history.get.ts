import { serverSupabaseClient } from "#supabase/server";
    .limit(10);

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return data;
});
