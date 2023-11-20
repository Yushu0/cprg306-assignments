"use client";

import { useUserAuth } from "./_utils/auth-context";


export default function Page() {

    const {user, gitHubSignIn, firebaseSignOut} = useUserAuth();


    async function handleSignIn() {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSignOut() {
        try {
            await firebaseSignOut();
        } catch (error) {
            console.log(error);
        }
    }

    console.log(user);

    return(
        <main>
            <header>
                <h1>Login Page</h1>
            </header>
            <section>
                { user ? (
                    <div>
                        <p>Welcome, {user.email}</p>
                        <button className="text-lg m-2 hover:underline" onClick={handleSignOut}>
                            sign out
                        </button>
                    </div>
                ) : (
                    <div>
                        <button className="text-lg m-2 hover:underline" onClick={handleSignIn}>
                            sign in
                        </button>
                    </div>
                ) }
            </section>
        </main>
    )
}