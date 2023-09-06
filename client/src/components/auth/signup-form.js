import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import Auth from '../../lib/auth';
import { CREATE_USER } from '../../lib/mutations';
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

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  password: z
    .string()
    .min(2, {
      message: 'Password must be at least 2 characters.',
    })
    .max(50, { message: 'Password must be less than 50 characters.' }),
});

const SignUpForm = () => {
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      // const res = await api.post('/signup', data);
      const mutationResponse = await createUser({
        variables: {
          email: data.email,
          name: data.name,
          password: data.password,
        },
      });
      console.log(mutationResponse.data);
      const token = mutationResponse.data.createUser.token;
      Auth.login(token);
      navigate(-1);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || 'Something went wrong.');
      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="joeMan@example.com" {...field} />
              </FormControl>
              <FormDescription>This is your public email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="janeSmith" {...field} />
              </FormControl>
              <FormDescription>
                Your public display name. (min 2 characters) (max 50 characters)
              </FormDescription>
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
              <FormDescription>
                Password for your account. (min 2 characters)
              </FormDescription>
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

export default SignUpForm;
