import { hosturl } from '../components/env';

function short({data}) {

    if (typeof window != "undefined") {
        while(true) {
            if (typeof data != "undefined") window.location.href = data.url;
            break;
        }
    }

    return (
        <>
            Redirecting...If you don't get redirected <a href={data?.url}>Click here</a>
        </>
    )
}

export async function getStaticPaths() {
    return {paths: [], fallback: true}
}

export async function getStaticProps({ params }) {
    
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
            props: { 
                data,
            } 
        }
    }

}

export default short;