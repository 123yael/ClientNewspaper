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
import { getCustomerByEmailAndPass } from '../Axios/customerAxios';
import { MANAGER_PASSWODR, MANAGER_EMAIL } from '../config'

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

// קומפוננטה זו לא בשימוש כרגע
export const LogIn = () => {

    // פונקציה להתחברות למערכת
    const connect = (event) => {
        event.preventDefault()
        let e = event.target.email.value
        let p = event.target.password.value
        if (e === MANAGER_EMAIL && p === MANAGER_PASSWODR) {
            console.log("manager!!!");
            return
        }
        getCustomerByEmailAndPass(e, p).then(res => {
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
