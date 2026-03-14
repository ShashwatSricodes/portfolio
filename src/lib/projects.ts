export type Project = {
  slug: string;
  name: string;
  description: string;
  longDescription: string[];
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  thumbnail: string;
  cardBg: string;
  keywords: string[];
  stats?: { users: string; pdfs: string };
};

export const projects: Project[] = [
  {
    slug: "pdfslice",
    name: "PDFSlice",
    description: "Client-side PDF toolkit. Merge, split, rotate and compress, fully offline, no uploads.",
    longDescription: [
      "PDFSlice is a fully client-side PDF editor toolkit built to handle common PDF operations without ever uploading your files to a server.",
      "Supports merging multiple PDFs, splitting by page range, rotating pages, and compressing file sizes, all processed locally in the browser for complete privacy.",
      "Built with a clean, minimal UI that makes PDF manipulation accessible without needing desktop software.",
    ],
    liveUrl: "https://pdfslice.in",
    githubUrl: "https://github.com/ShashwatSricodes/PDFSlice",
    techStack: ["React", "TypeScript", "PDF-lib"],
    thumbnail: "/Pdfslice.png",
    cardBg: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    keywords: ["client-side", "merging multiple PDFs", "splitting by page range", "rotating pages", "compressing file sizes", "locally in the browser", "complete privacy"],
    stats: { users: "400+ users", pdfs: "600+ PDFs edited" },
  },
  {
    slug: "morphy",
    name: "Morphy",
    description: "No-code form builder. Build Google Forms-style forms with drag-and-drop and live previews.",
    longDescription: [
      "Morphy is a full-stack no-code form builder that lets you create, share, and collect responses from beautiful forms without writing a line of code.",
      "Developed with React, TypeScript, and Vite on the frontend with reusable UI components for a smooth form creation experience. Backend powered by Node.js and Express, with Supabase handling authentication, database storage, and file handling.",
      "Features dynamic form logic including drag-and-drop question management, live previews, and secure response submission.",
    ],
    liveUrl: "https://formsbuilder-rhfd.onrender.com/",
    githubUrl: "https://github.com/ShashwatSricodes/Forms",
    techStack: ["React", "TypeScript", "Vite", "Node.js", "Express", "Supabase"],
    thumbnail: "/Morphy.png",
    cardBg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    keywords: ["no-code form builder", "React, TypeScript, and Vite", "Node.js and Express", "Supabase", "drag-and-drop question management", "live previews", "secure response submission"],
  },
  {
    slug: "dsa",
    name: "DSA Visualizer",
    description: "Interactive algorithm learning platform. Visualize data structures and algorithms step by step.",
    longDescription: [
      "DSA Visualizer is a web-based visual learning tool built to make data structures and algorithms intuitive through animation and interaction.",
      "Built with Next.js, TypeScript, React Flow, and Framer Motion to animate stacks, queues, linked lists, heaps, trees, and graph structures in real time.",
      "Implements interactive step-by-step simulations for key algorithms including AVL tree rotations, Huffman coding, polynomial multiplication, and Dijkstra's shortest path.",
    ],
    liveUrl: "https://dsa-visualiser-rho.vercel.app/",
    githubUrl: "https://github.com/ShashwatSricodes/DSAVisualiser",
    techStack: ["Next.js", "TypeScript", "React Flow", "Framer Motion"],
    thumbnail: "/DSA.png",
    cardBg: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
    keywords: ["Next.js, TypeScript, React Flow, and Framer Motion", "AVL tree rotations", "Huffman coding", "polynomial multiplication", "Dijkstra's shortest path", "stacks, queues, linked lists, heaps, trees"],
  },
  {
    slug: "kino",
    name: "Kino",
    description: "Visual tracker for movies, anime and shows. Under development.",
    longDescription: [
      "Kino is a beautifully designed React Native app for tracking everything you watch — movies, anime, TV shows, all in one place.",
      "Built to be highly visual, Kino lets you build and browse your watchlist with rich artwork, ratings, and progress tracking across every format.",
      "Coming soon: mini-games built around your watch history, discovery features, and social layers for sharing what you love.",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/ShashwatSricodes/MoviesTracker",
    techStack: ["React Native", "TypeScript", "Expo"],
    thumbnail: "/Kino.png",
    cardBg: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    keywords: ["React Native", "movies, anime, TV shows", "watchlist", "rich artwork", "ratings", "mini-games"],
  },
];