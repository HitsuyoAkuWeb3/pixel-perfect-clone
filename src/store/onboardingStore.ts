import { create } from "zustand";

export type Step = "birthdate" | "goals" | "transformation";

interface OnboardingStore {
  step: Step;
  birthDate: Date | undefined;
  leadName: string | undefined;
  leadEmail: string | undefined;
  goals: [string, string, string];
  transformation: string;
  setStep: (step: Step) => void;
  setBirthDate: (date: Date | undefined) => void;
  setGoal: (index: number, value: string) => void;
  setTransformation: (t: string) => void;
  setLead: (name: string, email: string) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: "birthdate",
  birthDate: undefined,
  leadName: undefined,
  leadEmail: undefined,
  goals: ["", "", ""],
  transformation: "",
  setStep: (step) => set({ step }),
  setBirthDate: (birthDate) => set({ birthDate }),
  setLead: (leadName, leadEmail) => set({ leadName, leadEmail }),
  setGoal: (index, value) =>
    set((state) => {
      const newGoals = [...state.goals] as [string, string, string];
      newGoals[index] = value;
      return { goals: newGoals };
    }),
  setTransformation: (transformation) => set({ transformation }),
  reset: () =>
    set({
      step: "birthdate",
      birthDate: undefined,
      leadName: undefined,
      leadEmail: undefined,
      goals: ["", "", ""],
      transformation: "",
    }),
}));
