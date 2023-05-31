import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useEffect } from 'react';
import { useState } from 'react';
import { isCustomerExists } from '../Axios/customerAxios';

// הכפתור שהופך בין בהיר לכהה
const ModeToggle = () => {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);

    // necessary for server-side rendering
    // because mode is undefined on the server
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }

    return (
        <Button
            variant="outlined"
            onClick={() => {
                setMode(mode === 'light' ? 'dark' : 'light');
            }}
        >
            {mode === 'light' ? 'Turn dark' : 'Turn light'}
        </Button>
    );
}

export const LogIn = () => {

    // פונקציה להתחברות למערכת
    const connect = (event) => {
        debugger
        event.preventDefault()
        let e = event.target.email.value
        let p = event.target.password.value
        if (e === "m@gmail.com" && p === "1234") {
            console.log("manager!!!");
            return
        }
        isCustomerExists(e, p).then(res => {
            debugger
            if (res.data === true)
                console.log("true");
            else
                console.log("false");
        })
    }

    return (
        <CssVarsProvider>
            <main className='mt-5'>
                <ModeToggle />
                <Sheet
                    sx={{
                        width: 300, mx: 'auto', my: 4, py: 3, px: 2, display: 'flex',
                        flexDirection: 'column', gap: 2, borderRadius: 'sm', boxShadow: 'md'
                    }}
                    variant="outlined"
                >
                    <div>
                        <Typography level="h4" component="h1">
                            <b>Welcome!</b>
                        </Typography>
                        <Typography level="body2">Sign in to continue.</Typography>
                    </div>
                    <form onSubmit={() => connect(window.event)}>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input name="email" type="email" placeholder="johndoe@email.com" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input name="password" type="password" placeholder="password" />
                        </FormControl>

                        <Button sx={{ mt: 1 }} type='submit' fullWidth>Log in</Button>
                    </form>

                    <Typography
                        endDecorator={<Link href="/sign-up">Sign up</Link>}
                        fontSize="sm"
                        sx={{ alignSelf: 'center' }}
                    >
                        Don&apos;t have an account?
                    </Typography>
                </Sheet>
            </main>
        </CssVarsProvider>
    );
}
