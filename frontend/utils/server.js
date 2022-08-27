export async function serv(url, o){
    ///api/membri/profil_api
    const raspuns = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(o),
    });


    return await raspuns.json()
}