import { useEffect } from "react";
import { BaseDirectory, readDir } from "@tauri-apps/api/fs";
import { useSnippetStore } from "../storage/SnippetStore";

function SnippetList() {
  const setSnippetsName = useSnippetStore((state) => state.setSnippetsName);
  const snippetNames = useSnippetStore((state) => state.snippetsName);

  async function getSnippetFiles() {
    let files = await readDir(`tauriDocs`, {
      recursive: true,
      dir: BaseDirectory.Document,
    });

    const snippetNamesArray = files.map((file) => file.name!);
    
    setSnippetsName(snippetNamesArray);
  }

  useEffect(() => {
    getSnippetFiles();
  }, [setTimeout(() => {}, 3000)]);

  return (
    <div>
      <h1 className="text-center">FILES</h1>
      <ul>
        {snippetNames.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  )
}

export default SnippetList;
