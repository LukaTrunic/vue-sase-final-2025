import { AuthService } from "@/services/auth.service";
import { useRouter } from "vue-router";

export function useLogout() {
  const logout = (e: any) => {
    alert(e.message)
    const router = useRouter()
    AuthService.removeAuth()
    router.push("login")
  };

  return logout
}
