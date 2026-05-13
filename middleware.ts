import { NextRequest, NextResponse } from "next/server";

const VARIANT_COOKIE = "deltanova_variant";
const COOKIE_MAX_AGE_DAYS = 90;

type Variant = "a" | "b";

function isValidVariant(v: string | undefined): v is Variant {
  return v === "a" || v === "b";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isRoot = pathname === "/";
  const isApply = pathname === "/apply";

  if (!isRoot && !isApply) {
    return NextResponse.next();
  }

  const cookieVariant = req.cookies.get(VARIANT_COOKIE)?.value;
  const variant: Variant = isValidVariant(cookieVariant)
    ? cookieVariant
    : Math.random() < 0.5
      ? "a"
      : "b";

  const url = req.nextUrl.clone();
  if (isRoot) {
    url.pathname = `/${variant}`;
  } else {
    url.pathname = `/${variant}/apply`;
  }

  const response = NextResponse.rewrite(url);

  if (!isValidVariant(cookieVariant)) {
    response.cookies.set({
      name: VARIANT_COOKIE,
      value: variant,
      path: "/",
      maxAge: 60 * 60 * 24 * COOKIE_MAX_AGE_DAYS,
      sameSite: "lax",
      httpOnly: false,
    });
  }

  response.headers.set("x-design-variant", variant);
  return response;
}

export const config = {
  matcher: ["/", "/apply"],
};
