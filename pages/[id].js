function short({url}) {

    if (typeof window != "undefined") {
        window.location.href = url;
    }

    return (
        <>
            Redirecting...
        </>
    )
}

export async function getStaticPaths() {
    return {paths: [], fallback: true}
}

export async function getStaticProps({ params }) {

    var url;
    const { host, user, database, password } =  require("../components/env");
    const mysql = require('mysql');
    const db = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });

    function callback(error, results, fields) {
        //db.release();

        if (error) throw error;

        url = results[0].url;
        console.log(results[0].url);
    }
    
    db.query(`SELECT * FROM urls WHERE short = '${params.id}' LIMIT 1`, (error, results, fields) => {
        callback(error, results, fields);
    })

    console.log("final: "+url);

    return { props: { url: url } }

}

export default short;