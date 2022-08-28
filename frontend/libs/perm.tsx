export function getPerm(grad){
    switch(grad){
        case "NEAPROBAT":
          return 0;
        case "VOLUNTAR":
          return 10;
        case "SPONSOR":
          return 20;
        case "MEMBRU":
          return 30;
        case "PARTENER":
          return 30;
        case "MENTOR":
          return 40;
        case "BOARD":
          return 50;
        case "TEAM_LEADER":
          return 60;
        case "MINA":
          return 100;
      }
}