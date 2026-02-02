import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Checkbox } from "@/Components/ui/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faLock,
    faEye,
    faEyeSlash,
    faShieldAlt,
    faEnvelope,
    faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Login" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
                <div className="w-full max-w-md">
                    <Card className="border border-gray-200 dark:border-gray-700 shadow-lg">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                                Masuk ke Akun
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-400">
                                Masukkan kredensial Anda di bawah ini
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {status && (
                                <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                                    <AlertDescription className="text-green-800 dark:text-green-300">
                                        {status}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {errors.email && (
                                <Alert variant="destructive" className="mb-6">
                                    <AlertDescription>
                                        {errors.email}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="email"
                                        className="text-gray-700 dark:text-gray-300"
                                    >
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            className="mr-2"
                                        />
                                        Alamat Email
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            autoComplete="username"
                                            placeholder="nama@example.com"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className={`pl-10 pr-4 py-6 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${errors.email ? "border-red-500" : ""}`}
                                            required
                                        />
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label
                                            htmlFor="password"
                                            className="text-gray-700 dark:text-gray-300"
                                        >
                                            <FontAwesomeIcon
                                                icon={faLock}
                                                className="mr-2"
                                            />
                                            Kata Sandi
                                        </Label>
                                        {canResetPassword && (
                                            <a
                                                href={route("password.request")}
                                                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                                            >
                                                Lupa kata sandi?
                                            </a>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            value={data.password}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value,
                                                )
                                            }
                                            className={`pl-10 pr-12 py-6 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${errors.password ? "border-red-500" : ""}`}
                                            required
                                        />
                                        <FontAwesomeIcon
                                            icon={faLock}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    showPassword
                                                        ? faEyeSlash
                                                        : faEye
                                                }
                                            />
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Remember Me Checkbox */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) =>
                                            setData("remember", checked)
                                        }
                                        className="border-gray-300 dark:border-gray-600"
                                    />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                                    >
                                        Ingat saya
                                    </Label>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-6 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white font-semibold transition-all duration-200"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Memproses...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <FontAwesomeIcon
                                                icon={faSignInAlt}
                                                className="mr-2"
                                            />
                                            Masuk
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                                Belum punya akun?{" "}
                                <Link
                                    href={route("register")}
                                    className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                                >
                                    Daftar sekarang
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}
