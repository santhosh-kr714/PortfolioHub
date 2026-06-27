import { create } from 'zustand';

interface PortfolioState {
  profile: any;
  projects: any[];
  skills: any[];
  experience: any[];
  education: any[];
  certificates: any[];
  achievements: any[];
  socialLinks: any[];
  theme: any;
  setProfile: (profile: any) => void;
  updateProfile: (data: any) => void;
  setProjects: (projects: any[]) => void;
  setSkills: (skills: any[]) => void;
  setExperience: (experience: any[]) => void;
  setEducation: (education: any[]) => void;
  setCertificates: (certificates: any[]) => void;
  setAchievements: (achievements: any[]) => void;
  setSocialLinks: (socialLinks: any[]) => void;
  setTheme: (theme: any) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  profile: {
    full_name: 'Your Name',
    headline: 'Your Headline',
    bio: 'Your Bio',
    profile_image: null,
    location: '',
    email: ''
  },
  projects: [],
  skills: [],
  experience: [],
  education: [],
  certificates: [],
  achievements: [],
  socialLinks: [],
  theme: {
    primary_color: '#3B82F6',
    background_color: '#000000',
    font_family: 'Inter',
  },
  
  setProfile: (profile) => set({ profile }),
  updateProfile: (data) => set((state) => ({ profile: { ...state.profile, ...data } })),
  setProjects: (projects) => set({ projects }),
  setSkills: (skills) => set({ skills }),
  setExperience: (experience) => set({ experience }),
  setEducation: (education) => set({ education }),
  setCertificates: (certificates) => set({ certificates }),
  setAchievements: (achievements) => set({ achievements }),
  setSocialLinks: (socialLinks) => set({ socialLinks }),
  setTheme: (theme) => set({ theme }),
}));
