import { hosturl } from '../components/env';
import Head from 'next/head';
import { age_if_url_found, age_if_url_not_found } from '../components/constants';

function short({ data }) {
    return (
        <>
            <Head>
                <meta httpEquiv="refresh" content={"0; url="+data?.url}/>
                <title>Redirecting...</title>
            </Head>
            Redirecting...<a href={data?.url}>Click here</a>
        </>
    )
}

export async function getServerSideProps({ params, res }) {
    
    const api = await fetch(`${hosturl}/api/v1/short/id/${params.id}`);
    const data = await api.json();

    if (data.error && data.code === 404) {
        url = "/"
        res.setHeader(`Cache-Control', 's-maxage=${age_if_url_not_found}, stale-while-revalidate`)
    } else {
        url = data.url
        res.setHeader(`Cache-Control', 's-maxage=${age_if_url_found}, stale-while-revalidate`)
    }

    return { 
        redirect: {
            destination: url,
            permanent: url !== "/"
        },
        props: {
            data,
        }
    }

}

export default short;