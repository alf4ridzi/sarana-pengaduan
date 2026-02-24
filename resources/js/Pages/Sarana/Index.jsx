import { Head, Link, usePage } from "@inertiajs/react";
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faComments,
    faSearch,
    faFilter,
    faChevronRight,
    faReply,
    faUser,
    faCircle,
    faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const aspirasi = [
    {
        id: 1,
        title: "Perbaikan Fasilitas WiFi Kampus",
        description:
            "Koneksi WiFi di gedung A sering terputus dan sangat lambat terutama saat jam sibuk.",
        status: "open",
        category: "Fasilitas",
        replies: [],
        user: { id: 2, name: "Ahmad Fauzi" },
        created_at: "2026-02-20 09:12:00",
    },
    {
        id: 2,
        title: "Penambahan Tempat Parkir Motor",
        description:
            "Area parkir motor tidak mencukupi saat jam perkuliahan pagi, banyak motor parkir sembarangan.",
        status: "process",
        category: "Infrastruktur",
        replies: [
            {
                id: 1,
                message:
                    "Terima kasih atas masukannya. Saat ini sedang dilakukan perencanaan perluasan area parkir.",
                user: { id: 1, name: "Admin Kampus" },
                created_at: "2026-02-21 10:00:00",
            },
        ],
        user: { id: 3, name: "Siti Rahma" },
        created_at: "2026-02-19 14:45:00",
    },
    {
        id: 3,
        title: "AC Ruang Kelas Tidak Berfungsi",
        description:
            "AC di ruang B203 sudah beberapa hari tidak dingin dan membuat suasana belajar tidak nyaman.",
        status: "closed",
        category: "Fasilitas",
        replies: [
            {
                id: 2,
                message:
                    "Tim teknisi sudah memperbaiki AC pada tanggal 18 Februari. Silakan konfirmasi jika masih bermasalah.",
                user: { id: 1, name: "Admin Kampus" },
                created_at: "2026-02-18 16:30:00",
            },
        ],
        user: { id: 4, name: "Budi Santoso" },
        created_at: "2026-02-17 08:20:00",
    },
    {
        id: 4,
        title: "Penambahan Kursi di Perpustakaan",
        description:
            "Kapasitas kursi di perpustakaan sangat terbatas, banyak mahasiswa terpaksa berdiri saat belajar.",
        status: "open",
        category: "Akademik",
        replies: [],
        user: { id: 5, name: "Dewi Lestari" },
        created_at: "2026-02-22 11:00:00",
    },
    {
        id: 5,
        title: "Jadwal UTS Bertabrakan",
        description:
            "Ada dua mata kuliah yang dijadwalkan ujian di waktu yang sama pada hari Senin depan.",
        status: "process",
        category: "Akademik",
        replies: [
            {
                id: 3,
                message:
                    "Kami sedang berkoordinasi dengan dosen terkait untuk menjadwal ulang.",
                user: { id: 1, name: "Admin Kampus" },
                created_at: "2026-02-23 08:00:00",
            },
        ],
        user: { id: 6, name: "Rizky Pratama" },
        created_at: "2026-02-21 16:30:00",
    },
];

const STATUS_CONFIG = {
    open: {
        label: "Terbuka",
        color: "bg-rose-100 text-rose-700 border-rose-200",
        dot: "bg-rose-500",
    },
    process: {
        label: "Diproses",
        color: "bg-amber-100 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
    },
    closed: {
        label: "Selesai",
        color: "bg-emerald-100 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
    },
};

const STATUSES = ["Semua Status", "open", "process", "closed"];

function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] || {};
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
        </span>
    );
}

function DetailDialog({ item }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 h-8 w-8 p-0 rounded-lg transition-all"
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="text-xs"
                    />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg rounded-2xl bg-white">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-slate-800 leading-snug pr-4">
                        {item.title}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-1">
                    <div className="flex items-center gap-3 flex-wrap">
                        <StatusBadge status={item.status} />
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            {item.category}
                        </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                        {item.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-400 border-t pt-3">
                        <span className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faUser} />
                            {item.user.name}
                        </span>
                        <span>
                            {new Date(item.created_at).toLocaleDateString(
                                "id-ID",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                },
                            )}
                        </span>
                    </div>

                    {item.replies.length > 0 && (
                        <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-200">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                <FontAwesomeIcon icon={faReply} />
                                Balasan Admin
                            </h4>
                            {item.replies.map((reply) => (
                                <div key={reply.id} className="space-y-1">
                                    <p className="text-sm text-slate-700">
                                        {reply.message}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {reply.user.name} ·{" "}
                                        {new Date(
                                            reply.created_at,
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "short",
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function Index() {
    const { categories } = usePage().props;

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua Status");
    const [categoryFilter, setCategoryFilter] = useState("Semua");

    const filtered = useMemo(() => {
        return aspirasi.filter((item) => {
            const matchSearch =
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase()) ||
                item.user.name.toLowerCase().includes(search.toLowerCase());
            const matchStatus =
                statusFilter === "Semua Status" || item.status === statusFilter;
            const matchCategory =
                categoryFilter === "Semua" ||
                item.category === categoryFilter;
            return matchSearch && matchStatus && matchCategory;
        });
    }, [search, statusFilter, categoryFilter]);

    const stats = useMemo(
        () => ({
            total: aspirasi.length,
            open: aspirasi.filter((a) => a.status === "open").length,
            process: aspirasi.filter((a) => a.status === "process").length,
            closed: aspirasi.filter((a) => a.status === "closed").length,
        }),
        [],
    );

    return (
        <>
            <Head title="Sarana Pengaduan" />

            <div
                className="min-h-screen"
                style={{
                    background:
                        "linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f5f0ff 100%)",
                    fontFamily: "'DM Sans', sans-serif",
                }}
            >
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');
                    * { font-family: 'DM Sans', sans-serif; }
                    .brand-heading { font-family: 'DM Serif Display', serif; }
                    .table-row-hover { transition: background 0.15s ease; }
                    .table-row-hover:hover { background: #f8faff; }
                    .stat-card { backdrop-filter: blur(8px); }
                    @keyframes fadeUp {
                        from { opacity: 0; transform: translateY(12px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .fade-up { animation: fadeUp 0.4s ease forwards; }
                    .fade-up-delay-1 { animation: fadeUp 0.4s 0.05s ease both; }
                    .fade-up-delay-2 { animation: fadeUp 0.4s 0.1s ease both; }
                    .fade-up-delay-3 { animation: fadeUp 0.4s 0.15s ease both; }
                `}</style>

                {/* Navbar */}
                <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 text-white shadow-lg backdrop-blur">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/20">
                                <FontAwesomeIcon
                                    icon={faComments}
                                    className="text-white text-sm"
                                />
                            </div>

                            <span className="text-xl font-semibold tracking-tight">
                                <span className="text-white">Aspirasi</span>
                                <span className="text-indigo-200">Ku</span>
                            </span>
                        </div>

                        <Link
                            href={route("login")}
                            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-4 h-10 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
                        >
                            <span>Login</span>
                            <FontAwesomeIcon
                                icon={faArrowAltCircleRight}
                                className="text-sm"
                            />
                        </Link>
                    </div>
                </nav>

                {/* Hero */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6 fade-up">
                    <div className="mb-2">
                        <h1 className="brand-heading text-3xl sm:text-4xl font-bold text-slate-800">
                            Semua Aspirasi
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm">
                            Pantau dan kelola seluruh pengaduan mahasiswa kampus
                        </p>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 fade-up-delay-1">
                        {[
                            {
                                label: "Total",
                                value: stats.total,
                                color: "from-slate-600 to-slate-800",
                            },
                            {
                                label: "Terbuka",
                                value: stats.open,
                                color: "from-rose-400 to-rose-600",
                            },
                            {
                                label: "Diproses",
                                value: stats.process,
                                color: "from-amber-400 to-amber-600",
                            },
                            {
                                label: "Selesai",
                                value: stats.closed,
                                color: "from-emerald-400 to-emerald-600",
                            },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="stat-card bg-white/80 border border-white rounded-2xl p-4 shadow-sm"
                            >
                                <p className="text-xs text-slate-500 font-medium">
                                    {stat.label}
                                </p>
                                <p
                                    className={`text-2xl font-bold mt-1 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}
                                >
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 fade-up-delay-2">
                    <div className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl shadow-sm p-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Search */}
                            <div className="relative w-full sm:w-64">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                                />
                                <Input
                                    placeholder="Cari aspirasi, nama mahasiswa..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9 rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-sm h-10 transition-all focus:ring-2 focus:ring-indigo-100 w-full"
                                />
                            </div>
                            {/* Status Filter */}
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                            >
                                <SelectTrigger className="w-full sm:w-44 h-10 rounded-xl border-slate-200 bg-slate-50 text-sm">
                                    <FontAwesomeIcon
                                        icon={faFilter}
                                        className="mr-2 text-slate-400 text-xs"
                                    />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    {STATUSES.map((s) => (
                                        <SelectItem
                                            key={s}
                                            value={s}
                                            className="text-sm flex items-center gap-2 bg-white"
                                        >
                                            {s === "Semua Status" ? (
                                                "Semua Status"
                                            ) : (
                                                <StatusBadge status={s} />
                                            )}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* Category Filter */}
                            <Select
                                value={categoryFilter}
                                onValueChange={setCategoryFilter}
                            >
                                <SelectTrigger className="w-full sm:w-48 h-10 rounded-xl border-slate-200 bg-slate-50 text-sm">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem
                                            key="semua"
                                            value="Semua"
                                            className="text-sm flex items-center gap-1 bg-white"
                                        >
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                Semua
                                            </span>
                                        </SelectItem>
                                    {categories.map((c) => (
                                        <SelectItem
                                            key={c.code}
                                            value={c.name}
                                            className="text-sm flex items-center gap-1 bg-white"
                                        >
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                {c.name}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {(search ||
                            statusFilter !== "Semua Status" ||
                            categoryFilter !== "Semua") && (
                            <div className="flex items-center gap-2 mt-3 flex-wrap">
                                <span className="text-xs text-slate-400">
                                    {filtered.length} hasil ditemukan
                                </span>
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setStatusFilter("Semua Status");
                                        setCategoryFilter("Semua");
                                    }}
                                    className="text-xs text-indigo-500 hover:text-indigo-700 underline underline-offset-2 transition-colors"
                                >
                                    Reset filter
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 fade-up-delay-3">
                    <div className="bg-white/80 backdrop-blur-sm border border-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-slate-100 bg-indigo-50/60">
                                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide w-8 pl-6">
                                            #
                                        </TableHead>
                                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                            Judul
                                        </TableHead>
                                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                                            Kategori
                                        </TableHead>
                                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">
                                            Pengaju
                                        </TableHead>
                                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                            Status
                                        </TableHead>
                                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                                            Balasan
                                        </TableHead>
                                        <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                                            Tanggal
                                        </TableHead>
                                        <TableHead className="w-10 pr-6"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filtered.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                className="text-center py-16 text-slate-400 text-sm"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faComments}
                                                    className="text-3xl text-slate-200 mb-3 block"
                                                />
                                                Tidak ada aspirasi yang
                                                ditemukan.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filtered.map((item, idx) => (
                                            <TableRow
                                                key={item.id}
                                                className="table-row-hover border-slate-100 even:bg-slate-50 even:dark:bg-slate-800"
                                            >
                                                <TableCell className="pl-6 text-sm text-slate-400 font-mono">
                                                    {String(idx + 1).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-4 max-w-xs">
                                                    <p className="font-semibold text-slate-800 text-sm leading-snug line-clamp-1">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1 hidden sm:block">
                                                        {item.description}
                                                    </p>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100">
                                                        {item.category}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell text-sm text-slate-600">
                                                    {item.user.name}
                                                </TableCell>
                                                <TableCell>
                                                    <StatusBadge
                                                        status={item.status}
                                                    />
                                                </TableCell>
                                                <TableCell className="hidden lg:table-cell">
                                                    <span className="flex items-center gap-1.5 text-sm text-slate-500">
                                                        <FontAwesomeIcon
                                                            icon={faReply}
                                                            className="text-xs text-slate-300"
                                                        />
                                                        {item.replies.length}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="hidden lg:table-cell text-xs text-slate-400">
                                                    {new Date(
                                                        item.created_at,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        },
                                                    )}
                                                </TableCell>
                                                <TableCell className="pr-4">
                                                    <DetailDialog item={item} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Footer */}
                        {filtered.length > 0 && (
                            <div className="border-t border-slate-100 px-6 py-3 flex items-center justify-between">
                                <p className="text-xs text-slate-400">
                                    Menampilkan {filtered.length} dari{" "}
                                    {aspirasi.length} aspirasi
                                </p>
                                <p className="text-xs text-slate-300">
                                    AspirasíKu © 2026
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
