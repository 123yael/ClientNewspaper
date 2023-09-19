
import { ListItem, Stack } from '@mui/material'
import './about.css'

export const About = () => {
    return (
        <div className='py-5 container'>
            <div className='mt-5'>
                <Stack spacing={2} style={{ textAlign: "left", fontSize: "20px" }}>
                    <h2>It all started with...</h2>
                    <p>2021</p>
                    <ListItem className='shadow p-4'>In young girls who study short and important courses on
                        various topics in programming, each course and its nuances, challenging experiential
                        learning but as always from the beginning with good results above all expectations.</ListItem>
                    <p>2022</p>
                    <ListItem className='shadow p-4'>A year passes really quickly and now the courses are already more
                        complex, much more challenging but also more fun, and the idea of the website that stands in front
                        of you is already starting to be born, new buds of a beginning are already really forming, and maybe,
                        who knows, there is hope that in the end we will succeed in a big way (there are a lot of deadlines)</ListItem>
                    <p>2023</p>
                    <ListItem className='shadow p-4'>And now it's hard for us to believe that after a lot of work and labor,
                        the product is brought before you and you will be the ones to decide whether we succeeded or not?</ListItem>
                </Stack>
            </div>
        </div>
    )
}