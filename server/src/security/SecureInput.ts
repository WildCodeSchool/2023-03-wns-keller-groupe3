import { ApolloError } from "apollo-server";

export function SecureEmail(input: string): string {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (input.trim() !== "" && emailRegex.test(input)) {
    return input.trim();
  } else {
    console.error("Bad email format");
    throw new ApolloError("Bad email format");
  }
}

export function SecurePassword(input: string): string {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (input.trim() !== "" && passwordRegex.test(input)) {
    return input.trim();
  } else {
    console.error("Bad password format");
    throw new ApolloError("Bad password format");
  }
}

export default function SecureInput(input: string): string {
  const regex = /[&$<>{}/\\"*[\]]/gm;

  if (input.trim() !== "" && !regex.test(input)) {
    return input.trim();
  } else {
    console.error(`The input "${input}" contains forbidden characters`);
    throw new ApolloError(`The input "${input}" contains forbidden characters`);
  }
}
