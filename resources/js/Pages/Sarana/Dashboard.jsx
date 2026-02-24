import { useState, useMemo } from "react";
import { Form, Head, Link, useForm, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faPaperPlane,
    faUser,
    faReply,
    faFilter,
    faSearch,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "@/Components/Dropdown";

// keep categories for filtering and display
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

// const CATEGORIES = ["Semua", "Fasilitas", "Infrastruktur", "Akademik"];
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

function DetailDialog({ item, role }) {
    const replyForm = useForm({
        message: "",
        status: "",
        aspirasi_id: item.id,
    });

    const submitReply = (e) => {
        e.preventDefault();
        replyForm.post(route("aspirasi.reply"), {
            onSuccess: () => replyForm.reset(),
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 h-8 w-8 p-0 rounded-lg transition-all bg-white"
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
                        <div className="bg-white rounded-xl p-4 space-y-3 border border-slate-200">
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

                    {role === "admin" && (
                        <form onSubmit={submitReply} className="space-y-4 ">
                            <Textarea
                                placeholder="Balas aspirasi..."
                                value={replyForm.data.message}
                                onChange={(e) =>
                                    replyForm.setData("message", e.target.value)
                                }
                            />
                            <Select
                                value={replyForm.data.status}
                                onValueChange={(value) =>
                                    replyForm.setData("status", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Ubah status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="process">
                                        Process
                                    </SelectItem>
                                    <SelectItem value="closed">
                                        Closed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="submit" className="w-full">
                                <FontAwesomeIcon
                                    icon={faPaperPlane}
                                    className="mr-2"
                                />
                                Kirim Balasan
                            </Button>
                        </form>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

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
];

export default function Dashboard() {
    const { auth, categories } = usePage().props;
    const role = auth.user.roles[0]?.name || "student";
    const [open, setOpen] = useState(false);

    // filters and search
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Semua Status");
    const [categoryFilter, setCategoryFilter] = useState("Semua");

    const userItems = useMemo(() => {
        const base =
            role === "admin"
                ? aspirasi
                : aspirasi.filter((a) => a.user.id === auth.user.id);
        return base;
    }, [role, auth.user.id]);

    const filtered = useMemo(() => {
        return userItems.filter((item) => {
            const matchSearch =
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase()) ||
                item.user.name.toLowerCase().includes(search.toLowerCase());
            const matchStatus =
                statusFilter === "Semua Status" || item.status === statusFilter;
            const matchCategory =
                categoryFilter === "Semua" || item.category === categoryFilter;
            return matchSearch && matchStatus && matchCategory;
        });
    }, [search, statusFilter, categoryFilter, userItems]);

    // forms
    const createForm = useForm({
        title: "",
        description: "",
        location: "",
        category_id: "",
        photo: null,
    });

    const submitAspirasi = (e) => {
        e.preventDefault();
        createForm.post(route("reports.store"), {
            onSuccess: () => {
                setOpen(false);
                createForm.reset();
            },
        });
    };

    // reply handled inside DetailDialog when admin

    const logoutForm = useForm();
    const logout = () => logoutForm.post(route("logout"));

    return (
        <>
            <Head title="Dashboard Aspirasi" />

            <div
                className="min-h-screen"
                style={{
                    background:
                        "linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f5f0ff 100%)",
                    fontFamily: "'DM Sans', sans-serif",
                }}
            >
                {/* header */}
                <nav className="sticky top-0 z-50 bg-indigo-600 text-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                        <h1 className="text-xl font-bold">Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <span>{auth.user.name}</span>
                            <Button
                                variant="outline"
                                onClick={logout}
                                className="text-white border-white hover:bg-white/20"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </nav>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
                    {role === "student" && (
                        <>
                            <Button
                                onClick={() => setOpen(true)}
                                className="mb-6 rounded-xl px-5 shadow-sm hover:shadow-md transition-all"
                            >
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="mr-2"
                                />
                                Buat Aspirasi
                            </Button>

                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogContent className="rounded-2xl bg-white">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl">
                                            Buat Aspirasi
                                        </DialogTitle>
                                    </DialogHeader>

                                    <div
                                        className="space-y-4"
                                    >
                                        <Input
                                            placeholder="Judul Aspirasi"
                                            className="rounded-xl"
                                            value={createForm.data.title}
                                            onChange={(e) =>
                                                createForm.setData(
                                                    "title",
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        <Input
                                            placeholder="Lokasi Kejadian"
                                            className="rounded-xl"
                                            value={createForm.data.location}
                                            onChange={(e) =>
                                                createForm.setData(
                                                    "location",
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        <Select
                                            onValueChange={(value) =>
                                                createForm.setData(
                                                    "category_id",
                                                    value,
                                                )
                                            }
                                        >
                                            <SelectTrigger className="rounded-xl">
                                                <SelectValue placeholder="Pilih Kategori" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={String(
                                                            category.id,
                                                        )}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="rounded-xl cursor-pointer"
                                            onChange={(e) =>
                                                createForm.setData(
                                                    "photo",
                                                    e.target.files[0],
                                                )
                                            }
                                        />

                                        <Textarea
                                            placeholder="Tulis aspirasi kamu di sini..."
                                            className="rounded-xl min-h-[120px]"
                                            value={createForm.data.description}
                                            onChange={(e) =>
                                                createForm.setData(
                                                    "description",
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        <Button
                                            onClick={submitAspirasi}
                                            className="w-full rounded-xl shadow-sm hover:shadow-md transition-all"
                                        >
                                            Kirim Aspirasi
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}

                    {/* filters: same as index */}
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
                                        placeholder="Cari aspirasi"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
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
                                        {/* include 'Semua' option first */}
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

                            {/* Active filters */}
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
                    {/* table */}
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
                                                Tidak ada aspirasi.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filtered.map((item, idx) => (
                                            <TableRow
                                                key={item.id}
                                                className="table-row-hover border-slate-100 even:bg-slate-50"
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
                                                    <DetailDialog
                                                        item={item}
                                                        role={role}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
