import { toggleNumberFormat } from "@/app/form/components/util"

const BASEROW_AUTH = String(process.env.BASEROW_AUTH)

export async function POST(request: Request) {
    const req = await request.json()
    const saveData = await fetch('https://api.baserow.io/api/database/rows/table/329805/?user_field_names=true', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': BASEROW_AUTH
        },
        body: JSON.stringify({
            Type: await req.type,
            Description: await req.description,
            Amount: toggleNumberFormat(await req.amount + ''),
            Date: new Date(await req.date + ' ' + await req.time).toISOString(),
            Account: await req.account,
            Category: await req.category,
        }),
    })
        .then(res => {
            if (res.ok) {
                return true
            } else {
                return false
            }
        })
        .catch(err => (console.log(err)))

    if (!saveData) {
        return Response.json({ status: "error", message: "Error Occured" })

    }
    return Response.json({ status: "success", message: "Transaction Saved" })
}