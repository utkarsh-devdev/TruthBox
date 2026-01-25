// [] used in folder name as it is catching dynamic username
'use client';
import { verifySchema } from '@/schemas/verifySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import React, { use } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel,FormDescription,FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import * as z from 'zod';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const VerifyAccount = () => {
    const router = useRouter();
    const params = useParams<{ username: string }>();
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema)
    })
    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response = await axios.post('/api/verify-code', {
                username: params.username,
                code: data.code
            })
            toast.success(response.data.message);
            router.replace('sign-in')
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            let erorMessage = axiosError.response?.data.message || 'An error occurred during sign up.';
            toast.error(erorMessage);

        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md"> 
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Verify Your Account</h1>
                    <p className="mb-4">Enter the verification code sent to your email.</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6">
                         <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Verification Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                     </form>
                </Form>
            </div>
        </div>

    )
}

export default VerifyAccount;
