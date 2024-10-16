import { ActionGetResponse } from "@solana/actions"

export async function GET(request: Request) {
    const actionMetadata: ActionGetResponse = {
        icon: "https://solana.com/favicon.ico",
        title: "Hello World",
        description: "This is a simple hello world action",
        label: "Hello World",
    }
    return new Response('Hello, from API!')
  }
  