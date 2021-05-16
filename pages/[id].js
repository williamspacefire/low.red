import { hosturl } from '../components/env'
import Head from 'next/head'

function short({ data }) {
    return (
        <>
            <Head>
                <meta httpEquiv='refresh' content={'0; url=' + data?.url} />
                <title>Redirecting...</title>
            </Head>
            Redirecting...<a href={data?.url}>Click here</a>
        </>
    )
}

export async function getServerSideProps({ params, res }) {
    res.setHeader('Cache-Control', 's-maxage=15778800, stale-while-revalidate')

    const api = await fetch(`${hosturl}/api/v1/short/id/${params.id}`)
    const data = await api.json()
    const url = data.error && data.code === 404 ? '/' : data.url

    return {
        redirect: {
            destination: url,
            permanent: url !== '/',
        },
        props: {
            data,
        },
    }
}

export default short
