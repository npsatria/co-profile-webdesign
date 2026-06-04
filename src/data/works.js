export const stats = [
    { value: "80", label: "UI dari tim desain" },
    { value: "12", label: "UI Figma dari Atrem" },
    { value: "10", label: "Sistem dashboard" },
    { value: "10", label: "Sistem mobile" },
];

export const workCategories = [
    {
        title: "Landing Page Slicing",
        summary: "Mengubah desain Figma menjadi halaman web responsif, rapi, dan siap direview.",
        items: ["80 UI dari tim UI", "12 UI Figma dari Atrem", "Website Veyra Studio"],
    },
    {
        title: "Dashboard CRUD Systems",
        summary: "Mengerjakan layout dashboard untuk 10 sistem, minimal 8 halaman per sistem.",
        items: ["CRUD lengkap", "Table states", "Form states", "Responsive admin layout"],
    },
    {
        title: "Mobile App Slicing",
        summary: "Mengerjakan 10 sistem mobile dengan minimal 10 halaman dan fitur utama lengkap.",
        items: ["Mobile flow", "Screen states", "Component consistency", "Interaction-ready layout"],
    },
];

export const works = [
    {
        slug: "80-ui-slicing",
        title: "80 UI Slicing",
        category: "Landing Page",
        metric: "80 UI",
        image: "/assets/images/intenr02.webp",
        description: "Slicing kumpulan UI dari tim desain menjadi halaman web yang konsisten dan responsif.",
        context: "Pekerjaan ini melatih kecepatan membaca desain, menjaga spacing, dan menerjemahkan visual Figma ke struktur HTML/CSS.",
        role: "Frontend slicing intern",
        scope: ["Layout responsive", "Reusable section pattern", "Review visual", "Penyesuaian detail spacing"],
        tools: ["HTML", "CSS", "Tailwind", "Figma"],
        result: "Menyelesaikan volume slicing terbesar selama PKL dan membangun kebiasaan kerja detail pada banyak variasi landing page.",
    },
    {
        slug: "12-ui-figma-atrem",
        title: "12 UI Figma Atrem",
        category: "Landing Page",
        metric: "12 UI",
        image: "/assets/images/12UI-slicing.webp",
        description: "Slicing 12 UI yang desain Figmanya disediakan langsung oleh Atrem Project.",
        context: "Fokus pada akurasi implementasi desain internal Atrem, termasuk layout, typography, warna, dan responsive behavior.",
        role: "Frontend slicing intern",
        scope: ["Figma handoff", "Landing page slicing", "Responsive check", "Asset placement"],
        tools: ["HTML", "Tailwind", "Figma", "Vite"],
        result: "Menghasilkan halaman slicing yang lebih dekat dengan standar visual internal Atrem.",
    },
    {
        slug: "veyra-studio",
        title: "Veyra Studio Website",
        category: "Landing Page",
        metric: "Website",
        image: "/assets/images/VeyraStudio-slicing.webp",
        description: "Slicing desain website Veyra Studio dengan fokus pada landing page yang bersih dan profesional.",
        context: "Project ini menjadi latihan menerjemahkan desain brand/agency agar tetap kuat secara visual tetapi nyaman dibaca.",
        role: "Frontend slicing intern",
        scope: ["Website slicing", "Hero layout", "Section rhythm", "Image composition"],
        tools: ["HTML", "Tailwind", "Figma"],
        result: "Membuat tampilan website yang lebih brand-ready dan cocok untuk kebutuhan presentasi company profile.",
    },
    {
        slug: "10-dashboard-systems",
        title: "10 Dashboard Systems",
        category: "Dashboard",
        metric: "10 sistem",
        image: "/assets/images/intenr01.webp",
        description: "Slicing 10 sistem dashboard dengan minimal 8 halaman per sistem dan alur CRUD lengkap.",
        context: "Dashboard membutuhkan konsistensi komponen, struktur tabel, form, empty state, dan layout admin yang mudah discan.",
        role: "Frontend slicing intern",
        scope: ["Dashboard layout", "CRUD pages", "Table UI", "Form UI", "Responsive admin sections"],
        tools: ["HTML", "Tailwind", "Figma"],
        result: "Meningkatkan pemahaman terhadap interface operasional, bukan hanya landing page visual.",
    },
    {
        slug: "10-mobile-systems",
        title: "10 Mobile Systems",
        category: "Mobile",
        metric: "10 sistem",
        image: "/assets/images/intenr03.webp",
        description: "Slicing 10 sistem mobile dengan minimal 10 halaman per sistem dan fitur utama lengkap.",
        context: "Fokus pada screen-to-screen flow, komponen mobile, keterbacaan, dan konsistensi interaksi dalam ukuran layar kecil.",
        role: "Mobile UI slicing intern",
        scope: ["Mobile screens", "Main feature pages", "Navigation flow", "Responsive preview"],
        tools: ["HTML", "Tailwind", "Figma"],
        result: "Membangun pemahaman desain mobile yang lebih sistematis dari sisi layout dan user flow.",
    },
];

export const processSteps = [
    "Membaca file desain dan menentukan struktur halaman.",
    "Membangun layout awal dengan komponen yang konsisten.",
    "Merapikan responsive behavior untuk desktop dan mobile.",
    "Melakukan review visual, spacing, dan asset placement.",
];

export const learningMaterials = [
    {
        title: "UX Research",
        icon: "solar-ux",
        description: "Memahami fundamental kebutuhan pengguna dalam produk digital.",
    },
    {
        title: "UX Testing",
        icon: "solar-research",
        description: "Validasi desain melalui interaksi langsung dengan responden.",
    },
    {
        title: "UI Prototyping",
        icon: "solar-prototype",
        description: "Visualisasi alur pengguna melalui Figma yang interaktif.",
    },
    {
        title: "Tailwind CSS",
        icon: "tailwind",
        description: "Slicing antarmuka modern dengan efisiensi tinggi.",
    },
];

export const sideQuests = [
    {
        number: "01",
        title: "Mini Blog Tech Zone",
        description: "Pembuatan website mini blog interaktif untuk artikel teknologi. Berfokus pada perancangan antarmuka (slicing UI) dan penataan layout konten.",
    },
    {
        number: "02",
        title: "Target Promosi Jasa",
        description: "Pengumpulan data 320+ akun Instagram & Google Maps dari 36+ kategori usaha lokal (Bimbel, Villa, Bengkel, Catering, dsb.) sebagai target promosi jasa digital agensi.",
    },
    {
        number: "03",
        title: "300+ UI References",
        description: "Eksplorasi referensi desain antarmuka mencakup 10 web lokal & 10 web internasional dari 22 tema bisnis, 40 web SaaS, dan 40 akun penjual aset UI/UX.",
    },
    {
        number: "04",
        title: "GMaps Reviews",
        description: "Membantu pengumpulan 10 ulasan/review Google Maps untuk Atrem Project dengan melampirkan foto dokumentasi non-duplikat dari Google Drive.",
        link: "https://drive.google.com/drive/folders/1Ikj35VN9gUh8h8VytzIKZkCLlx_n1Ztr?usp=sharing",
    },
];
