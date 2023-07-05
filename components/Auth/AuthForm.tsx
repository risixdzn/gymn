import { type AuthState } from "./AuthCard"
import { Dispatch, SetStateAction} from "react"

interface AuthForm {
    authState: AuthState
    setAuthState: Dispatch<SetStateAction<AuthState>>
}

export default function AuthForm({authState, setAuthState}: AuthForm){
    return(
        <span>AuthForm</span>
    )
}