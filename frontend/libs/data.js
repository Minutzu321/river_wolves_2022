const zile = ['Duminica','Luni','Marti','Miercuri','Joi','Vineri','Sambata'];
const luni = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'];

export const saptziluna = (azi) => {
    let zisapt = zile[ azi.getDay() ];
    let luna = luni[ azi.getMonth() ];

    return zisapt+", "+azi.getDate()+" "+luna
}

export const zilunaan = (azi) => {
    let luna = luni[ azi.getMonth() ];

    return azi.getDate()+" "+luna+" "+azi.getFullYear()
}

export const addOre = (numOfHours, date = new Date()) => {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  
    return date;
}

export const addZile = (numOfDays, date = new Date()) => {
    date.setTime(date.getTime() + numOfDays * 24 * 60 * 60 * 1000);
  
    return date;
}