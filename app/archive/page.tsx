import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ExpenseForm() {
  return (
    <main className="px-4 w-screen min-h-screen flex flex-col items-center bg-gray-100">
      <Card className="w-full max-w-xl mt-16 md:mt-48">
        <CardHeader>
          <CardTitle className="text-2xl">Expense Tracker</CardTitle>
          <CardDescription>
            {/* Enter your email below to login to your account. */}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Date Transaction</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Input id="date" type="date" className="md:col-span-2" readOnly value={'2024-02-02'} />
              <Input id="date" type="time" className="text-right" readOnly value={'19:19'} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Short Description</Label>
            <Textarea placeholder="Type your message here." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="text" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Submit</Button>
        </CardFooter>
      </Card>
    </main>
  )
}
