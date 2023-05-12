import { create } from "zustand";

interface SnippetState {
  snippetsName: string[];
  addSnippet: (snippetName: string) => void;
  setSnippetsName: (snippetsName: string[]) => void;
}

export const useSnippetStore = create<SnippetState>((set) => ({
  snippetsName: [],
  addSnippet: (snippetName: string) =>
    set((state) => ({
      snippetsName: [...state.snippetsName, snippetName],
    })),
  setSnippetsName: (snippetsName: string[]) => set({ snippetsName }),
}));
