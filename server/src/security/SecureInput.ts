import { ApolloError } from "apollo-server";

export function SecureEmail(input: string): string {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return testRegex(input, emailRegex, "email");
}

export function SecurePassword(input: string): string {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).\S{8,}$/;

  return testRegex(input, passwordRegex, "password");
}

export default function SecureInput(input: string): string {
  const regex = /^[^&$<>={}\\"*[\]]+$/gm;

  return testRegex(input, regex, "text");
}

function testRegex(input: string, regex: RegExp, type: string): string {
  if (input.trim() !== "" && regex.test(input)) {
    return input.trim();
  } else if (type !== "text") {
    console.error(`Bad ${type} format`);
    throw new ApolloError(`Bad ${type} format`);
  } else {
    console.error(`The input "${input}" contains forbidden characters`);
    throw new ApolloError(`The input "${input}" contains forbidden characters`);
  }
}
