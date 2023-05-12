import { create } from "zustand";

interface Snippet {
  name: string;
  code: string | null;
}

interface SnippetState {
  snippetsName: string[];
  selectedSnippet: Snippet | null;
  addSnippet: (snippetName: string) => void;
  setSnippetsName: (snippetsName: string[]) => void;
  setSelectedSnippet: (snippetName: Snippet | null) => void;
  removeSnippet: (snippetName: string) => void;
}

export const useSnippetStore = create<SnippetState>((set) => ({
  snippetsName: [],
  selectedSnippet: null,
  addSnippet: (snippetName: string) =>
    set((state) => ({
      snippetsName: [...state.snippetsName, snippetName],
    })),
  setSnippetsName: (snippetsName: string[]) => set({ snippetsName }),
  setSelectedSnippet: (selectedSnippet: Snippet | null) =>
    set({ selectedSnippet }),
  removeSnippet: (snippetName: string) =>
    set((state) => ({
      snippetsName: state.snippetsName.filter(
        (item) => item !== snippetName
      ),
    })),
}));
