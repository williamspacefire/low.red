import { hosturl } from '../components/env';
import Head from 'next/head';

function short({ data }) {
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
    const url = data.error && data.code == 404 ? "/" : data.url;

    return { 
        redirect: {
            destination: url,
            permanent: url == "/" ? false : true
        },
        props: {
            data,
        }
    }

}

export default short;