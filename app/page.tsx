import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function SinglePage(){
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
  
    if(user !== null){
      redirect('/home')
    }

    redirect('/auth/login')
}
