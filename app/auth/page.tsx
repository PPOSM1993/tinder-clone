"use client"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Button } from "@/components/ui/button"

export default function AuthPage() {

    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-red-100 dark:from-gray-900 dark:to-gray-800">
                <div className="max-w-md w-full space-y-8 p-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            StreamMatch
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {isSignUp ? "Create Your Account" : "Sign in to your account"}
                        </p>
                    </div>

                    <Form className="space-y-6">
                        <div>
                            <Label htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 py-1">
                                Email
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:text-white"
                                required />
                        </div>

                        <div>
                            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 py-1">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:text-white"
                                placeholder="Enter your password"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
                        >
                            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                    </Form>

                    <div className="text-center">
                        <Button onClick={() => setIsSignUp(!isSignUp)} className="text-pink-600 dark:text-pink-400 hover:text-pink-500 dark:hover:text-pink-300 text-sm">
                            {isSignUp
                                ? "Already have an account? Sign in"
                                : "Don't have an account? Sign up"}
                        </Button>
                    </div>

                </div>
            </div>
        </>
    )
}