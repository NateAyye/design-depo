import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "../components/auth/login-form"
import SignUpForm from "../components/auth/signup-form"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs"
import AuthService from '../lib/auth'

function Auth() {
  const navigate = useNavigate()

  if (AuthService.loggedIn()) {
    navigate('/', { replace: true })
  }
  useEffect(() => {
  })

  return (
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