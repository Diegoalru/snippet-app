import { useEffect } from "react";
import { BaseDirectory, readDir } from "@tauri-apps/api/fs";
import { useSnippetStore } from "../store/SnippetStore";
import SnippetItem from "./SnippetItem";

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
      <h1 className="text-center text-xl font-bold">FILES</h1>
        {snippetNames.map((name) => (
          <SnippetItem key={name} snippetName={name} />
        ))}
    </div>
  )
}

export default SnippetList;
