export function badgeLabel(label) {
    label[0].toUpperCase()
    return label;
}

export function badgeColor(label) {
    switch(label){
        case "MECANICA":
          return "info";
        case "PROGRAMARE":
          return "success";
        case "DESIGN":
          return "error";
        case "MEDIA":
          return "warning";
        default:
          return "secondary"
      }
}

export function badgeImg(label) {
    switch(label){
        case "MECANICA":
          return "/planetute/mecanica.png";
        case "PROGRAMARE":
          return "/planetute/programare.png";
        case "DESIGN":
          return "/planetute/design.png";
        case "MEDIA":
          return "/planetute/media.png";
        default:
          return "/planetute/rw-unk.png";
      }
}