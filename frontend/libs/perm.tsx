import { ALUMNI_PERM, BOARD_PERM, MEMBRU_PERM, MENTOR_PERM, PARTENER_PERM, SPONSOR_PERM, TEAM_LEADER_PERM, VOLUNTAR_PERM } from "./config";

export function getPerm(grad, incredere){
    incredere = Math.min(incredere, 9)
    switch(grad){
        case "VOLUNTAR":
          return VOLUNTAR_PERM+incredere;
        case "SPONSOR":
          return SPONSOR_PERM+incredere;
        case "MEMBRU":
          return MEMBRU_PERM+incredere;
        case "PARTENER":
          return PARTENER_PERM+incredere;
        case "ALUMNI":
          return ALUMNI_PERM+incredere;
        case "MENTOR":
          return MENTOR_PERM+incredere;
        case "BOARD":
          return BOARD_PERM+incredere;
        case "TEAM_LEADER":
          return TEAM_LEADER_PERM+incredere;
        case "MINA":
          return 1000;
        default:
          return 0;
      }
}