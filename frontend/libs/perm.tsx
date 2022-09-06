export function getPerm(grad, incredere){
    incredere = Math.min(incredere, 9)
    switch(grad){
        case "VOLUNTAR":
          return 10+incredere;
        case "SPONSOR":
          return 20+incredere;
        case "MEMBRU":
          return 30+incredere;
        case "PARTENER":
          return 30+incredere;
        case "ALUMNI":
          return 30+incredere;
        case "MENTOR":
          return 40+incredere;
        case "BOARD":
          return 50+incredere;
        case "TEAM_LEADER":
          return 60+incredere;
        case "MINA":
          return 100;
        default:
          return 0;
      }
}