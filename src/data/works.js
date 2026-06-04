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
        image: "#",
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
        image: "/assets/images/mockup-Veyrastudio.png",
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
        image: "#",
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
        image: "#",
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
        title: "Figma Handoff",
        icon: "solar-ux",
        description: "Membaca struktur desain Figma, spacing, typography, warna, dan kebutuhan asset sebelum slicing.",
    },
    {
        title: "Frontend Slicing",
        icon: "solar-research",
        description: "Mengubah desain landing page, dashboard, dan mobile screen menjadi tampilan web responsif.",
    },
    {
        title: "Responsive Layout",
        icon: "solar-prototype",
        description: "Menyesuaikan layout agar nyaman dilihat di desktop dan mobile.",
    },
    {
        title: "Visual Review",
        icon: "tailwind",
        description: "Mengecek alignment, spacing, warna, font, dan kesesuaian hasil slicing dengan desain.",
    },
];

export const sideQuests = [
    {
        number: "01",
        title: "Target Promosi Jasa",
        description:
            "Saya mencari minimal 20 akun Instagram atau Google Maps untuk setiap kategori usaha, seperti bimbingan belajar, vila, salon, bengkel, laundry, katering, dan wedding organizer. Data ini digunakan sebagai target pemasaran layanan digitalisasi dari Atrem Project.",
    },
    {
        number: "02",
        title: "Riset Pasar dan Kompetitor",
        description:
            "Saya melakukan riset terhadap 20 produk SaaS berbasis AI dan non-AI, serta 20 penjual aset digital seperti UI kit, source code, dan aset pendukung lainnya melalui website maupun media sosial.",
    },
    {
        number: "03",
        title: "Referensi UI dan Benchmarking",
        description:
            "Saya mengumpulkan 25 materi edukasi berupa tips dan tutorial seputar frontend, backend, serta UI/UX. Saya juga melakukan benchmarking terhadap 20 website bisnis lokal dan internasional dengan memilah website yang tampilannya kurang baik dan website yang sudah memenuhi standar visual.",
    },
    {
        number: "04",
        title: "Referensi Sistem dan AI",
        description:
            "Saya mengeksplorasi 20 AI generator tools untuk kebutuhan Figma dan code. Selain itu, saya menyusun 10 ide sistem bisnis lengkap dengan jenis bisnis, masalah yang dihadapi, dan solusi yang dapat ditawarkan.",
    },
    {
        number: "05",
        title: "Riset Tren dan Konten Media Sosial",
        description:
            "Saya melakukan riset informasi lomba dan webinar IT, akun dengan konten vibe coding serta UI/UX, toko thrift pakaian dan sepatu bekas di Bali, serta analisis dampak konsep Web4 terhadap industri.",
    },
    {
        number: "06",
        title: "Media Sosial dan Promosi",
        description:
            "Saya ikut mengunggah story promosi yang diberikan oleh Atrem Project melalui akun media sosial pribadi sebagai bagian dari aktivitas promosi agensi.",
    },
    {
        number: "07",
        title: "Review dan Testimoni Google Maps",
        description:
            "Saya meminta bantuan orang sekitar untuk mengisi review Google Maps Atrem Project. Setiap anggota tim menargetkan 10 review dengan menggunakan gambar pendukung dari Google Drive agar testimoni tidak menggunakan foto yang sama.",
    },
];
