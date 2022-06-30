export const banner = [
    '<span class="index">River Wolves (RW) Not A Corporation. All wolves reserved.</span>',
    '                               .7#P     ',
    '                             :J#RW&G:   ',
    '                           ^5&G!  ^##~  ',
    '                    !5J?77G#5^     ~@G  ',
    '                  ~G&J7?J5J:      ~&B~  ',
    '                :P&5:            !&G^#5 ',
    '              :Y&P^            ?#@@: J@P',
    '         :!MINA~   .:         !MIN ^##~',
    '    .~?5INAM!:     MINA            ^&#: ',
    ' ~YB&#Y!:         .!PG@5^         ~@B:  ',
    ' .~?MINA!:     .!P#~  ^&@G7.     !@G.   ',
    '     .^?5GB57!PB@@~   :&B?BBJ.  ~@G     ',
    '         5@55G?:B&.   7@J  B@^  J@!     ',
    '       :G&!    .@G    P@^ .&B   P@^     ',
    '      !&@#^    5@&7  .&#  ~@Y   #&.     ',
    '     J@5^P@J  .5##?  !@Y  J@!  :@G      ',
    '   .P@?   ?@5    .^MINA^  G@:  ~@Y      ',
    '  ^##~    7@?   !#BY!:   .&G   ?@!      ',
    'JG@#.    ?&@J  J&@?     :P@B: !#@Y      ',
    'G@@Y     P@@5 .G@@Y     ~&@&~ Y@@G.     ',
    "<span class=\"color2\">For a list of available commands, type</span> <span class=\"comanda\">'help'</span><span class=\"color2\">.</span>",
  ];

  const lista = [
    "Initiating protocol 'RiverWolvesMember'",
    "Initiating protocol 'Carti'",
    "Initiating protocol 'BigWolf'",
    "Initiating protocol 'Mina'",
    "Initiating protocol 'Blackgate'",
    "Initiating protocol '3rd doctor'",
    "Initiating protocol 'Watchful EYE'",
    "Initiating protocol 'TIME'",
    "Initiating protocol 'SPACE'",
    "Initiating protocol 'Gâlea'",
    "Initiating protocol 'Minerva'",
    "Initiating protocol 'Bob'",
    "Initiating protocol 'TreasureHunt'",
    "Initiating protocol 'STEM'",
    "Connecting to server..",
    "Sending propaganda..",
  ]

  export function randomProtocols(n){
    const shuffled = lista.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }