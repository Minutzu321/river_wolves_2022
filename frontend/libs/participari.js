export const getParticipanti = (participari) =>{
    let partici = [];
    participari.forEach((p)=>{
        if(!p.anulat){
            partici.push(p.user.nume);
        }
    })
    return partici;
}

export const getPrezenti = (participari) =>{
    let prez = [];
    participari.forEach((p)=>{
        if(p.prezent){
            prez.push(p.user.nume);
        }
    })
    return prez;
}

export const participa = (nume, participari) =>{
    let partici = getParticipanti(participari);
    return partici.includes(nume);
}

export const prezent = (nume, participari) =>{
    let prezi = getPrezenti(participari);
    return prezi.includes(nume);
}