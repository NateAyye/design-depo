import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import styled from "styled-components"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { DASHBOARD_TABS } from "../config/constants"
import authService from "../lib/auth"
import { QUERY_USERS_ITEMS } from "../lib/queries"
import { cn } from "../lib/utils"

function ProfilePage() {
  const [user, setUser] = useState({})
  const [items, setItems] = useState([])
  const { loading, error, data } = useQuery(QUERY_USERS_ITEMS, {
    variables: { userId: authService.getProfile().data._id }
  })

  useEffect(() => {
    setItems(data?.GetUserItems)
    setUser(authService.getProfile().data)
  }, [data?.GetUserItems])

  if (error) return <p>Error :(</p>;
  return authService.isTokenExpired(authService.getToken()) || !authService.loggedIn() ? (
    <Navigate to="/" replace />
  ) : (
    <main className="container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ProfileContainer>
            <AvatarContainer>
              <Avatar className={cn('ring-0 w-20 h-20 text-4xl ring-white hover:ring-2 border-none transition-all duration-150 ')}>
                <AvatarImage src="" />
                <AvatarFallback>{authService.getProfile().data.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
              </div>
            </AvatarContainer>
            <ItemsDisplayContainer>
              {DASHBOARD_TABS.map((tab, index) => (
                <div key={tab.name} className="flex">
                  {tab.icon}: {items?.[tab.name]?.length ? items?.[tab.name].length + 1 : 0}
                </div>
              ))}
            </ItemsDisplayContainer>
          </ProfileContainer>
        </>
      )}
    </main>
  )
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  margin: 1rem 0;
  padding: 1.5rem 1rem;
  border: 1px solid hsl(var(--muted-foreground));
  border-radius: 0.5rem;
`
const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const ItemsDisplayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  align-self: stretch;
`

export default ProfilePage