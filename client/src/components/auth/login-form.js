import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import Auth from '../../lib/auth';
import { LOGIN_USER } from '../../lib/mutations';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';


const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(2, {
      message: 'Password must be at least 2 characters.',
    })
    .max(50, { message: 'Password must be less than 50 characters.' }),
});

const LoginForm = () => {
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_USER);

  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // const res = await api.post('/login', data);
      const mutationResponse = await login({
        variables: {
          email: data.email,
          password: data.password,
        }
      })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      navigate('/')
    } catch (error) {
      setError(error?.response?.data?.message || 'Something went wrong.');
      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  };

  const onError = async (data) => {
    toast({
      title: 'Error',
      description: 'Could Not Login Please Check All form Fields.',
      variant: 'destructive'
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="joeMan@example.com" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Sign Up
        </Button>
      </form>
      {error && (
        <div className="bg-red-500 mt-2 text-white w-fit text-sm py-1 px-3 rounded">
          {error}
        </div>
      )}
    </Form>
  );
};

export default LoginForm;
