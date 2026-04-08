import { createServerClient } from "@supabase/ssr";
import type { Request, Response, NextFunction } from "express";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabaseMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const supabase = createServerClient(
    supabaseUrl!,
    supabaseKey!,
    {
      cookies: {
        getAll() {
          const cookies = req.headers.cookie || '';
          return cookies.split(';').map(c => {
            const [name, ...value] = c.trim().split('=');
            return { name, value: value.join('=') };
          });
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookie(name, value, options);
          });
        },
      },
    }
  );

  // This will refresh the session if it's expired
  await supabase.auth.getUser();
  
  next();
};
