import { hosturl } from '../components/env';
import Head from 'next/head';

function short({data}) {
    return (
        <>
            <Head>
                <meta httpEquiv="refresh" content={"0; url="+data?.url}/>
            </Head>
            Redirecting...<a href={data?.url}>Click here</a>
        </>
    )
}

export async function getServerSideProps({ params }) {
    
    const api = await fetch(`${hosturl}/api/v1/short/id/${params.id}`);
    const data = await api.json();

    if (data.error && data.code == 404) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            },
        }
    } else {
        return { 
            redirect: {
                destination: data.url,
                permanent: true
            }
        }
    }

}

export default short;