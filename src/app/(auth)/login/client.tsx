"use client"

import { Link } from "@/components/ui/link"
import { Form, TextField } from "react-aria-components"
import { Input, Label } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Logo } from "@/components/logo"

export function Client({ title, description }: { title?: string; description?: string }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <div className="w-full max-w-sm">
      <div className="text-center">
        <div className="mb-2 flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <h1 className="font-semibold text-fg text-xl/10">{title}</h1>
        <p className="text-muted-fg text-sm/6">{description}</p>
      </div>

      <Form className="mt-6 grid w-full grid-cols-1 gap-6">
        <div className="divide-y rounded-lg border">
          <TextField type="email" value={email} onChange={setEmail} aria-label="Email">
            <Input placeholder="you@domain.com" />
          </TextField>
          <TextField type="password" value={password} onChange={setPassword} aria-label="Password">
            <Input placeholder="Sssh, it's a secret" />
          </TextField>
        </div>
        <div className="flex justify-between">
          <Checkbox>
            <Label>Remember me</Label>
          </Checkbox>
          <Link
            href="#"
            className="text-sm/6 [--text:var(--color-primary-subtle-fg)] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button>Sign in</Button>
      </Form>
    </div>
  )
}
