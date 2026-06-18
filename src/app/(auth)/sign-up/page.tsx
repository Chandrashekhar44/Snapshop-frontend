'use client'
import { useRouter } from "next/navigation";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "@/lib/axios";
import {signupSchema} from '../../../schemas/signupSchema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";

type ResendVerificationResponse = {
  success: boolean;
  message: string;
  username: string;
};

export default function SignInForm() {
    const router = useRouter()
    const {toast} = useToast();
    const [isSubmitting,setisSubmitting] = useState(false);
    const [loadingLocation, setLoadingLocation] =useState(false);



    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: '',
            email:'',
            address:'',
            password: '',
            category:''
        }
    })

  const [location, setLocation] = useState({
  latitude: null as number | null,
  longitude: null as number | null,
});

const geoLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
  alert(
    `Code: ${error.code}\nMessage: ${error.message}`
  );
},
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  };

 

const onSubmit = async (data: z.infer<typeof signupSchema>) => {
  try {
    setisSubmitting(true);
    if (
  location.latitude === null ||
  location.longitude === null
) {
  toast({
    title: "Location Required",
    description:
      "Please enable location first.",
  });

  return;
}

    const result =await axios.post(
  "http://localhost:5001/api/auth/register",
  {
    ...data,
    latitude: location.latitude,
    longitude: location.longitude,
  }
);

    console.log(result.data);

    alert("User registered successfully");
    router.push('/sign-in')

  } catch (error: any) {
    console.error(error);

    alert(
      error?.response?.data?.message || "Something went wrong"
    );
  } finally {
    setisSubmitting(false);
  }
};


     


    


    return (<div className="flex justify-center items-center min-h-screen bg-black">
        <div className="w-full max-w-md p-8 space-x-0 space-y-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Welcome to SnapShop
                </h1>
                <p className="mb-4">Register and Start Shopping 🛍️</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        name="username"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <Input {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <Input type="Email" {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="address"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <Input type="Address" {...field} />
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
                    <FormField
  control={form.control}
  name="category"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Category</FormLabel>

      <Select
        onValueChange={field.onChange}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="fashion">Fashion</SelectItem>
          <SelectItem value="books">Books</SelectItem>
          <SelectItem value="sports">Sports</SelectItem>
        </SelectContent>
      </Select>

      <FormMessage />
    </FormItem>
  )}
/>
                    <FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Role</FormLabel>

      <Select
        onValueChange={field.onChange}
        defaultValue={field.value}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          <SelectItem value="BUYER">Buyer</SelectItem>
          <SelectItem value="SELLER">Seller</SelectItem>
        </SelectContent>
      </Select>

      <FormMessage />
    </FormItem>
  )}
/>                  
                   <Button
  type="button"
  onClick={geoLocation}
  disabled={
    loadingLocation ||
    location.latitude !== null
  }
>
  {loadingLocation ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Fetching Location...
    </>
  ) : location.latitude ? (
    "✓ Location Enabled"
  ) : (
    "Enable Location"
  )}
</Button>
                    <Button className='w-full' type="submit" disabled={isSubmitting}
                    >{isSubmitting ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Please wait
                                    </>
                                  ) : (
                                    'Sign up'
                                  )}</Button>
                </form>
            </Form>
           
           
            
        </div>

        
    </div>
    );


} 