"use client";
import { logout } from "@/libs/action/auth";
import { useFormState } from "react-dom";

export default function Home() {
  const [state, form] = useFormState<any, FormData>(logout, undefined);

  return (
    <section>
      this is a section
      <form action={logout}>
        <button>Logout</button>
      </form>
    </section>
  );
}
