"use client";

import React from "react";

import { CodeBlock } from "@/components/ui/code-block";

export function Codeblock() {
    const code = `await fetch("http://localhost:3000/api/v1/events", {
        method: "POST",
        body: JSON.stringify({
          category: "sale",
          fields: {
            plan: "PRO",
            email: "Shadow@email.com",
            amount: 299.00,
            currency: "USD",
            transactionId: "1234567890",
            date: "2023-10-01T12:34:56Z",
            customer: {
              firstName: "Shadow",
              address: {
                street: "123 Main Akihabara",
                city: "Tokyo",
                state: "Japan",
                zip: "12345"
              }
            }
          }
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer <YOUR_API_KEY>"
        }
      })
      `;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <CodeBlock
        language="js"
        filename="kittyAt.js"
        highlightLines={[9, 13, 14, 18]}
        code={code}
      />
    </div>
  );
}
