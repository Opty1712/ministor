import { createApp } from "@ministor/api";
import { AppForm } from "../components/AppForm";

export function AppCreate() {
  return <AppForm onSubmit={createApp} />;
}
