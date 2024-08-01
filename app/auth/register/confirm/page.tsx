

export default function IncomePage() {
    return (
        <main>
            <div className="mx-auto p-10 border rounded mt-10 max-w-3xl text-center space-y-2 flex flex-col">
                <p>Please confirm your email address after you have successfully registered.</p>
                <a href="/auth/login" className="underline text-blue-500">Login Now</a>
            </div>
        </main>
    )
}