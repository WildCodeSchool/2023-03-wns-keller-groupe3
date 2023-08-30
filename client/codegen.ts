import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://localhost:4000",
    documents: [
      "src/graphql/mutations/*.ts",
      "src/graphql/queries/*.ts"
    ],
    generates: {
        "./src/graphql/__generated__/": {
            preset: "client",
            presetConfig: {
                gqlTagName: "gql",
              },
        },
      },
};

export default config;