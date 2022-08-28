export function badgeLabel(label) {
    label[0].toUpperCase()
    return label;
}

export function badgeColor(label) {
    switch(label){
        case "NEREPARTIZAT":
          return "secondary";
        case "MECANICA":
          return "info";
        case "PROGRAMARE":
          return "success";
        case "DESIGN":
          return "error";
        case "MEDIA":
          return "warning";
      }
}

export function badgeImg(label) {
    switch(label){
        case "NEREPARTIZAT":
          return "/planetute/rw-unk.png";
        case "MECANICA":
          return "/planetute/mecanica.png";
        case "PROGRAMARE":
          return "/planetute/programare.png";
        case "DESIGN":
          return "/planetute/design.png";
        case "MEDIA":
          return "/planetute/media.png";
      }
}