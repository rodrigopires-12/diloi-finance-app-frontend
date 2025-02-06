// app/page.tsx

import { redirect } from "next/navigation";

export default function HomePage() {
  // Perform any necessary logic here

  // Redirect to /login
  redirect("/login");

  // This code will not be reached due to the redirect
  return null;
}
