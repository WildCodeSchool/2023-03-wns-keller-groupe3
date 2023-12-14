import { ApolloError } from "apollo-server";

export function SecureEmail(input: string): string {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (input !== "" && emailRegex.test(input)) {
    return input.trim();
  } else {
    throw new ApolloError("Mauvais format d'email");
  }
}

export function SecurePassword(input: string): string {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (input !== "" && passwordRegex.test(input)) {
    return input.trim();
  } else {
    throw new ApolloError("Mauvais format de mot de passe");
  }
}

export default function SecureInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .trim();
}
