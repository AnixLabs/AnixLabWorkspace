"use client";

import { useTransition } from "react";
import { Button } from "@shared/components/ui/Button";
import { Input, PasswordInput, Select } from "@shared/components/ui/Input";
import { createUser } from "./actions";
import { createUserSchema, type CreateUserErrors, type CreateUserInput } from "./_schema";
import type { Role } from "@shared/auth/types";
import { useState } from "react";
import { ErrorText } from "@shared/components/ui/Paragraph";

export function CreateUserForm({ assignableRoles }: { assignableRoles: Role[] }) {
  const [userData, setUserData] = useState<CreateUserInput>({
    name: "",
    email: "",
    password: "",
    role: assignableRoles[0] ?? "user",
  });

  const [errors, setErrors] = useState<CreateUserErrors | null>(null);
  const [isPending, startTransition] = useTransition();

  const roleOptions = assignableRoles.map((r) => ({
    label: r.charAt(0).toUpperCase() + r.slice(1),
    value: r,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setErrors((p) => ({ ...p, [e.target.name]: undefined })); // Clear error on change
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // check errors and submit
    const fieldErrors: CreateUserErrors = {};
    const data = createUserSchema.safeParse(userData);

    if (!data.success) {
      data.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof CreateUserErrors;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    startTransition(async () => {
      const result = await createUser(userData);
      if (result) setErrors(result);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {errors?._root && <ErrorText>{errors._root}</ErrorText>}

      <Input
        label="Full Name"
        name="name"
        type="text"
        placeholder="John Doe"
        autoComplete="off"
        value={userData.name}
        onChange={handleChange}
      />
      <ErrorText>{errors?.name}</ErrorText>

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="john@example.com"
        autoComplete="off"
        value={userData.email}
        onChange={handleChange}
      />
      <ErrorText>{errors?.email}</ErrorText>

      <PasswordInput
        label="Password"
        name="password"
        placeholder="••••••••"
        autoComplete="off"
        value={userData.password}
        onChange={handleChange}
      />
      <ErrorText>{errors?.password}</ErrorText>

      <Select
        name="role"
        label="Role"
        options={roleOptions}
        value={userData.role}
        onChange={handleChange}
      />
      <ErrorText>{errors?.role}</ErrorText>

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create User"}
        </Button>
        <Button href="/users" className="bg-transparent border border-theme-500">
          Cancel
        </Button>
      </div>
    </form>
  );
}
