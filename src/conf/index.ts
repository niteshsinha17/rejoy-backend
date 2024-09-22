export const IS_DEV = process.env.NODE_ENV === "development";

const CONF = {
  GHOST_CONTENT_API_KEY: process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY,
  GHOST_ADMIN_API_KEY: process.env.GHOST_ADMIN_API_KEY,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  BACK_END_HOST: process.env.NEXT_PUBLIC_BACK_END_HOST,
};

export const nconf = {
  get(key: keyof typeof CONF): string | undefined {
    return CONF[key];
  },
};

export const isServer = () => typeof window === "undefined";
