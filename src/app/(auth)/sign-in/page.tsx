'use client'
import { useRouter } from "next/navigation";
import z from "zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "../../../schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import {  Loader2 } from "lucide-react";
import axios from "@/lib/axios";
import { connectSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/authStore";

type ResendVerificationResponse = {
  success: boolean;
  message: string;
  username: string;
};

export default function SignInForm() {
    const router = useRouter()
      const { user, setUser } = useAuthStore();
    const [isSubmitting,setisSubmitting] = useState(false);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: '',
            password: ''
        }
    })

       const onSubmit = async (data: z.infer<typeof signInSchema>) => {

  try {

    setisSubmitting(true);

    const response = await axios.post(
      "http://localhost:4000/api/auth/login",
      {
        identifier:
          data.identifier,
        password:
          data.password,
      },
      {
        withCredentials: true,
      }
    );

    alert('User logged in successfully')
    console.log(response.data.data.id);

localStorage.setItem(
  "userId",
  String(response.data.data.id)
);
    connectSocket();
    setUser(response.data.data);
    setUser(response.data.data);

console.log(
  "Zustand after login:",
  useAuthStore.getState().user
);

    router.replace(
      "/dashboard"
    );

  } catch (error: any) {

  console.log(error);

  

  alert(
    error ||
    "Error while logging in"
  );

} finally {

    setisSubmitting(false);

  }
};


    


    return (<div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-full max-w-md p-8 space-x-0 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Welcome Back to SnapShop
                </h1>
                <p className="mb-4">Sign in and Start Shopping 🛍️</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        name="identifier"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email/Username</FormLabel>
                                <Input {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className='w-full' type="submit" disabled={isSubmitting}
                    >{isSubmitting ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Please wait
                                    </>
                                  ) : (
                                    'Sign in'
                                  )}</Button>
                </form>
            </Form>
            <div className="text-center mt-4">
                <p>
                    Not a member yet?{' '}
                    <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                        Sign up
                    </Link>
                </p>
            </div>
            <div className="text-center mt-4">
<p>
                    Did you forgot password?{' '}
                    <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                        Forgot password
                    </Link>
                </p>
            </div>
        </div>
    </div>
    );


} 