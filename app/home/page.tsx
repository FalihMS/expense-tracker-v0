import { createClient } from "@/utils/supabase/server";
import Header from "./component/header";
import { SelectForm } from "./component/select-form";
import { redirect } from "next/navigation";

export default async function Notes() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if(user == null){
    redirect('/auth/login')
  }

  return (
    <main>
      <Header name={user.user_metadata.display_name} />
      <SelectForm />
      <pre>
        {/* {JSON.stringify(, null, 2)} */}
      </pre>
    </main>
  )
}
