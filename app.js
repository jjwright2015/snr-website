/* ============================================
   Saturday Night Racing Cup Series - App JS
   ============================================ */

// --- Data ---
const standingsData = [
  {pos:1,driver:"Jeff J. Wright",points:170,wins:2,top5:3,top10:3,starts:4},
  {pos:2,driver:"Seth Hatchel",points:147,wins:0,top5:1,top10:4,starts:4},
  {pos:3,driver:"Kenny Kibbey",points:141,wins:0,top5:1,top10:2,starts:4},
  {pos:4,driver:"Bailey Turner",points:140,wins:1,top5:2,top10:2,starts:4},
  {pos:5,driver:"Caleb Weekley",points:139,wins:0,top5:1,top10:3,starts:4},
  {pos:6,driver:"Justin Richie",points:134,wins:0,top5:0,top10:4,starts:4},
  {pos:7,driver:"A.J. Stravato",points:134,wins:0,top5:2,top10:3,starts:4},
  {pos:8,driver:"Adam Cabot",points:119,wins:0,top5:2,top10:3,starts:3},
  {pos:9,driver:"Elliott Butler",points:113,wins:0,top5:0,top10:1,starts:4},
  {pos:10,driver:"Noah Michalski",points:110,wins:0,top5:0,top10:1,starts:4},
  {pos:11,driver:"Angelo Hronis",points:109,wins:0,top5:1,top10:2,starts:4},
  {pos:12,driver:"J R Shepherd",points:109,wins:0,top5:1,top10:1,starts:4},
  {pos:13,driver:"Casey Lakatos",points:103,wins:0,top5:0,top10:0,starts:4},
  {pos:14,driver:"Phillip Brewer",points:101,wins:0,top5:0,top10:0,starts:4},
  {pos:15,driver:"Christopher Hodges",points:99,wins:0,top5:1,top10:1,starts:4},
  {pos:16,driver:"Joshua Banks",points:97,wins:0,top5:1,top10:1,starts:4},
  {pos:17,driver:"Enathian Ferrada",points:91,wins:0,top5:0,top10:1,starts:4},
  {pos:18,driver:"Andy Telgenhof",points:89,wins:1,top5:1,top10:2,starts:2,suspended:true},
  {pos:19,driver:"Chuck Sweeting",points:86,wins:0,top5:0,top10:0,starts:4},
  {pos:20,driver:"Dakota Floyd",points:85,wins:0,top5:0,top10:0,starts:4},
  {pos:21,driver:"Bryce Shoemaker",points:79,wins:0,top5:0,top10:0,starts:3},
  {pos:22,driver:"Max Kost",points:78,wins:0,top5:0,top10:0,starts:4},
  {pos:23,driver:"Ben Laughter",points:76,wins:0,top5:0,top10:0,starts:4},
  {pos:24,driver:"Brandon Wallace",points:75,wins:0,top5:0,top10:1,starts:4},
  {pos:25,driver:"Matt Shinoski",points:73,wins:0,top5:0,top10:0,starts:3},
  {pos:26,driver:"Keith Shoemaker",points:69,wins:0,top5:0,top10:0,starts:3},
  {pos:27,driver:"Mikal Jones",points:65,wins:0,top5:1,top10:1,starts:4},
  {pos:28,driver:"Reggie Ortega",points:65,wins:0,top5:0,top10:1,starts:3},
  {pos:29,driver:"Brian Chambliss",points:61,wins:0,top5:0,top10:0,starts:3},
  {pos:30,driver:"Austin Boelke",points:60,wins:0,top5:0,top10:0,starts:4},
  {pos:31,driver:"Broderick Vaclavik",points:60,wins:0,top5:0,top10:0,starts:4},
  {pos:32,driver:"Tim Shinoski",points:59,wins:0,top5:0,top10:0,starts:4},
  {pos:33,driver:"Bryan Dehn",points:58,wins:0,top5:0,top10:0,starts:3},
  {pos:34,driver:"Ryan Carwile",points:57,wins:0,top5:0,top10:1,starts:3},
  {pos:35,driver:"Rob Hamp",points:56,wins:0,top5:1,top10:1,starts:3},
  {pos:36,driver:"Justin Michael",points:48,wins:0,top5:0,top10:0,starts:3},
  {pos:37,driver:"Stefan Davis",points:45,wins:0,top5:0,top10:0,starts:3},
  {pos:38,driver:"Rhea Massey",points:38,wins:0,top5:0,top10:0,starts:4},
  {pos:39,driver:"Justin Carey",points:33,wins:0,top5:0,top10:0,starts:2},
  {pos:40,driver:"Eldon Stewart",points:32,wins:0,top5:0,top10:0,starts:4},
  {pos:41,driver:"Derek Garrison",points:25,wins:0,top5:0,top10:0,starts:1},
  {pos:42,driver:"James Lehman",points:22,wins:0,top5:0,top10:0,starts:4},
  {pos:43,driver:"Mark McFadyen",points:22,wins:0,top5:0,top10:0,starts:2},
  {pos:44,driver:"Chad Clinger",points:15,wins:0,top5:0,top10:0,starts:3},
  {pos:45,driver:"John Seniw",points:10,wins:0,top5:0,top10:0,starts:3},
  {pos:46,driver:"Logan Watern",points:4,wins:0,top5:0,top10:0,starts:1}
];

const scheduleData = [
  {num:1,track:"Daytona",date:"Feb 21",completed:true,winner:"Andy Telgenhof"},
  {num:2,track:"Auto Club",date:"Feb 28",completed:true,winner:"Bailey Turner"},
  {num:3,track:"Phoenix",date:"Mar 7",completed:true,winner:"Jeff J. Wright"},
  {num:4,track:"Las Vegas",date:"Mar 14",completed:true,winner:"Jeff J. Wright"},
  {num:5,track:"Darlington",date:"Mar 21",next:true},
  {num:6,track:"Martinsville",date:"Mar 28"},
  {num:7,track:"Iowa Speedway",date:"Apr 11"},
  {num:8,track:"Rockingham",date:"Apr 18"},
  {num:9,track:"Atlanta",date:"Apr 25"},
  {num:10,track:"Texas",date:"May 2"},
  {num:11,track:"Dover",date:"May 16"},
  {num:12,track:"Charlotte",date:"May 23"},
  {num:13,track:"Nashville",date:"May 30"},
  {num:14,track:"Atlanta 2008",date:"Jun 6"},
  {num:15,track:"Sonoma",date:"Jun 13"},
  {num:16,track:"Richmond",date:"Jun 20"},
  {num:17,track:"Chicagoland",date:"Jun 27"},
  {num:18,track:"Talladega",date:"Jul 11",chase:true,label:"CHASE BEGINS"},
  {num:19,track:"Homestead",date:"Jul 18",chase:true},
  {num:20,track:"Michigan",date:"Jul 25",chase:true},
  {num:21,track:"Bristol",date:"Aug 1",chase:true},
  {num:22,track:"Kansas",date:"Aug 8",championship:true,label:"CHAMPIONSHIP"}
];

const historicalData = {"season1":[{"pos":1,"driver":"Jeff J. Wright","points":2270,"wins":6,"top5":15,"top10":18,"starts":18},{"pos":2,"driver":"Joseph McWhorter","points":2230,"wins":2,"top5":8,"top10":11,"starts":18},{"pos":3,"driver":"Michael Sturgill","points":2224,"wins":1,"top5":8,"top10":11,"starts":16},{"pos":4,"driver":"Max Kost","points":2188,"wins":0,"top5":0,"top10":3,"starts":20},{"pos":5,"driver":"Alex W Bell","points":2174,"wins":0,"top5":3,"top10":14,"starts":17},{"pos":6,"driver":"Chad Clinger","points":2162,"wins":1,"top5":8,"top10":11,"starts":19},{"pos":7,"driver":"Caleb Weekley","points":2154,"wins":0,"top5":0,"top10":3,"starts":17},{"pos":8,"driver":"A.J. Stravato","points":2142,"wins":2,"top5":8,"top10":13,"starts":16},{"pos":9,"driver":"Rhea Massey","points":2140,"wins":1,"top5":2,"top10":9,"starts":17},{"pos":10,"driver":"Ryan Carwile","points":2128,"wins":0,"top5":7,"top10":9,"starts":14},{"pos":11,"driver":"Mark McFadyen","points":2105,"wins":0,"top5":0,"top10":0,"starts":18},{"pos":12,"driver":"Taylor Butcher-Benjamin","points":2000,"wins":0,"top5":0,"top10":5,"starts":10},{"pos":13,"driver":"Joshua Banks","points":518,"wins":1,"top5":8,"top10":9,"starts":14},{"pos":14,"driver":"Chuck Sweeting","points":470,"wins":0,"top5":3,"top10":7,"starts":16},{"pos":15,"driver":"Brandon Wallace","points":411,"wins":0,"top5":0,"top10":1,"starts":14},{"pos":16,"driver":"Bailey Turner","points":389,"wins":2,"top5":5,"top10":8,"starts":10},{"pos":17,"driver":"Eddy Trejo","points":371,"wins":0,"top5":0,"top10":3,"starts":12},{"pos":18,"driver":"Jonathan Cofield","points":367,"wins":0,"top5":0,"top10":6,"starts":12},{"pos":19,"driver":"Mark Whitley","points":362,"wins":0,"top5":6,"top10":7,"starts":10},{"pos":20,"driver":"Eric Hutton","points":360,"wins":1,"top5":3,"top10":5,"starts":11},{"pos":21,"driver":"Michael Kostek","points":303,"wins":0,"top5":0,"top10":6,"starts":9},{"pos":22,"driver":"Reggie Ortega","points":300,"wins":0,"top5":0,"top10":3,"starts":10},{"pos":23,"driver":"Adam Cabot","points":293,"wins":2,"top5":6,"top10":7,"starts":7},{"pos":24,"driver":"Seth Hatchel","points":277,"wins":1,"top5":4,"top10":7,"starts":7},{"pos":25,"driver":"Steven L McDonald","points":246,"wins":0,"top5":0,"top10":1,"starts":9},{"pos":26,"driver":"Jonathan Smith12","points":242,"wins":0,"top5":1,"top10":1,"starts":8},{"pos":27,"driver":"Clifton Cockrell","points":233,"wins":0,"top5":2,"top10":2,"starts":9},{"pos":28,"driver":"Angelo Hronis","points":213,"wins":0,"top5":0,"top10":4,"starts":6},{"pos":29,"driver":"James Loveland","points":161,"wins":0,"top5":0,"top10":1,"starts":6},{"pos":30,"driver":"Daniel D Cunningham","points":157,"wins":0,"top5":0,"top10":1,"starts":5},{"pos":31,"driver":"Tim Downey","points":148,"wins":0,"top5":0,"top10":0,"starts":6},{"pos":32,"driver":"Austin Boelke","points":145,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":33,"driver":"Noah Michalski","points":129,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":34,"driver":"P.J. O'Leary","points":122,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":35,"driver":"Andy Kurtz","points":117,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":36,"driver":"Johnathon Caddell","points":116,"wins":0,"top5":1,"top10":3,"starts":3},{"pos":37,"driver":"Lucas Lyons","points":103,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":38,"driver":"Eddie A. Smith","points":97,"wins":0,"top5":1,"top10":2,"starts":3},{"pos":39,"driver":"Bryce Shoemaker","points":93,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":40,"driver":"Charles Felts","points":89,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":41,"driver":"Casey Lakatos","points":83,"wins":0,"top5":0,"top10":1,"starts":3},{"pos":42,"driver":"Joel Swaim","points":61,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":43,"driver":"Sean Langton","points":60,"wins":0,"top5":1,"top10":1,"starts":2},{"pos":44,"driver":"Jared Swaim","points":58,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":45,"driver":"Nicholas Starling2","points":56,"wins":0,"top5":0,"top10":1,"starts":2},{"pos":46,"driver":"Christopher Reese3","points":55,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":47,"driver":"Travis Bieber","points":54,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":48,"driver":"Kirill Kononovich","points":52,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":49,"driver":"Justin Richie","points":49,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":50,"driver":"Andy Telgenhof","points":47,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":51,"driver":"Levi Allsman","points":46,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":51,"driver":"Gary W Smith","points":46,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":53,"driver":"Brian Hennings","points":43,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":54,"driver":"Adam D Lange","points":38,"wins":0,"top5":0,"top10":1,"starts":1},{"pos":55,"driver":"Hunter C Johnson","points":35,"wins":0,"top5":0,"top10":1,"starts":1},{"pos":56,"driver":"Casey Shoe","points":34,"wins":0,"top5":0,"top10":1,"starts":1},{"pos":57,"driver":"Dustin German","points":27,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":57,"driver":"Bentley Glaser","points":27,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":59,"driver":"Christopher Tate2","points":26,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":60,"driver":"Brett Bieber3","points":23,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":61,"driver":"Aaron Gerwitz","points":14,"wins":0,"top5":0,"top10":0,"starts":1}],"season2":[{"pos":1,"driver":"Joseph McWhorter","points":2248,"wins":3,"top5":9,"top10":17,"starts":20},{"pos":2,"driver":"Jeff J. Wright","points":2231,"wins":5,"top5":14,"top10":14,"starts":18},{"pos":3,"driver":"Alex W Bell","points":2199,"wins":0,"top5":7,"top10":13,"starts":20},{"pos":4,"driver":"Joshua Banks","points":2189,"wins":4,"top5":10,"top10":13,"starts":18},{"pos":5,"driver":"Chuck Sweeting","points":2181,"wins":0,"top5":2,"top10":7,"starts":20},{"pos":6,"driver":"Caleb Weekley","points":2173,"wins":0,"top5":1,"top10":4,"starts":19},{"pos":7,"driver":"Max Kost","points":2165,"wins":0,"top5":0,"top10":1,"starts":20},{"pos":8,"driver":"Bryce Shoemaker","points":2159,"wins":0,"top5":0,"top10":3,"starts":20},{"pos":9,"driver":"Gerry Bergeron","points":2143,"wins":0,"top5":0,"top10":2,"starts":20},{"pos":10,"driver":"Noah Michalski","points":2123,"wins":0,"top5":3,"top10":9,"starts":16},{"pos":11,"driver":"Ryan Carwile","points":2115,"wins":1,"top5":5,"top10":10,"starts":16},{"pos":12,"driver":"Casey Lakatos","points":2102,"wins":0,"top5":0,"top10":4,"starts":16},{"pos":13,"driver":"Bailey Turner","points":584,"wins":1,"top5":10,"top10":12,"starts":15},{"pos":14,"driver":"Rhea Massey","points":492,"wins":1,"top5":4,"top10":9,"starts":16},{"pos":15,"driver":"Chad Clinger","points":477,"wins":1,"top5":5,"top10":7,"starts":16},{"pos":16,"driver":"Angelo Hronis","points":465,"wins":0,"top5":4,"top10":8,"starts":14},{"pos":17,"driver":"Reggie Ortega","points":414,"wins":1,"top5":3,"top10":8,"starts":13},{"pos":18,"driver":"Keith Shoemaker","points":370,"wins":0,"top5":0,"top10":0,"starts":15},{"pos":19,"driver":"Austin Boelke","points":344,"wins":0,"top5":0,"top10":0,"starts":14},{"pos":20,"driver":"A.J. Stravato","points":337,"wins":0,"top5":3,"top10":6,"starts":10},{"pos":21,"driver":"Brandon Wallace","points":309,"wins":0,"top5":0,"top10":1,"starts":13},{"pos":22,"driver":"Bobby Patricca","points":282,"wins":0,"top5":0,"top10":0,"starts":11},{"pos":23,"driver":"Stefan Davis","points":237,"wins":0,"top5":0,"top10":0,"starts":10},{"pos":24,"driver":"Mark McFadyen","points":230,"wins":0,"top5":0,"top10":1,"starts":12},{"pos":25,"driver":"Jonathan Smith12","points":227,"wins":0,"top5":0,"top10":1,"starts":7},{"pos":26,"driver":"Mark Whitley","points":224,"wins":0,"top5":3,"top10":4,"starts":6},{"pos":27,"driver":"Alek Martinez","points":207,"wins":1,"top5":4,"top10":5,"starts":5},{"pos":28,"driver":"Eric Hutton","points":203,"wins":0,"top5":0,"top10":3,"starts":7},{"pos":29,"driver":"Phillip Brewer","points":199,"wins":0,"top5":0,"top10":2,"starts":8},{"pos":30,"driver":"Ben D Bafford","points":188,"wins":1,"top5":3,"top10":4,"starts":5},{"pos":31,"driver":"Jacob Bradley3","points":183,"wins":0,"top5":1,"top10":4,"starts":5},{"pos":32,"driver":"Kyle Peacock","points":179,"wins":0,"top5":0,"top10":0,"starts":8},{"pos":33,"driver":"Michael Sturgill","points":178,"wins":0,"top5":3,"top10":4,"starts":5},{"pos":34,"driver":"Adam Cabot","points":177,"wins":1,"top5":2,"top10":3,"starts":5},{"pos":35,"driver":"Eddy Trejo","points":176,"wins":0,"top5":0,"top10":0,"starts":7},{"pos":36,"driver":"Ryan J Rose","points":166,"wins":0,"top5":0,"top10":4,"starts":5},{"pos":37,"driver":"Brian Chambliss","points":159,"wins":0,"top5":1,"top10":1,"starts":5},{"pos":38,"driver":"Jonny Rapp","points":155,"wins":0,"top5":0,"top10":0,"starts":6},{"pos":39,"driver":"Gavin Pittman","points":144,"wins":0,"top5":0,"top10":1,"starts":6},{"pos":40,"driver":"Dakota Floyd2","points":141,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":40,"driver":"Seth Hatchel","points":141,"wins":0,"top5":2,"top10":3,"starts":4},{"pos":42,"driver":"Brian Hennings","points":125,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":43,"driver":"Michael Kostek","points":113,"wins":0,"top5":0,"top10":2,"starts":4},{"pos":44,"driver":"Julio Villalobos.Jr","points":111,"wins":0,"top5":0,"top10":1,"starts":5},{"pos":45,"driver":"Edwin Mendez","points":108,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":46,"driver":"Lucas Lyons","points":106,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":46,"driver":"Chris Sawyer4","points":106,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":48,"driver":"Derek M Garrison","points":99,"wins":0,"top5":0,"top10":2,"starts":3},{"pos":49,"driver":"Daniel D Cunningham","points":97,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":50,"driver":"Jonathan Cofield","points":92,"wins":0,"top5":1,"top10":2,"starts":3},{"pos":51,"driver":"Clark Genneken","points":85,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":52,"driver":"Dustin German","points":84,"wins":0,"top5":0,"top10":1,"starts":3},{"pos":53,"driver":"Eric Garrison","points":71,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":54,"driver":"Jerry West","points":67,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":55,"driver":"Carson Marenka","points":58,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":56,"driver":"Daryl Young","points":53,"wins":0,"top5":0,"top10":1,"starts":2},{"pos":57,"driver":"Brandon Phetterplace","points":51,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":58,"driver":"Ethan E Collier","points":49,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":59,"driver":"Brandon M Hinton","points":48,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":60,"driver":"Christopher Melton","points":46,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":61,"driver":"Logan Threlkeld","points":41,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":62,"driver":"Mike George3","points":40,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":62,"driver":"Tyler Lehman2","points":40,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":64,"driver":"Lee Daniel Robinson","points":33,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":65,"driver":"Andrew Larner","points":31,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":65,"driver":"Nicholas Starling2","points":31,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":67,"driver":"Roger Pierce","points":30,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":68,"driver":"Rob Denton","points":29,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":68,"driver":"Christopher Shea","points":29,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":70,"driver":"Nick Alford","points":28,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":71,"driver":"Sam Brochu","points":27,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":72,"driver":"James Loveland","points":25,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":73,"driver":"Brandon Buie","points":24,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":73,"driver":"Cameron King3","points":24,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":75,"driver":"Christian Angel","points":23,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":76,"driver":"Jacob Emery","points":22,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":77,"driver":"Taylor Butcher-Benjamin","points":21,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":77,"driver":"Steven L McDonald","points":21,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":79,"driver":"Justin Richie","points":15,"wins":0,"top5":0,"top10":0,"starts":2}],"season3":[{"pos":1,"driver":"Joshua Banks","points":1194,"wins":1,"top5":8,"top10":10,"starts":14},{"pos":2,"driver":"Jeff J. Wright","points":1188,"wins":3,"top5":7,"top10":10,"starts":14},{"pos":3,"driver":"Ryan Carwile","points":1171,"wins":0,"top5":4,"top10":8,"starts":14},{"pos":4,"driver":"Joseph McWhorter","points":1159,"wins":0,"top5":4,"top10":7,"starts":15},{"pos":5,"driver":"Mark Whitley","points":1142,"wins":1,"top5":6,"top10":8,"starts":14},{"pos":6,"driver":"Taylor Butcher-Benjamin","points":1135,"wins":0,"top5":0,"top10":1,"starts":15},{"pos":6,"driver":"Bailey Turner","points":1135,"wins":2,"top5":7,"top10":9,"starts":12},{"pos":8,"driver":"Eddy Trejo","points":1129,"wins":0,"top5":0,"top10":0,"starts":14},{"pos":9,"driver":"Alex W Bell","points":1126,"wins":1,"top5":3,"top10":9,"starts":13},{"pos":10,"driver":"Christopher Hodges","points":1108,"wins":0,"top5":0,"top10":2,"starts":13},{"pos":11,"driver":"Jeremy E Miller","points":1080,"wins":1,"top5":4,"top10":4,"starts":12},{"pos":12,"driver":"Eric Hutton","points":1000,"wins":0,"top5":3,"top10":6,"starts":8},{"pos":13,"driver":"Chuck Sweeting","points":362,"wins":0,"top5":1,"top10":6,"starts":13},{"pos":14,"driver":"Rhea Massey","points":353,"wins":1,"top5":2,"top10":5,"starts":14},{"pos":15,"driver":"Max Kost","points":343,"wins":0,"top5":0,"top10":0,"starts":15},{"pos":16,"driver":"Casey Lakatos","points":332,"wins":0,"top5":1,"top10":3,"starts":12},{"pos":17,"driver":"Brian Chambliss","points":306,"wins":0,"top5":0,"top10":3,"starts":11},{"pos":18,"driver":"Austin Boelke","points":303,"wins":0,"top5":0,"top10":1,"starts":15},{"pos":19,"driver":"Phillip Brewer","points":302,"wins":0,"top5":1,"top10":3,"starts":13},{"pos":20,"driver":"Bryce Shoemaker","points":296,"wins":0,"top5":1,"top10":4,"starts":11},{"pos":20,"driver":"Caleb Weekley","points":296,"wins":0,"top5":1,"top10":2,"starts":13},{"pos":22,"driver":"Gerry Bergeron","points":275,"wins":0,"top5":0,"top10":1,"starts":11},{"pos":23,"driver":"Mark McFadyen","points":261,"wins":0,"top5":0,"top10":0,"starts":13},{"pos":24,"driver":"Reggie Ortega","points":238,"wins":0,"top5":2,"top10":4,"starts":9},{"pos":25,"driver":"Dakota Floyd2","points":232,"wins":0,"top5":0,"top10":1,"starts":12},{"pos":26,"driver":"Angelo Hronis","points":227,"wins":0,"top5":0,"top10":4,"starts":9},{"pos":27,"driver":"A.J. Stravato","points":212,"wins":1,"top5":3,"top10":3,"starts":8},{"pos":28,"driver":"Brandon Wallace","points":205,"wins":0,"top5":0,"top10":0,"starts":11},{"pos":29,"driver":"Matthew Radford","points":200,"wins":0,"top5":1,"top10":1,"starts":10},{"pos":30,"driver":"Noah Michalski","points":189,"wins":0,"top5":0,"top10":1,"starts":10},{"pos":31,"driver":"Kenny Kibbey","points":188,"wins":0,"top5":2,"top10":4,"starts":5},{"pos":32,"driver":"Kyle Peacock","points":183,"wins":0,"top5":0,"top10":2,"starts":10},{"pos":33,"driver":"Jonathan Smith12","points":181,"wins":0,"top5":0,"top10":2,"starts":9},{"pos":34,"driver":"Chad Clinger","points":176,"wins":1,"top5":1,"top10":3,"starts":8},{"pos":34,"driver":"Michael Sturgill","points":176,"wins":0,"top5":1,"top10":2,"starts":6},{"pos":34,"driver":"Logan Threlkeld","points":176,"wins":0,"top5":0,"top10":1,"starts":8},{"pos":37,"driver":"Keith Shoemaker","points":166,"wins":0,"top5":0,"top10":0,"starts":9},{"pos":38,"driver":"Matt Shinoski","points":141,"wins":0,"top5":0,"top10":1,"starts":5},{"pos":39,"driver":"Aaron Smith II","points":139,"wins":2,"top5":2,"top10":2,"starts":5},{"pos":40,"driver":"Seth Hatchel","points":131,"wins":0,"top5":2,"top10":2,"starts":5},{"pos":41,"driver":"Nick F Wood","points":128,"wins":0,"top5":0,"top10":0,"starts":7},{"pos":42,"driver":"Ben D Bafford","points":124,"wins":0,"top5":1,"top10":1,"starts":5},{"pos":42,"driver":"Alek Martinez","points":124,"wins":0,"top5":3,"top10":3,"starts":3},{"pos":42,"driver":"Benjamin Richards","points":124,"wins":0,"top5":0,"top10":1,"starts":7},{"pos":45,"driver":"Stefan Davis","points":114,"wins":0,"top5":0,"top10":0,"starts":7},{"pos":46,"driver":"Mikal Jones","points":112,"wins":0,"top5":0,"top10":0,"starts":8},{"pos":46,"driver":"J R Shepherd","points":112,"wins":0,"top5":1,"top10":3,"starts":3},{"pos":48,"driver":"Adam Cabot","points":111,"wins":1,"top5":2,"top10":2,"starts":3},{"pos":49,"driver":"Enathian Ferrada","points":103,"wins":0,"top5":0,"top10":1,"starts":6},{"pos":50,"driver":"Bobby Patricca","points":98,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":51,"driver":"Rob Denton","points":80,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":52,"driver":"Derek M Garrison","points":77,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":53,"driver":"Brian Hennings","points":75,"wins":0,"top5":1,"top10":1,"starts":4},{"pos":54,"driver":"Justin Richie","points":71,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":55,"driver":"Joe Spinelli","points":70,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":56,"driver":"Morgan Cook2","points":66,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":57,"driver":"John Seniw","points":54,"wins":0,"top5":0,"top10":1,"starts":3},{"pos":58,"driver":"Rob Hamp","points":53,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":59,"driver":"Christian Angel","points":41,"wins":0,"top5":0,"top10":1,"starts":2},{"pos":60,"driver":"Clark Genneken","points":38,"wins":0,"top5":0,"top10":1,"starts":1},{"pos":61,"driver":"Jonny Rapp","points":37,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":62,"driver":"Benjamin Garrity","points":25,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":62,"driver":"Storm Patterson","points":25,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":64,"driver":"Ben Laughter","points":24,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":65,"driver":"Julio Villalobos.Jr","points":22,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":66,"driver":"Kenny Fuller","points":20,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":66,"driver":"Eric Garrison","points":20,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":68,"driver":"Michael Muncy","points":19,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":69,"driver":"Dallas Seiwert","points":14,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":70,"driver":"Jace Kully","points":9,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":70,"driver":"Jordan Traas","points":9,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":72,"driver":"Jeffrey K Allen","points":4,"wins":0,"top5":0,"top10":0,"starts":1}],"season4":[{"pos":1,"driver":"Bailey Turner","points":2212,"wins":7,"top5":13,"top10":13,"starts":18},{"pos":2,"driver":"Joshua L Adams","points":2191,"wins":2,"top5":6,"top10":10,"starts":17},{"pos":3,"driver":"Ryan Carwile","points":2186,"wins":1,"top5":5,"top10":12,"starts":18},{"pos":4,"driver":"J R Shepherd","points":2171,"wins":0,"top5":4,"top10":8,"starts":19},{"pos":5,"driver":"Dakota Floyd2","points":2168,"wins":0,"top5":4,"top10":9,"starts":17},{"pos":6,"driver":"Nicholas Hapiak2","points":2153,"wins":0,"top5":3,"top10":8,"starts":19},{"pos":7,"driver":"Kenny Kibbey","points":2147,"wins":0,"top5":4,"top10":9,"starts":19},{"pos":8,"driver":"Casey Lakatos","points":2142,"wins":0,"top5":2,"top10":5,"starts":17},{"pos":9,"driver":"Max Kost","points":2141,"wins":0,"top5":0,"top10":2,"starts":19},{"pos":9,"driver":"Jeff J. Wright","points":2141,"wins":1,"top5":7,"top10":9,"starts":18},{"pos":11,"driver":"Angelo Hronis","points":2140,"wins":0,"top5":1,"top10":9,"starts":17},{"pos":11,"driver":"Caleb Weekley","points":2140,"wins":0,"top5":0,"top10":1,"starts":19},{"pos":13,"driver":"Donald Kight","points":2138,"wins":1,"top5":2,"top10":6,"starts":18},{"pos":14,"driver":"Matt Shinoski","points":2124,"wins":0,"top5":0,"top10":2,"starts":19},{"pos":15,"driver":"Chad Clinger","points":2118,"wins":1,"top5":6,"top10":11,"starts":18},{"pos":16,"driver":"Adam Cabot","points":2097,"wins":3,"top5":9,"top10":10,"starts":11},{"pos":17,"driver":"Christopher Hodges","points":443,"wins":0,"top5":2,"top10":2,"starts":18},{"pos":18,"driver":"Julio Villalobos.Jr","points":441,"wins":0,"top5":2,"top10":4,"starts":17},{"pos":19,"driver":"Austin Boelke","points":420,"wins":0,"top5":0,"top10":1,"starts":19},{"pos":20,"driver":"Brian Chambliss","points":405,"wins":1,"top5":1,"top10":3,"starts":15},{"pos":21,"driver":"Bryce Shoemaker","points":380,"wins":0,"top5":1,"top10":3,"starts":17},{"pos":22,"driver":"A.J. Stravato","points":349,"wins":1,"top5":4,"top10":7,"starts":12},{"pos":23,"driver":"Joseph McWhorter","points":313,"wins":0,"top5":0,"top10":3,"starts":17},{"pos":24,"driver":"Rhea Massey","points":311,"wins":0,"top5":0,"top10":2,"starts":14},{"pos":25,"driver":"Elliott Butler","points":298,"wins":0,"top5":1,"top10":3,"starts":13},{"pos":26,"driver":"Brandon Wallace","points":285,"wins":0,"top5":0,"top10":0,"starts":17},{"pos":27,"driver":"Stefan Davis","points":284,"wins":0,"top5":0,"top10":1,"starts":15},{"pos":28,"driver":"Joshua Banks","points":283,"wins":0,"top5":2,"top10":3,"starts":14},{"pos":29,"driver":"Keith Shoemaker","points":266,"wins":0,"top5":0,"top10":0,"starts":15},{"pos":30,"driver":"Eddy Trejo","points":248,"wins":0,"top5":0,"top10":0,"starts":13},{"pos":31,"driver":"Reggie Ortega","points":244,"wins":0,"top5":1,"top10":3,"starts":11},{"pos":32,"driver":"Logan Threlkeld","points":236,"wins":0,"top5":1,"top10":1,"starts":15},{"pos":33,"driver":"Nick F Wood","points":220,"wins":0,"top5":0,"top10":0,"starts":13},{"pos":34,"driver":"James Lehman","points":216,"wins":0,"top5":0,"top10":2,"starts":14},{"pos":35,"driver":"Alek Martinez","points":198,"wins":0,"top5":2,"top10":5,"starts":6},{"pos":36,"driver":"Andy Telgenhof","points":190,"wins":0,"top5":2,"top10":2,"starts":8},{"pos":37,"driver":"Rob Hamp","points":188,"wins":0,"top5":1,"top10":1,"starts":15},{"pos":38,"driver":"Ben Laughter","points":173,"wins":0,"top5":0,"top10":2,"starts":8},{"pos":39,"driver":"Mike Sturgill","points":145,"wins":0,"top5":0,"top10":0,"starts":8},{"pos":40,"driver":"Phillip Brewer","points":130,"wins":0,"top5":0,"top10":0,"starts":11},{"pos":41,"driver":"Noah Michalski","points":128,"wins":0,"top5":0,"top10":1,"starts":7},{"pos":42,"driver":"Ben D Bafford","points":124,"wins":0,"top5":2,"top10":2,"starts":5},{"pos":42,"driver":"Hunter Senior","points":124,"wins":0,"top5":0,"top10":2,"starts":4},{"pos":44,"driver":"Lucas Lyons","points":114,"wins":0,"top5":1,"top10":1,"starts":4},{"pos":45,"driver":"Rob Denton","points":113,"wins":0,"top5":0,"top10":0,"starts":12},{"pos":46,"driver":"Mark McFadyen","points":106,"wins":0,"top5":0,"top10":0,"starts":10},{"pos":47,"driver":"Joseph Solivan","points":82,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":48,"driver":"Jared Skinner","points":81,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":49,"driver":"Oskar Jensen","points":74,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":50,"driver":"Brian Hennings","points":68,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":51,"driver":"Tyler Dohar","points":66,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":52,"driver":"Seth Hatchel","points":57,"wins":0,"top5":1,"top10":1,"starts":2},{"pos":53,"driver":"Jeremy E Miller","points":56,"wins":0,"top5":1,"top10":1,"starts":2},{"pos":54,"driver":"Morgan Lilly","points":55,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":55,"driver":"Benjamin Richards","points":54,"wins":0,"top5":0,"top10":0,"starts":6},{"pos":56,"driver":"Clark Genneken","points":50,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":57,"driver":"Broderick Vaclavik","points":46,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":58,"driver":"Alex W Bell","points":41,"wins":0,"top5":1,"top10":1,"starts":1},{"pos":59,"driver":"John Seniw","points":39,"wins":0,"top5":0,"top10":1,"starts":3},{"pos":60,"driver":"Jonny Rapp","points":35,"wins":0,"top5":0,"top10":1,"starts":1},{"pos":61,"driver":"Kyle Peacock","points":32,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":62,"driver":"Justin Richie","points":20,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":63,"driver":"Jordan Traas","points":19,"wins":0,"top5":0,"top10":0,"starts":2}],"season5":[{"pos":1,"driver":"Jeff J. Wright","points":2227,"wins":7,"top5":9,"top10":12,"starts":16},{"pos":2,"driver":"Kenny Kibbey","points":2203,"wins":1,"top5":6,"top10":10,"starts":15},{"pos":3,"driver":"J R Shepherd","points":2168,"wins":1,"top5":7,"top10":9,"starts":17},{"pos":4,"driver":"Joshua Banks","points":2166,"wins":4,"top5":10,"top10":10,"starts":17},{"pos":5,"driver":"Chuck Sweeting","points":2161,"wins":0,"top5":3,"top10":9,"starts":17},{"pos":6,"driver":"Elliott Butler","points":2159,"wins":0,"top5":0,"top10":5,"starts":17},{"pos":7,"driver":"Brandon Wallace","points":2153,"wins":0,"top5":1,"top10":1,"starts":17},{"pos":8,"driver":"Dakota Floyd2","points":2139,"wins":0,"top5":3,"top10":4,"starts":16},{"pos":9,"driver":"Matt Shinoski","points":2106,"wins":0,"top5":0,"top10":4,"starts":16},{"pos":10,"driver":"Nicholas Hapiak2","points":2104,"wins":0,"top5":0,"top10":10,"starts":14},{"pos":11,"driver":"Caleb Weekley","points":2103,"wins":0,"top5":0,"top10":1,"starts":14},{"pos":12,"driver":"Christopher Hodges","points":2101,"wins":0,"top5":1,"top10":4,"starts":16},{"pos":13,"driver":"Bailey Turner","points":2085,"wins":1,"top5":7,"top10":10,"starts":14},{"pos":14,"driver":"Joseph McWhorter","points":2078,"wins":0,"top5":5,"top10":9,"starts":15},{"pos":15,"driver":"Angelo Hronis","points":2067,"wins":0,"top5":2,"top10":5,"starts":14},{"pos":16,"driver":"Hunter Senior","points":2032,"wins":0,"top5":1,"top10":5,"starts":12},{"pos":17,"driver":"Austin Boelke","points":391,"wins":0,"top5":1,"top10":1,"starts":15},{"pos":18,"driver":"Casey Lakatos","points":382,"wins":0,"top5":2,"top10":4,"starts":12},{"pos":19,"driver":"Ryan Carwile","points":377,"wins":0,"top5":2,"top10":5,"starts":13},{"pos":20,"driver":"Chad Clinger","points":344,"wins":1,"top5":3,"top10":5,"starts":15},{"pos":21,"driver":"Bryce Shoemaker","points":339,"wins":0,"top5":0,"top10":4,"starts":12},{"pos":22,"driver":"Ben Laughter","points":334,"wins":0,"top5":0,"top10":2,"starts":14},{"pos":23,"driver":"Eddy Trejo","points":317,"wins":0,"top5":0,"top10":0,"starts":13},{"pos":24,"driver":"Bryce Kalusa","points":282,"wins":0,"top5":3,"top10":4,"starts":12},{"pos":25,"driver":"Phillip Brewer","points":273,"wins":0,"top5":3,"top10":3,"starts":12},{"pos":26,"driver":"Brian Chambliss","points":258,"wins":0,"top5":1,"top10":1,"starts":9},{"pos":26,"driver":"Rhea Massey","points":258,"wins":0,"top5":1,"top10":2,"starts":11},{"pos":28,"driver":"James Lehman","points":256,"wins":0,"top5":0,"top10":2,"starts":11},{"pos":29,"driver":"Stefan Davis","points":244,"wins":0,"top5":0,"top10":1,"starts":12},{"pos":30,"driver":"A.J. Stravato","points":232,"wins":0,"top5":3,"top10":4,"starts":9},{"pos":31,"driver":"Donald Kight","points":216,"wins":0,"top5":1,"top10":2,"starts":9},{"pos":32,"driver":"Enathian Ferrada","points":209,"wins":1,"top5":2,"top10":3,"starts":8},{"pos":33,"driver":"Joshua L Adams","points":201,"wins":0,"top5":1,"top10":2,"starts":11},{"pos":34,"driver":"Max Kost","points":189,"wins":0,"top5":0,"top10":1,"starts":8},{"pos":35,"driver":"Jeremy E Miller","points":164,"wins":0,"top5":1,"top10":3,"starts":6},{"pos":36,"driver":"Keith Shoemaker","points":163,"wins":0,"top5":0,"top10":0,"starts":10},{"pos":37,"driver":"Reggie Ortega","points":150,"wins":0,"top5":2,"top10":2,"starts":7},{"pos":38,"driver":"Seth Hatchel","points":140,"wins":0,"top5":1,"top10":1,"starts":6},{"pos":39,"driver":"Broderick Vaclavik","points":137,"wins":1,"top5":1,"top10":1,"starts":4},{"pos":40,"driver":"Jared Skinner","points":132,"wins":0,"top5":0,"top10":0,"starts":6},{"pos":41,"driver":"Craig Martin9","points":117,"wins":0,"top5":0,"top10":2,"starts":4},{"pos":42,"driver":"Andy Telgenhof","points":90,"wins":0,"top5":1,"top10":1,"starts":5},{"pos":43,"driver":"Benjamin Richards","points":80,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":44,"driver":"Adam Cabot","points":72,"wins":0,"top5":1,"top10":1,"starts":3},{"pos":45,"driver":"Jacob Locklear","points":70,"wins":0,"top5":0,"top10":1,"starts":2},{"pos":46,"driver":"Noah Michalski","points":64,"wins":0,"top5":0,"top10":1,"starts":3},{"pos":47,"driver":"Julio Villalobos.Jr","points":58,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":48,"driver":"Mark McFadyen","points":57,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":49,"driver":"Rob Hamp","points":53,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":50,"driver":"Kyle Taub","points":41,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":51,"driver":"Ethan E Collier","points":39,"wins":0,"top5":0,"top10":1,"starts":2},{"pos":52,"driver":"John Seniw","points":35,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":53,"driver":"Jordan Traas","points":34,"wins":0,"top5":0,"top10":1,"starts":1},{"pos":54,"driver":"Rob Denton","points":27,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":55,"driver":"Mark Cofield","points":21,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":56,"driver":"Logan Threlkeld","points":18,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":57,"driver":"Mikal Jones","points":15,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":58,"driver":"Jonathan Smith12","points":12,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":59,"driver":"Kyle Peacock","points":6,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":60,"driver":"Matt Dominique","points":5,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":61,"driver":"Lucas Lyons","points":4,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":62,"driver":"Michael Muncy","points":3,"wins":0,"top5":0,"top10":0,"starts":1}]};

const trackStatsData = {"Atlanta Motor Speedway (2008)":[{"driver":"Jeff J. Wright","wins":1,"poles":2,"top5":3,"top10":4,"starts":5,"laps_led":291},{"driver":"Chad Clinger","wins":1,"poles":1,"top5":2,"top10":3,"starts":5,"laps_led":8},{"driver":"Rhea Massey","wins":1,"poles":0,"top5":2,"top10":3,"starts":4,"laps_led":21},{"driver":"Brian Chambliss","wins":1,"poles":0,"top5":2,"top10":2,"starts":4,"laps_led":12},{"driver":"Ryan Carwile","wins":1,"poles":0,"top5":2,"top10":2,"starts":4,"laps_led":49},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":2,"top10":3,"starts":3,"laps_led":91},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":2,"top10":2,"starts":5,"laps_led":28},{"driver":"Alek Martinez","wins":0,"poles":0,"top5":1,"top10":3,"starts":3,"laps_led":2},{"driver":"Dakota Floyd","wins":0,"poles":0,"top5":1,"top10":2,"starts":4,"laps_led":0},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0}],"Auto Club Speedway":[{"driver":"Bailey Turner","wins":3,"poles":0,"top5":5,"top10":5,"starts":5,"laps_led":42},{"driver":"Jeff J. Wright","wins":2,"poles":1,"top5":5,"top10":6,"starts":6,"laps_led":245},{"driver":"Joseph McWhorter","wins":1,"poles":0,"top5":1,"top10":2,"starts":5,"laps_led":18},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":3,"top10":3,"starts":6,"laps_led":94},{"driver":"Angelo Hronis","wins":0,"poles":1,"top5":2,"top10":3,"starts":5,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":67},{"driver":"J R Shepherd","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":13},{"driver":"Adam Cabot","wins":0,"poles":0,"top5":1,"top10":3,"starts":3,"laps_led":7},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":2,"starts":6,"laps_led":1},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":1}],"Bristol Motor Speedway":[{"driver":"Joshua Banks","wins":1,"poles":1,"top5":3,"top10":3,"starts":4,"laps_led":190},{"driver":"Bailey Turner","wins":1,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":238},{"driver":"Joseph McWhorter","wins":1,"poles":0,"top5":2,"top10":2,"starts":4,"laps_led":29},{"driver":"Rhea Massey","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":19},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":2,"top10":3,"starts":4,"laps_led":0},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":11},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":190},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":0},{"driver":"Adam Cabot","wins":0,"poles":1,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Bryce Shoemaker","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0}],"Canadian Tire Motorsports Park":[{"driver":"A.J. Stravato","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":15},{"driver":"Adam Cabot","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"J R Shepherd","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":18},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Ben Laughter","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Casey Lakatos","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Charlotte Motor Speedway":[{"driver":"Enathian Ferrada","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1},{"driver":"Joshua L Adams","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":10},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":1},{"driver":"Joseph McWhorter","wins":0,"poles":1,"top5":1,"top10":2,"starts":2,"laps_led":141},{"driver":"Nicholas Hapiak","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":108},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Reggie Ortega","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":5},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":34}],"Chicagoland Speedway":[{"driver":"Jeff J. Wright","wins":2,"poles":1,"top5":3,"top10":3,"starts":4,"laps_led":202},{"driver":"Joshua Banks","wins":1,"poles":0,"top5":3,"top10":3,"starts":5,"laps_led":83},{"driver":"Bailey Turner","wins":1,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":36},{"driver":"Rhea Massey","wins":1,"poles":0,"top5":1,"top10":2,"starts":5,"laps_led":1},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":3,"top10":3,"starts":5,"laps_led":74},{"driver":"A.J. Stravato","wins":0,"poles":1,"top5":2,"top10":3,"starts":5,"laps_led":4},{"driver":"Adam Cabot","wins":0,"poles":1,"top5":2,"top10":2,"starts":2,"laps_led":79},{"driver":"J R Shepherd","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":5},{"driver":"Mark Whitley","wins":0,"poles":1,"top5":2,"top10":2,"starts":3,"laps_led":59},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":4,"starts":5,"laps_led":2}],"Darlington Raceway":[{"driver":"Jeff J. Wright","wins":2,"poles":1,"top5":2,"top10":2,"starts":2,"laps_led":240},{"driver":"Adam Cabot","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":95},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":2,"top10":3,"starts":3,"laps_led":14},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":0},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":3},{"driver":"J R Shepherd","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":1,"top10":2,"starts":3,"laps_led":0},{"driver":"Andy Telgenhof","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Chad Clinger","wins":0,"poles":1,"top5":1,"top10":1,"starts":2,"laps_led":29}],"Daytona International Speedway":[{"driver":"Bailey Turner","wins":3,"poles":0,"top5":3,"top10":3,"starts":4,"laps_led":36},{"driver":"Reggie Ortega","wins":1,"poles":0,"top5":2,"top10":4,"starts":6,"laps_led":5},{"driver":"Eric Hutton","wins":1,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":4},{"driver":"Andy Telgenhof","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":8},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":3,"top10":3,"starts":6,"laps_led":57},{"driver":"Adam Cabot","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":30},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":2,"top10":2,"starts":6,"laps_led":20},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":2,"top10":2,"starts":4,"laps_led":31},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":3,"starts":3,"laps_led":4},{"driver":"Noah Michalski","wins":0,"poles":0,"top5":1,"top10":3,"starts":5,"laps_led":10}],"Dover Motor Speedway":[{"driver":"Adam Cabot","wins":2,"poles":1,"top5":2,"top10":2,"starts":3,"laps_led":241},{"driver":"Joshua Banks","wins":1,"poles":0,"top5":3,"top10":4,"starts":4,"laps_led":104},{"driver":"Jeff J. Wright","wins":1,"poles":2,"top5":2,"top10":3,"starts":5,"laps_led":214},{"driver":"Alek Martinez","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":45},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":3,"top10":3,"starts":4,"laps_led":18},{"driver":"Mark Whitley","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":1,"top10":2,"starts":4,"laps_led":53},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":2,"starts":4,"laps_led":1},{"driver":"J R Shepherd","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":2},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0}],"Homestead-Miami Speedway":[{"driver":"Ryan Carwile","wins":1,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":27},{"driver":"Jeff J. Wright","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":89},{"driver":"Alex W Bell","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":22},{"driver":"Christopher Hodges","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Dakota Floyd","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1},{"driver":"Joshua L Adams","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":34},{"driver":"Nicholas Hapiak","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":30},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":1},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1}],"Indianapolis Motor Speedway":[{"driver":"A.J. Stravato","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":5},{"driver":"Alek Martinez","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Eric Hutton","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":6},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":3},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Brian Chambliss","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Christopher Hodges","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":33},{"driver":"Mark Whitley","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Iowa Speedway":[{"driver":"Jeff J. Wright","wins":2,"poles":1,"top5":4,"top10":4,"starts":4,"laps_led":415},{"driver":"Joshua L Adams","wins":1,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":52},{"driver":"Michael Sturgill","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":8},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":3,"top10":4,"starts":4,"laps_led":70},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":0},{"driver":"Joseph McWhorter","wins":0,"poles":1,"top5":1,"top10":3,"starts":4,"laps_led":66},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":3},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":1,"top10":2,"starts":3,"laps_led":3},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Ben D Bafford","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0}],"Kansas Speedway":[{"driver":"Jeff J. Wright","wins":2,"poles":2,"top5":2,"top10":2,"starts":4,"laps_led":233},{"driver":"Adam Cabot","wins":1,"poles":0,"top5":3,"top10":3,"starts":3,"laps_led":130},{"driver":"Jeremy E Miller","wins":1,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":64},{"driver":"Joshua Banks","wins":1,"poles":0,"top5":1,"top10":2,"starts":3,"laps_led":38},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":3,"top10":3,"starts":3,"laps_led":21},{"driver":"Alex W Bell","wins":0,"poles":1,"top5":3,"top10":3,"starts":3,"laps_led":39},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":2,"top10":3,"starts":5,"laps_led":7},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":2,"top10":3,"starts":3,"laps_led":2},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":96},{"driver":"Phillip Brewer","wins":0,"poles":1,"top5":1,"top10":2,"starts":4,"laps_led":1}],"Kentucky Speedway":[{"driver":"J R Shepherd","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":20},{"driver":"Michael Sturgill","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":2},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":174},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":21},{"driver":"Bryce Kalusa","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Christopher Hodges","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":1},{"driver":"Dakota Floyd","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Julio Villalobos.Jr","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Nicholas Hapiak","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0}],"Kevin Harvick's Kern Raceway":[{"driver":"Bailey Turner","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":2},{"driver":"Casey Lakatos","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":12},{"driver":"Christopher Hodges","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"J R Shepherd","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Joshua L Adams","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Donald Kight","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":43},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":36}],"Las Vegas Motor Speedway":[{"driver":"Jeff J. Wright","wins":4,"poles":3,"top5":4,"top10":4,"starts":6,"laps_led":503},{"driver":"Joseph McWhorter","wins":1,"poles":0,"top5":3,"top10":3,"starts":5,"laps_led":78},{"driver":"Adam Cabot","wins":1,"poles":1,"top5":2,"top10":2,"starts":2,"laps_led":83},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":2,"top10":4,"starts":6,"laps_led":15},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":2,"top10":3,"starts":5,"laps_led":43},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":2,"top10":3,"starts":4,"laps_led":23},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":1},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":3,"starts":3,"laps_led":0},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":3,"starts":5,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":3,"starts":5,"laps_led":2}],"Martinsville Speedway":[{"driver":"A.J. Stravato","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":29},{"driver":"Joshua Banks","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":92},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":7},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0},{"driver":"Casey Lakatos","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":3},{"driver":"Clifton Cockrell","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Jonathan Smith12","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Phillip Brewer","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0}],"Michigan International Speedway":[{"driver":"Bailey Turner","wins":1,"poles":0,"top5":3,"top10":3,"starts":3,"laps_led":92},{"driver":"Chad Clinger","wins":1,"poles":1,"top5":2,"top10":3,"starts":3,"laps_led":22},{"driver":"A.J. Stravato","wins":1,"poles":0,"top5":1,"top10":1,"starts":3,"laps_led":26},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":3,"top10":3,"starts":3,"laps_led":86},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":24},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":2},{"driver":"Reggie Ortega","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":0,"top10":2,"starts":3,"laps_led":2}],"Nashville Fairgrounds Speedway":[{"driver":"Alex W Bell","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":35},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":9},{"driver":"Jeremy E Miller","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Michael Sturgill","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Enathian Ferrada","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":91},{"driver":"Reggie Ortega","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Taylor Butcher-Benjamin","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Nashville Superspeedway":[{"driver":"Jeff J. Wright","wins":1,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":188},{"driver":"Joshua Banks","wins":1,"poles":1,"top5":2,"top10":2,"starts":2,"laps_led":25},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":4},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Adam Cabot","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Austin Boelke","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":38},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":0,"top10":1,"starts":2,"laps_led":1}],"New Hampshire Motor Speedway":[{"driver":"Bailey Turner","wins":2,"poles":0,"top5":2,"top10":3,"starts":3,"laps_led":112},{"driver":"Mark Whitley","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":86},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":0},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":32},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":13},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":11},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":18},{"driver":"Adam Cabot","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":103},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0}],"North Wilkesboro Speedway":[{"driver":"Ben D Bafford","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":57},{"driver":"Jeff J. Wright","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":81},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":23},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":14},{"driver":"Caleb Weekley","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Julio Villalobos.Jr","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Phoenix Raceway":[{"driver":"Chad Clinger","wins":1,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":87},{"driver":"Jeff J. Wright","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":124},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":55},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":24},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":5},{"driver":"Adam Cabot","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Alek Martinez","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":4},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Noah Michalski","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":3},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":0,"top10":2,"starts":2,"laps_led":0}],"Pocono Raceway":[{"driver":"Chad Clinger","wins":1,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":14},{"driver":"Jeff J. Wright","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":26},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":19},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":31},{"driver":"Alek Martinez","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Donald Kight","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Hunter Senior","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Richmond Raceway":[{"driver":"Jeff J. Wright","wins":1,"poles":1,"top5":3,"top10":5,"starts":5,"laps_led":170},{"driver":"Joshua Banks","wins":1,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":60},{"driver":"Chad Clinger","wins":1,"poles":1,"top5":1,"top10":4,"starts":5,"laps_led":142},{"driver":"Aaron Smith II","wins":1,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":8},{"driver":"Kenny Kibbey","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":70},{"driver":"Bailey Turner","wins":0,"poles":2,"top5":4,"top10":5,"starts":5,"laps_led":370},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":0},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":2,"top10":2,"starts":4,"laps_led":0},{"driver":"Jeremy E Miller","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":5},{"driver":"Mark Whitley","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":42}],"Rockingham Speedway":[{"driver":"Joshua Banks","wins":1,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":16},{"driver":"Jeff J. Wright","wins":1,"poles":1,"top5":1,"top10":1,"starts":2,"laps_led":186},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":43},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":8},{"driver":"Mark Whitley","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":16},{"driver":"Phillip Brewer","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Reggie Ortega","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":0,"top10":1,"starts":2,"laps_led":0}],"Sonoma Raceway":[{"driver":"Jeff J. Wright","wins":1,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":22},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":18},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Sean Langton","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"James Loveland","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Jonathan Cofield","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Michael Kostek","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Talladega Superspeedway":[{"driver":"Adam Cabot","wins":2,"poles":1,"top5":3,"top10":4,"starts":4,"laps_led":57},{"driver":"Bailey Turner","wins":1,"poles":0,"top5":2,"top10":3,"starts":4,"laps_led":43},{"driver":"Broderick Vaclavik","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1},{"driver":"Donald Kight","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":20},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":2,"top10":3,"starts":4,"laps_led":4},{"driver":"Caleb Weekley","wins":0,"poles":0,"top5":1,"top10":3,"starts":4,"laps_led":0},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":1,"top10":2,"starts":3,"laps_led":0},{"driver":"Casey Lakatos","wins":0,"poles":0,"top5":1,"top10":2,"starts":4,"laps_led":1},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":1,"starts":3,"laps_led":29},{"driver":"Brandon Wallace","wins":0,"poles":0,"top5":1,"top10":1,"starts":5,"laps_led":0}],"Texas Motor Speedway":[{"driver":"Bailey Turner","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":16},{"driver":"Alek Martinez","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Andy Telgenhof","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Ben D Bafford","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":113},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Noah Michalski","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Reggie Ortega","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"The Milwaukee Mile":[{"driver":"Joshua Banks","wins":1,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":85},{"driver":"Alek Martinez","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":4},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":5},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":13},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Eric Hutton","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Phillip Brewer","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Reggie Ortega","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Watkins Glen International":[{"driver":"Joseph McWhorter","wins":1,"poles":1,"top5":1,"top10":2,"starts":2,"laps_led":19},{"driver":"Aaron Smith II","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":16},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":2},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":2},{"driver":"Alek Martinez","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":4},{"driver":"Ben D Bafford","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Mark Whitley","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":22},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":1},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":0,"top10":2,"starts":2,"laps_led":5},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"World Wide Technology Raceway (Gateway)":[{"driver":"Joshua Banks","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":48},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":2},{"driver":"Jacob Bradley","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":89},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Bryce Shoemaker","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Caleb Weekley","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Michael Kostek","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Noah Michalski","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Ryan J Rose","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"[Legacy] Kentucky Speedway - 2011":[{"driver":"Seth Hatchel","wins":1,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":52},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":11},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":17},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":3},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":48},{"driver":"Eric Hutton","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Lucas Lyons","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":2},{"driver":"Michael Kostek","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":1},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":6},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"[Legacy] Texas Motor Speedway - 2009":[{"driver":"Jeff J. Wright","wins":1,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":121},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":2},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":2},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Eric Hutton","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":1},{"driver":"Jonathan Cofield","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Taylor Butcher-Benjamin","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"[Retired] Charlotte Motor Speedway":[{"driver":"Joseph McWhorter","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":26},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Jeff J. Wright","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":82},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":9},{"driver":"Mark Whitley","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":20},{"driver":"Adam Cabot","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":3},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Caleb Weekley","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Nicholas Starling","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}]};

const seasonChampions = {
  1: {driver: "Jeff J. Wright", points: 2270, wins: 6},
  2: {driver: "Joseph McWhorter", points: 2248, wins: 3},
  3: {driver: "Joshua Banks", points: 1194, wins: 1},
  4: {driver: "Bailey Turner", points: 2212, wins: 7},
  5: {driver: "Jeff J. Wright", points: 2227, wins: 7}
};

// --- State ---
let currentPage = 'home';
let currentSort = {col: 'pos', dir: 'asc'};
let currentSeason = 1;

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initCountdown();
  renderSchedule();
  renderStandings();
  initStandingsSearch();
  initTableSort();
  initHistoryTabs();
  renderHistory(1);
  renderTracks();
  initTrackSearch();
  initRuleAccordions();
  initThemeToggle();
  initHamburger();
});

// --- Router ---
function initRouter() {
  function handleHash() {
    const hash = window.location.hash.replace('#', '') || 'home';
    showPage(hash);
  }
  window.addEventListener('hashchange', handleHash);
  handleHash();
}

function showPage(page) {
  const validPages = ['home', 'standings', 'history', 'tracks', 'rules'];
  if (!validPages.includes(page)) page = 'home';
  
  currentPage = page;
  
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.style.display = 'none';
  });
  
  // Show target
  const target = document.getElementById('page-' + page);
  if (target) {
    target.style.display = 'block';
    target.style.animation = 'none';
    target.offsetHeight; // reflow
    target.style.animation = 'fadeIn 0.3s ease';
  }
  
  // Update nav
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
  
  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// --- Countdown ---
function initCountdown() {
  const target = new Date('2026-03-21T22:00:00-05:00').getTime();
  
  function update() {
    const now = Date.now();
    const diff = target - now;
    
    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '--';
      document.getElementById('cd-hours').textContent = '--';
      document.getElementById('cd-mins').textContent = '--';
      document.getElementById('cd-secs').textContent = '--';
      const labels = document.querySelectorAll('.countdown-label');
      if (labels.length) {
        document.querySelector('.countdown-section .section-title').textContent = 'Next Race: Coming Soon';
      }
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
  }
  
  update();
  setInterval(update, 1000);
}

// --- Schedule ---
function renderSchedule() {
  const grid = document.getElementById('scheduleGrid');
  grid.innerHTML = scheduleData.map(race => {
    let classes = 'schedule-race';
    let badge = '';
    if (race.completed) {
      classes += ' completed';
      badge = '<span class="race-badge complete-badge">✓</span>';
    }
    if (race.next) {
      classes += ' next';
      badge = '<span class="race-badge next-badge">NEXT</span>';
    }
    if (race.chase) {
      classes += ' chase';
      if (race.label) badge = '<span class="race-badge chase-badge">' + race.label + '</span>';
    }
    if (race.championship) {
      classes += ' championship';
      badge = '<span class="race-badge champ-badge">' + race.label + '</span>';
    }
    
    const winner = race.winner ? '<div class="race-winner">🏆 ' + race.winner + '</div>' : '';
    
    return '<div class="' + classes + '">' +
      badge +
      '<div class="race-num">' + race.num + '</div>' +
      '<div class="race-info">' +
        '<div class="race-track-name">' + race.track + '</div>' +
        '<div class="race-date">' + race.date + '</div>' +
        winner +
      '</div>' +
    '</div>';
  }).join('');
}

// --- Standings ---
function renderStandings(data) {
  const tbody = document.getElementById('standingsBody');
  const list = data || standingsData;
  
  tbody.innerHTML = list.map(d => {
    let rowClass = '';
    if (d.pos <= 3) rowClass += ' pos-' + d.pos;
    if (d.pos <= 14 && !d.suspended) rowClass += ' chase-eligible';
    if (d.suspended) rowClass += ' suspended-row';
    
    const suspBadge = d.suspended ? '<span class="suspended-badge">SUSPENDED R5</span>' : '';
    const winsClass = d.wins > 0 ? ' wins-highlight' : '';
    
    return '<tr class="' + rowClass.trim() + '">' +
      '<td class="pos-cell">' + d.pos + '</td>' +
      '<td><span class="driver-name">' + d.driver + '</span>' + suspBadge + '</td>' +
      '<td><strong>' + d.points + '</strong></td>' +
      '<td class="wins-cell' + winsClass + '">' + d.wins + '</td>' +
      '<td>' + d.top5 + '</td>' +
      '<td>' + d.top10 + '</td>' +
      '<td>' + d.starts + '</td>' +
    '</tr>';
  }).join('');
}

function initStandingsSearch() {
  const input = document.getElementById('standingsSearch');
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    const filtered = standingsData.filter(d => d.driver.toLowerCase().includes(q));
    renderStandings(filtered);
  });
}

// --- Table Sort ---
function initTableSort() {
  document.querySelectorAll('.sortable').forEach(th => {
    th.addEventListener('click', () => {
      const col = th.dataset.sort;
      if (currentSort.col === col) {
        currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort.col = col;
        currentSort.dir = col === 'driver' ? 'asc' : 'desc';
      }
      
      // Update UI
      document.querySelectorAll('.sortable').forEach(t => {
        t.classList.remove('sorted', 'asc', 'desc');
      });
      th.classList.add('sorted', currentSort.dir);
      
      // Sort data copy
      const sorted = [...standingsData].sort((a, b) => {
        let va = a[col], vb = b[col];
        if (typeof va === 'string') {
          const cmp = va.localeCompare(vb);
          return currentSort.dir === 'asc' ? cmp : -cmp;
        }
        return currentSort.dir === 'asc' ? va - vb : vb - va;
      });
      
      // Re-apply search filter
      const q = document.getElementById('standingsSearch').value.toLowerCase().trim();
      const filtered = q ? sorted.filter(d => d.driver.toLowerCase().includes(q)) : sorted;
      renderStandings(filtered);
    });
  });
}

// --- History ---
function initHistoryTabs() {
  document.querySelectorAll('.season-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const season = parseInt(tab.dataset.season);
      document.querySelectorAll('.season-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderHistory(season);
    });
  });
}

function renderHistory(season) {
  const container = document.getElementById('historyContent');
  const key = 'season' + season;
  const data = historicalData[key] || [];
  const champ = seasonChampions[season];
  
  let html = '';
  
  // Champion card
  if (champ) {
    html += '<div class="champion-card">' +
      '<div class="champion-trophy">🏆</div>' +
      '<div class="champion-info">' +
        '<div class="champion-label">Season ' + season + ' Champion</div>' +
        '<div class="champion-name">' + champ.driver + '</div>' +
        '<div class="champion-stats">' +
          '<span><strong>' + champ.points + '</strong> Points</span>' +
          '<span><strong>' + champ.wins + '</strong> Wins</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  }
  
  // Table
  html += '<div class="table-wrapper"><table class="standings-table"><thead><tr>' +
    '<th>Pos</th><th>Driver</th><th>Points</th><th>Wins</th><th>Top 5</th><th>Top 10</th><th>Starts</th>' +
    '</tr></thead><tbody>';
  
  const displayData = data.slice(0, 20);
  displayData.forEach((d, i) => {
    let rowClass = '';
    if (d.pos === 1) rowClass = 'pos-1';
    else if (d.pos === 2) rowClass = 'pos-2';
    else if (d.pos === 3) rowClass = 'pos-3';
    
    const winsClass = d.wins > 0 ? ' wins-highlight' : '';
    
    html += '<tr class="' + rowClass + '">' +
      '<td class="pos-cell">' + d.pos + '</td>' +
      '<td class="driver-name">' + d.driver + '</td>' +
      '<td><strong>' + d.points + '</strong></td>' +
      '<td class="wins-cell' + winsClass + '">' + (d.wins || 0) + '</td>' +
      '<td>' + (d.top5 || 0) + '</td>' +
      '<td>' + (d.top10 || 0) + '</td>' +
      '<td>' + (d.starts || 0) + '</td>' +
    '</tr>';
  });
  
  html += '</tbody></table></div>';
  container.innerHTML = html;
}

// --- Tracks ---
function renderTracks(filter) {
  const grid = document.getElementById('tracksGrid');
  const entries = Object.entries(trackStatsData);
  
  const filtered = filter 
    ? entries.filter(([name]) => name.toLowerCase().includes(filter.toLowerCase()))
    : entries;
  
  // Sort by number of starts (total races at track)
  filtered.sort((a, b) => {
    const aStarts = a[1].length > 0 ? Math.max(...a[1].map(d => d.starts)) : 0;
    const bStarts = b[1].length > 0 ? Math.max(...b[1].map(d => d.starts)) : 0;
    return bStarts - aStarts;
  });
  
  grid.innerHTML = filtered.map(([name, drivers]) => {
    if (!drivers || drivers.length === 0) return '';
    
    const maxStarts = Math.max(...drivers.map(d => d.starts));
    const mostWins = drivers.reduce((best, d) => d.wins > (best ? best.wins : 0) ? d : best, null);
    const mostPoles = drivers.reduce((best, d) => d.poles > (best ? best.poles : 0) ? d : best, null);
    const mostTop5 = drivers.reduce((best, d) => d.top5 > (best ? best.top5 : 0) ? d : best, null);
    const mostTop10 = drivers.reduce((best, d) => d.top10 > (best ? best.top10 : 0) ? d : best, null);
    
    const id = name.replace(/[^a-zA-Z0-9]/g, '-');
    
    let leaders = '';
    if (mostWins && mostWins.wins > 0) {
      leaders += '<div class="track-leader-row"><span class="track-leader-cat">Most Wins</span><span class="track-leader-driver">' + mostWins.driver + '</span><span class="track-leader-val">' + mostWins.wins + '</span></div>';
    }
    if (mostPoles && mostPoles.poles > 0) {
      leaders += '<div class="track-leader-row"><span class="track-leader-cat">Most Poles</span><span class="track-leader-driver">' + mostPoles.driver + '</span><span class="track-leader-val">' + mostPoles.poles + '</span></div>';
    }
    if (mostTop5 && mostTop5.top5 > 0) {
      leaders += '<div class="track-leader-row"><span class="track-leader-cat">Most Top 5</span><span class="track-leader-driver">' + mostTop5.driver + '</span><span class="track-leader-val">' + mostTop5.top5 + '</span></div>';
    }
    if (mostTop10 && mostTop10.top10 > 0) {
      leaders += '<div class="track-leader-row"><span class="track-leader-cat">Most Top 10</span><span class="track-leader-driver">' + mostTop10.driver + '</span><span class="track-leader-val">' + mostTop10.top10 + '</span></div>';
    }
    
    // Full list table
    let fullTable = '<table class="track-full-table"><thead><tr><th>#</th><th>Driver</th><th>W</th><th>P</th><th>T5</th><th>T10</th><th>St</th><th>Led</th></tr></thead><tbody>';
    drivers.slice(0, 10).forEach((d, i) => {
      fullTable += '<tr><td>' + (i+1) + '</td><td>' + d.driver + '</td><td>' + d.wins + '</td><td>' + d.poles + '</td><td>' + d.top5 + '</td><td>' + d.top10 + '</td><td>' + d.starts + '</td><td>' + (d.laps_led || 0) + '</td></tr>';
    });
    fullTable += '</tbody></table>';
    
    return '<div class="track-card">' +
      '<div class="track-card-header">' +
        '<span class="track-card-name">' + name + '</span>' +
        '<span class="track-races-count">' + maxStarts + ' races</span>' +
      '</div>' +
      '<div class="track-card-leaders">' + leaders + '</div>' +
      '<div class="track-full-list" id="track-' + id + '">' + fullTable + '</div>' +
      '<button class="track-expand-btn" onclick="toggleTrack(\'' + id + '\', this)">Show Top 10 Drivers</button>' +
    '</div>';
  }).join('');
}

function toggleTrack(id, btn) {
  const list = document.getElementById('track-' + id);
  if (list) {
    const isOpen = list.classList.toggle('open');
    btn.textContent = isOpen ? 'Hide Details' : 'Show Top 10 Drivers';
  }
}

function initTrackSearch() {
  const input = document.getElementById('trackSearch');
  input.addEventListener('input', () => {
    renderTracks(input.value.trim());
  });
}

// --- Rules Accordion ---
function initRuleAccordions() {
  document.querySelectorAll('.rule-header').forEach(header => {
    header.addEventListener('click', () => {
      const ruleId = header.dataset.rule;
      const body = document.getElementById('rule-' + ruleId);
      const chevron = header.querySelector('.rule-chevron');
      
      if (body.classList.contains('open')) {
        body.classList.remove('open');
        chevron.style.transform = 'rotate(0deg)';
      } else {
        body.classList.add('open');
        chevron.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// --- Theme Toggle ---
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  btn.addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  });
}

// --- Hamburger ---
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    links.classList.toggle('open');
  });
  
  // Close on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('open');
    });
  });
}
