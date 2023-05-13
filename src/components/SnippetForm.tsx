import React, { useState } from "react";
import { writeFile, exists } from "@tauri-apps/api/fs";
import { documentDir } from "@tauri-apps/api/path";
import { toast } from "react-hot-toast";

function SnippetForm() {
  const [snippetName, setSnippetName] = useState<string>();

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    toast.promise(
      createSnippet(),
      {
        loading: "Creating snippet...",
        success: "Snippet created!",
        error: "Error creating snippet",
      },
      {
        duration: 3000,
        position: "bottom-right",
        style: {
          background: "#333",
          color: "#fff",
        },
      }
    );
  }

  async function createSnippet() {
    if (!snippetName) {
      alert("Please enter a snippet name");
      return;
    }

    // Verificar que el nombre no exceda los 255 bytes (255 caracteres).
    if (snippetName!.length > 255) {
      alert("Snippet name is too long");
      return;
    }

    if (await existsFile()) {
      throw new Error("Snippet already exists");
    }

    await createFile();
  }

  async function createFile() {
    let path = await documentDir();
    await writeFile(`${path}/tauriDocs/${snippetName}`, "");
  }

  async function existsFile() {
    let path = await documentDir();
    let response = await exists(`${path}/tauriDocs/${snippetName}`);
    return response;
  }

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <input
        className="bg-zinc-900 w-full border-none outline-none p-4 text-white"
        type="text"
        placeholder="Snippet Name"
        onChange={(e) => setSnippetName(e.target.value)}
      />
      <button
        className="hidden"
        type="submit"
      />
    </form>
  );
}

export default SnippetForm;
