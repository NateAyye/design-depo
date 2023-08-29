import { Navigate } from "react-router-dom"
import LoginForm from "../components/auth/login-form"
import SignUpForm from "../components/auth/signup-form"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import authService from "../lib/auth"

function Auth() {

  return authService.loggedIn() ? (
    <Navigate to="/" replace />
  ) : (
    <div className="container min-h-[90vh] flex justify-center items-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Auth