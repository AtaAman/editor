import create from 'zustand';
import axios from 'axios';

const useHtmlFileStore = create((set) => ({
  htmlFiles: [],
  currentHtmlFile: null,

  saveHtmlFile: async (filename, content) => {
    try {
      const response = await axios.post(
        'https://l2sbackend.onrender.com/api/v1/proposal/save-html',
        { filename, content }
      );

      set((state) => ({
        htmlFiles: [...state.htmlFiles, response.data.data],
      }));
    } catch (error) {
      console.error("Error saving HTML file:", error);
      throw new Error("Failed to save HTML file");
    }
  },

  getAllProposals: async () => {
    try {
      const response = await axios.get('https://l2sbackend.onrender.com/api/v1/proposal/proposals');
      set({ htmlFiles: response.data.data });
    } catch (error) {
      console.error("Error retrieving proposals:", error);
      throw new Error("Failed to retrieve proposals");
    }
  },

  getHtmlFile: async (filename) => {
    try {
      const response = await axios.get(`https://l2sbackend.onrender.com/api/v1/proposal/get-html/${filename}`);
      set({ currentHtmlFile: response.data.data });
    } catch (error) {
      console.error("Error retrieving HTML file:", error);
      throw new Error("Failed to retrieve HTML file");
    }
  },

  setCurrentHtmlFile: (file) => set({ currentHtmlFile: file }),

}));

export default useHtmlFileStore;
