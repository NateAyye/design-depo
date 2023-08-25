import LoginForm from "./login-form"
import SignUpForm from "./signup-form"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs"

export function AuthForm() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <LoginForm />
      </TabsContent>
      <TabsContent value="login">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  )
}
