import { Client } from "./client"

export default function Page() {
  return (
    <main className="flex min-h-dvh flex-col bg-zinc-100 lg:p-2">
      <div className="flex grow items-center justify-center p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5">
        <Client
          title="Sign in"
          description="Access your account to manage projects, view analytics, and collaborate with your
        team."
        />
      </div>
    </main>
  )
}
