import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


export default function Main() {
    return (
      <main>
        <Header />
        <MainMenu />
      </main>
    )
  }
  
  function Header() {
    return (
        <div className="border-b py-4 mx-auto">
            <div className="max-w-5xl mx-auto px-6 md:px-0 flex justify-between items-center">
                <div className="border rounded p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </div>

                <div className="border rounded p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

function MainMenu() {
    return (
        <div className="py-4 mx-auto">
            <div className="max-w-5xl mx-auto px-6 md:px-0 grid gap-4">
                <div className="border rounded p-4 grid gap-4">

                    <div className="grid gap-2">
                        <Label htmlFor="amount">Amount</Label>
                        <div className="grid gap-2">
                            <Input id="amount" type="text" />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <div className="grid gap-2">
                            <Input id="category" type="text" />
                        </div>
                    </div>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="description">Short Description</Label>
                        <Textarea placeholder="Type your message here." />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="date">Date Transaction</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <Input id="date" type="date" className="md:col-span-2" readOnly value={'2024-02-02'} />
                            <Input id="date" type="time" className="text-right" readOnly value={'19:19'} />
                        </div>
                    </div>
                    <Button className="w-full">Submit</Button>
                </div>

            </div>
        </div>
    )
}