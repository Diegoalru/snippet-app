import { create } from "zustand";

interface SnippetState {
  snippetsName: string[];
  selectedSnippet: string | null;
  addSnippet: (snippetName: string) => void;
  setSnippetsName: (snippetsName: string[]) => void;
  setSelectedSnippet: (snippetName: string) => void;
}

export const useSnippetStore = create<SnippetState>((set) => ({
  snippetsName: [],
  selectedSnippet: null,
  addSnippet: (snippetName: string) =>
    set((state) => ({
      snippetsName: [...state.snippetsName, snippetName],
    })),
  setSnippetsName: (snippetsName: string[]) => set({ snippetsName }),
  setSelectedSnippet: (snippetName: string) =>
    set({ selectedSnippet: snippetName }),
}));
