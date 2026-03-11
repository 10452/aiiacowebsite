export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Phone number — update this single constant when the Telnyx number is provisioned
// Set to null to fall back to Calendly booking link automatically
export const PHONE_NUMBER: string | null = "+18884960152";
export const PHONE_NUMBER_DISPLAY: string | null = "+1 (888) 496-0152";
export const CALENDLY_URL = "https://calendly.com/aiiaco";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
