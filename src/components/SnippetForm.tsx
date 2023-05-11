import React, { useState } from 'react'
import { writeFile } from '@tauri-apps/api/fs'
import { documentDir } from "@tauri-apps/api/path";

function SnippetForm() {

  const [snippetName, setSnippetName] = useState<string>()

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createSnippet();
  }
  
  async function createSnippet() {

if (!snippetName) {
      alert('Please enter a snippet name');
      return;
    }

    // Verificar que el nombre no exceda los 255 bytes (255 caracteres).
    if (snippetName!.length > 255) {
      alert('Snippet name is too long');
      return;
    }


    let path = await documentDir();
    writeFile(`${path}/tauriDocs/${snippetName}.json`, '{}');
  }


  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <input
        className="bg-zinc-900 w-full border-none outline-none p-4 text-white"
        type="text"
        placeholder="Snippet Name"
        onChange={(e) => setSnippetName(e.target.value)}
      />
      <button className="hidden" type="submit" />
    </form>
  );
}

export default SnippetForm