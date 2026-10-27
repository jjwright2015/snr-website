/* ============================================
   Saturday Night Racing Cup Series - App JS
   ============================================ */

// --- Data ---
const standingsData = [];  // Season 7: filled in after Race 1

const scheduleData = [
  {num:1,track:"Daytona",date:"Feb 21",completed:true,winner:"Andy Telgenhof"},
  {num:2,track:"Auto Club",date:"Feb 28",completed:true,winner:"Bailey Turner"},
  {num:3,track:"Phoenix",date:"Mar 7",completed:true,winner:"Jeff J. Wright"},
  {num:4,track:"Las Vegas",date:"Mar 14",completed:true,winner:"Jeff J. Wright"},
  {num:5,track:"Darlington",date:"Mar 21",completed:true,winner:"Joshua Banks"},
  {num:6,track:"Martinsville",date:"Mar 28",completed:true,winner:"Bailey Turner"},
  {num:7,track:"Iowa Speedway",date:"Apr 11",completed:true,winner:"Jeff J. Wright"},
  {num:8,track:"Rockingham",date:"Apr 18",completed:true,winner:"A.J. Stravato"},
  {num:9,track:"EchoPark Atlanta",date:"Apr 25",completed:true,winner:"Andy Telgenhof"},
  {num:10,track:"Texas",date:"May 2",completed:true,winner:"A.J. Stravato"},
  {num:11,track:"Dover",date:"May 16",completed:true,winner:"A.J. Stravato"},
  {num:12,track:"Charlotte",date:"May 23",completed:true,winner:"Jeff J. Wright"},
  {num:13,track:"Nashville",date:"May 30",completed:true,winner:"Bailey Turner"},
  {num:14,track:"Atlanta 2008",date:"Jun 6",completed:true,winner:"Joshua Banks"},
  {num:15,track:"Sonoma",date:"Jun 13",completed:true,winner:"Jeff J. Wright"},
  {num:16,track:"Richmond",date:"Jun 20",completed:true,winner:"Joshua Banks"},
  {num:17,track:"Chicagoland",date:"Jun 27",completed:true,winner:"Jeff J. Wright"},
  {num:18,track:"Talladega",date:"Jul 11",next:true,chase:true,label:"CHASE BEGINS"},
  {num:19,track:"Homestead",date:"Jul 18",chase:true},
  {num:20,track:"Michigan",date:"Jul 25",chase:true},
  {num:21,track:"Bristol",date:"Aug 1",chase:true},
  {num:22,track:"Kansas",date:"Aug 8",championship:true,label:"CHAMPIONSHIP"}
];

const historicalData = {"season1":[{"pos":1,"driver":"Jeff J. Wright","cust_id":130107,"points":2270,"wins":6,"top5":15,"top10":18,"starts":18},{"pos":2,"driver":"Joseph McWhorter","cust_id":239148,"points":2230,"wins":2,"top5":8,"top10":11,"starts":18},{"pos":3,"driver":"Michael Sturgill","cust_id":369915,"points":2224,"wins":1,"top5":8,"top10":11,"starts":16},{"pos":4,"driver":"Max Kost","cust_id":814229,"points":2188,"wins":0,"top5":0,"top10":3,"starts":20},{"pos":5,"driver":"Alex W Bell","cust_id":112336,"points":2174,"wins":0,"top5":3,"top10":14,"starts":17},{"pos":6,"driver":"Chad Clinger","cust_id":181470,"points":2161,"wins":1,"top5":8,"top10":11,"starts":19},{"pos":7,"driver":"Caleb Weekley","cust_id":277666,"points":2154,"wins":0,"top5":0,"top10":3,"starts":17},{"pos":8,"driver":"A.J. Stravato","cust_id":289748,"points":2142,"wins":2,"top5":8,"top10":13,"starts":16},{"pos":9,"driver":"Rhea Massey","cust_id":258136,"points":2140,"wins":1,"top5":2,"top10":9,"starts":17},{"pos":10,"driver":"Ryan Carwile","cust_id":18001,"points":2128,"wins":0,"top5":7,"top10":9,"starts":14},{"pos":11,"driver":"Mark McFadyen","cust_id":41162,"points":2105,"wins":0,"top5":0,"top10":0,"starts":18},{"pos":12,"driver":"Taylor Butcher-Benjamin","cust_id":297522,"points":2000,"wins":0,"top5":0,"top10":5,"starts":10},{"pos":13,"driver":"Joshua Banks","cust_id":214694,"points":518,"wins":1,"top5":8,"top10":9,"starts":14},{"pos":14,"driver":"Chuck Sweeting","cust_id":111941,"points":470,"wins":0,"top5":3,"top10":7,"starts":16},{"pos":15,"driver":"Brandon Wallace","cust_id":220155,"points":411,"wins":0,"top5":0,"top10":1,"starts":14},{"pos":16,"driver":"Bailey Turner","cust_id":246383,"points":389,"wins":2,"top5":5,"top10":8,"starts":10},{"pos":17,"driver":"Eddy Trejo","cust_id":150568,"points":371,"wins":0,"top5":0,"top10":3,"starts":12},{"pos":18,"driver":"Jonathan Cofield","cust_id":450057,"points":367,"wins":0,"top5":0,"top10":6,"starts":12},{"pos":19,"driver":"Mark Whitley","cust_id":232858,"points":362,"wins":0,"top5":6,"top10":7,"starts":10},{"pos":20,"driver":"Eric Hutton","cust_id":168563,"points":360,"wins":1,"top5":3,"top10":5,"starts":11},{"pos":21,"driver":"Michael Kostek","cust_id":610243,"points":303,"wins":0,"top5":0,"top10":6,"starts":9},{"pos":22,"driver":"Reggie Ortega","cust_id":302188,"points":300,"wins":0,"top5":0,"top10":3,"starts":10},{"pos":23,"driver":"Adam Cabot","cust_id":38050,"points":293,"wins":2,"top5":6,"top10":7,"starts":7},{"pos":24,"driver":"Seth Hatchel","cust_id":140174,"points":277,"wins":1,"top5":4,"top10":7,"starts":7},{"pos":25,"driver":"Steven L McDonald","cust_id":576615,"points":246,"wins":0,"top5":0,"top10":1,"starts":9},{"pos":26,"driver":"Jonathan Smith12","cust_id":204853,"points":242,"wins":0,"top5":1,"top10":1,"starts":8},{"pos":27,"driver":"Clifton Cockrell","cust_id":15316,"points":233,"wins":0,"top5":2,"top10":2,"starts":9},{"pos":28,"driver":"Angelo Hronis","cust_id":244261,"points":213,"wins":0,"top5":0,"top10":4,"starts":6},{"pos":29,"driver":"James Loveland","cust_id":466584,"points":161,"wins":0,"top5":0,"top10":1,"starts":6},{"pos":30,"driver":"Daniel D Cunningham","cust_id":595640,"points":157,"wins":0,"top5":0,"top10":1,"starts":5},{"pos":31,"driver":"Tim Downey","cust_id":68849,"points":148,"wins":0,"top5":0,"top10":0,"starts":6},{"pos":32,"driver":"Austin Boelke","cust_id":347666,"points":145,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":33,"driver":"Noah Michalski","cust_id":363051,"points":129,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":34,"driver":"P.J. O'Leary","cust_id":174372,"points":122,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":35,"driver":"Andy Kurtz","cust_id":554942,"points":117,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":36,"driver":"Johnathon Caddell","cust_id":18895,"points":116,"wins":0,"top5":1,"top10":3,"starts":3},{"pos":37,"driver":"Lucas Lyons","cust_id":610549,"points":103,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":38,"driver":"Eddie A. Smith","cust_id":27892,"points":97,"wins":0,"top5":1,"top10":2,"starts":3},{"pos":39,"driver":"Bryce Shoemaker","cust_id":408639,"points":93,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":40,"driver":"Charles Felts","cust_id":569438,"points":89,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":41,"driver":"Casey Lakatos","cust_id":117544,"points":83,"wins":0,"top5":0,"top10":1,"starts":3},{"pos":42,"driver":"Joel Swaim","cust_id":811914,"points":61,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":43,"driver":"Sean Langton","cust_id":489989,"points":60,"wins":0,"top5":1,"top10":1,"starts":2},{"pos":44,"driver":"Jared Swaim","cust_id":819333,"points":58,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":45,"driver":"Nicholas Starling2","cust_id":378116,"points":56,"wins":0,"top5":0,"top10":1,"starts":2},{"pos":46,"driver":"Christopher Reese3","cust_id":470444,"points":55,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":47,"driver":"Travis Bieber","cust_id":276933,"points":54,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":48,"driver":"Kirill Kononovich","cust_id":818401,"points":52,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":49,"driver":"Justin Richie","cust_id":833009,"points":49,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":50,"driver":"Andy Telgenhof","cust_id":629691,"points":47,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":51,"driver":"Levi Allsman","cust_id":708826,"points":46,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":51,"driver":"Gary W Smith","cust_id":592433,"points":46,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":53,"driver":"Brian Hennings","cust_id":740584,"points":43,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":54,"driver":"Adam D Lange","cust_id":290656,"points":38,"wins":0,"top5":0,"top10":1,"starts":1},{"pos":55,"driver":"Hunter C Johnson","cust_id":224702,"points":35,"wins":0,"top5":0,"top10":1,"starts":1},{"pos":56,"driver":"Casey Shoe","cust_id":232909,"points":34,"wins":0,"top5":0,"top10":1,"starts":1},{"pos":57,"driver":"Dustin German","cust_id":223717,"points":27,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":57,"driver":"Bentley Glaser","cust_id":22085,"points":27,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":59,"driver":"Christopher Tate2","cust_id":363800,"points":26,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":60,"driver":"Brett Bieber3","cust_id":713724,"points":23,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":61,"driver":"Aaron Gerwitz","cust_id":430787,"points":14,"wins":0,"top5":0,"top10":0,"starts":1}],"season2":[{"pos":1,"driver":"Joseph McWhorter","cust_id":239148,"points":2234,"wins":3,"top5":9,"top10":17,"starts":20},{"pos":2,"driver":"Jeff J. Wright","cust_id":130107,"points":2231,"wins":5,"top5":14,"top10":14,"starts":18},{"pos":3,"driver":"Joshua Banks","cust_id":214694,"points":2189,"wins":4,"top5":10,"top10":13,"starts":18},{"pos":4,"driver":"Alex W Bell","cust_id":112336,"points":2185,"wins":0,"top5":7,"top10":13,"starts":20},{"pos":5,"driver":"Caleb Weekley","cust_id":277666,"points":2173,"wins":0,"top5":1,"top10":4,"starts":19},{"pos":6,"driver":"Chuck Sweeting","cust_id":111941,"points":2170,"wins":0,"top5":2,"top10":7,"starts":20},{"pos":7,"driver":"Max Kost","cust_id":814229,"points":2150,"wins":0,"top5":0,"top10":1,"starts":20},{"pos":8,"driver":"Bryce Shoemaker","cust_id":408639,"points":2141,"wins":0,"top5":0,"top10":3,"starts":20},{"pos":9,"driver":"Gerry Bergeron","cust_id":303752,"points":2125,"wins":0,"top5":0,"top10":2,"starts":20},{"pos":10,"driver":"Noah Michalski","cust_id":363051,"points":2123,"wins":0,"top5":3,"top10":9,"starts":16},{"pos":11,"driver":"Ryan Carwile","cust_id":18001,"points":2115,"wins":1,"top5":5,"top10":10,"starts":16},{"pos":12,"driver":"Casey Lakatos","cust_id":117544,"points":2102,"wins":0,"top5":0,"top10":4,"starts":16},{"pos":13,"driver":"Bailey Turner","cust_id":246383,"points":584,"wins":1,"top5":10,"top10":12,"starts":15},{"pos":14,"driver":"Rhea Massey","cust_id":258136,"points":492,"wins":1,"top5":4,"top10":9,"starts":16},{"pos":15,"driver":"Chad Clinger","cust_id":181470,"points":477,"wins":1,"top5":5,"top10":7,"starts":16},{"pos":16,"driver":"Angelo Hronis","cust_id":244261,"points":465,"wins":0,"top5":4,"top10":8,"starts":14},{"pos":17,"driver":"Reggie Ortega","cust_id":302188,"points":414,"wins":1,"top5":3,"top10":8,"starts":13},{"pos":18,"driver":"Keith Shoemaker","cust_id":509126,"points":370,"wins":0,"top5":0,"top10":0,"starts":15},{"pos":19,"driver":"Austin Boelke","cust_id":347666,"points":344,"wins":0,"top5":0,"top10":0,"starts":14},{"pos":20,"driver":"A.J. Stravato","cust_id":289748,"points":337,"wins":0,"top5":3,"top10":6,"starts":10},{"pos":21,"driver":"Brandon Wallace","cust_id":220155,"points":309,"wins":0,"top5":0,"top10":1,"starts":13},{"pos":22,"driver":"Bobby Patricca","cust_id":451519,"points":282,"wins":0,"top5":0,"top10":0,"starts":11},{"pos":23,"driver":"Stefan Davis","cust_id":431949,"points":237,"wins":0,"top5":0,"top10":0,"starts":10},{"pos":24,"driver":"Mark McFadyen","cust_id":41162,"points":230,"wins":0,"top5":0,"top10":1,"starts":12},{"pos":25,"driver":"Jonathan Smith12","cust_id":204853,"points":227,"wins":0,"top5":0,"top10":1,"starts":7},{"pos":26,"driver":"Mark Whitley","cust_id":232858,"points":224,"wins":0,"top5":3,"top10":4,"starts":6},{"pos":27,"driver":"Alek Martinez","cust_id":297632,"points":207,"wins":1,"top5":4,"top10":5,"starts":5},{"pos":28,"driver":"Eric Hutton","cust_id":168563,"points":203,"wins":0,"top5":0,"top10":3,"starts":7},{"pos":29,"driver":"Phillip Brewer","cust_id":667299,"points":199,"wins":0,"top5":0,"top10":2,"starts":8},{"pos":30,"driver":"Ben D Bafford","cust_id":290639,"points":188,"wins":1,"top5":3,"top10":4,"starts":5},{"pos":31,"driver":"Jacob Bradley3","cust_id":574787,"points":183,"wins":0,"top5":1,"top10":4,"starts":5},{"pos":32,"driver":"Kyle Peacock","cust_id":955004,"points":179,"wins":0,"top5":0,"top10":0,"starts":8},{"pos":33,"driver":"Michael Sturgill","cust_id":369915,"points":178,"wins":0,"top5":3,"top10":4,"starts":5},{"pos":34,"driver":"Adam Cabot","cust_id":38050,"points":177,"wins":1,"top5":2,"top10":3,"starts":5},{"pos":35,"driver":"Eddy Trejo","cust_id":150568,"points":176,"wins":0,"top5":0,"top10":0,"starts":7},{"pos":36,"driver":"Ryan J Rose","cust_id":779385,"points":166,"wins":0,"top5":0,"top10":4,"starts":5},{"pos":37,"driver":"Brian Chambliss","cust_id":252205,"points":159,"wins":0,"top5":1,"top10":1,"starts":5},{"pos":38,"driver":"Jonny Rapp","cust_id":576262,"points":155,"wins":0,"top5":0,"top10":0,"starts":6},{"pos":39,"driver":"Gavin Pittman","cust_id":244974,"points":144,"wins":0,"top5":0,"top10":1,"starts":6},{"pos":40,"driver":"Dakota Floyd2","cust_id":439386,"points":141,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":40,"driver":"Seth Hatchel","cust_id":140174,"points":141,"wins":0,"top5":2,"top10":3,"starts":4},{"pos":42,"driver":"Brian Hennings","cust_id":740584,"points":125,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":43,"driver":"Michael Kostek","cust_id":610243,"points":113,"wins":0,"top5":0,"top10":2,"starts":4},{"pos":44,"driver":"Julio Villalobos.Jr","cust_id":93827,"points":111,"wins":0,"top5":0,"top10":1,"starts":5},{"pos":45,"driver":"Edmanuel Mendez","cust_id":386512,"points":108,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":46,"driver":"Lucas Lyons","cust_id":610549,"points":106,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":46,"driver":"Chris Sawyer4","cust_id":265550,"points":106,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":48,"driver":"Derek M Garrison","cust_id":365903,"points":99,"wins":0,"top5":0,"top10":2,"starts":3},{"pos":49,"driver":"Daniel D Cunningham","cust_id":595640,"points":97,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":50,"driver":"Jonathan Cofield","cust_id":450057,"points":92,"wins":0,"top5":1,"top10":2,"starts":3},{"pos":51,"driver":"Clark Genneken","cust_id":229578,"points":85,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":52,"driver":"Dustin German","cust_id":223717,"points":84,"wins":0,"top5":0,"top10":1,"starts":3},{"pos":53,"driver":"Eric Garrison","cust_id":371787,"points":71,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":54,"driver":"Jerry West","cust_id":249855,"points":67,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":55,"driver":"Carson Marenka","cust_id":902673,"points":58,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":56,"driver":"Daryl Young","cust_id":628061,"points":53,"wins":0,"top5":0,"top10":1,"starts":2},{"pos":57,"driver":"Brandon Phetterplace","cust_id":757151,"points":51,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":58,"driver":"Ethan E Collier","cust_id":807950,"points":49,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":59,"driver":"Brandon M Hinton","cust_id":499988,"points":48,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":60,"driver":"Christopher Melton","cust_id":46582,"points":46,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":61,"driver":"Logan Threlkeld","cust_id":291707,"points":41,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":62,"driver":"Mike George3","cust_id":1026851,"points":40,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":62,"driver":"Tyler Lehman2","cust_id":582238,"points":40,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":64,"driver":"Lee Daniel Robinson","cust_id":269540,"points":33,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":65,"driver":"Andrew Larner","cust_id":807214,"points":31,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":65,"driver":"Nicholas Starling2","cust_id":378116,"points":31,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":67,"driver":"Roger Pierce","cust_id":428255,"points":30,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":68,"driver":"Rob Denton","cust_id":1003122,"points":29,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":68,"driver":"Christopher Shea","cust_id":828356,"points":29,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":70,"driver":"Nick Alford","cust_id":267540,"points":28,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":71,"driver":"Sam Brochu","cust_id":306425,"points":27,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":72,"driver":"James Loveland","cust_id":466584,"points":25,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":73,"driver":"Brandon Buie","cust_id":56846,"points":24,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":73,"driver":"Cameron King3","cust_id":359213,"points":24,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":75,"driver":"Christian Angel","cust_id":780954,"points":23,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":76,"driver":"Jacob Emery","cust_id":637200,"points":22,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":77,"driver":"Taylor Butcher-Benjamin","cust_id":297522,"points":21,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":77,"driver":"Steven L McDonald","cust_id":576615,"points":21,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":79,"driver":"Justin Richie","cust_id":833009,"points":15,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":80,"driver":"Steve Durham","cust_id":295554,"points":-10,"wins":0,"top5":0,"top10":0,"starts":1}],"season3":[{"pos":1,"driver":"Joshua Banks","cust_id":214694,"points":1194,"wins":1,"top5":8,"top10":10,"starts":14},{"pos":2,"driver":"Jeff J. Wright","cust_id":130107,"points":1188,"wins":3,"top5":7,"top10":10,"starts":14},{"pos":3,"driver":"Ryan Carwile","cust_id":18001,"points":1171,"wins":0,"top5":4,"top10":8,"starts":14},{"pos":4,"driver":"Joseph McWhorter","cust_id":239148,"points":1159,"wins":0,"top5":4,"top10":7,"starts":15},{"pos":5,"driver":"Mark Whitley","cust_id":232858,"points":1142,"wins":1,"top5":6,"top10":8,"starts":14},{"pos":6,"driver":"Taylor Butcher-Benjamin","cust_id":297522,"points":1135,"wins":0,"top5":0,"top10":1,"starts":15},{"pos":6,"driver":"Bailey Turner","cust_id":246383,"points":1135,"wins":2,"top5":7,"top10":9,"starts":12},{"pos":8,"driver":"Eddy Trejo","cust_id":150568,"points":1129,"wins":0,"top5":0,"top10":0,"starts":14},{"pos":9,"driver":"Alex W Bell","cust_id":112336,"points":1126,"wins":1,"top5":3,"top10":9,"starts":13},{"pos":10,"driver":"Christopher Hodges","cust_id":907743,"points":1108,"wins":0,"top5":0,"top10":2,"starts":13},{"pos":11,"driver":"Jeremy E Miller","cust_id":246693,"points":1080,"wins":1,"top5":4,"top10":4,"starts":12},{"pos":12,"driver":"Eric Hutton","cust_id":168563,"points":1000,"wins":0,"top5":3,"top10":6,"starts":8},{"pos":13,"driver":"Chuck Sweeting","cust_id":111941,"points":362,"wins":0,"top5":1,"top10":6,"starts":13},{"pos":14,"driver":"Rhea Massey","cust_id":258136,"points":353,"wins":1,"top5":2,"top10":5,"starts":14},{"pos":15,"driver":"Max Kost","cust_id":814229,"points":343,"wins":0,"top5":0,"top10":0,"starts":15},{"pos":16,"driver":"Casey Lakatos","cust_id":117544,"points":332,"wins":0,"top5":1,"top10":3,"starts":12},{"pos":17,"driver":"Brian Chambliss","cust_id":252205,"points":306,"wins":0,"top5":0,"top10":3,"starts":11},{"pos":18,"driver":"Austin Boelke","cust_id":347666,"points":303,"wins":0,"top5":0,"top10":1,"starts":15},{"pos":19,"driver":"Phillip Brewer","cust_id":667299,"points":302,"wins":0,"top5":1,"top10":3,"starts":13},{"pos":20,"driver":"Bryce Shoemaker","cust_id":408639,"points":296,"wins":0,"top5":1,"top10":4,"starts":11},{"pos":20,"driver":"Caleb Weekley","cust_id":277666,"points":296,"wins":0,"top5":1,"top10":2,"starts":13},{"pos":22,"driver":"Gerry Bergeron","cust_id":303752,"points":275,"wins":0,"top5":0,"top10":1,"starts":11},{"pos":23,"driver":"Mark McFadyen","cust_id":41162,"points":261,"wins":0,"top5":0,"top10":0,"starts":13},{"pos":24,"driver":"Reggie Ortega","cust_id":302188,"points":238,"wins":0,"top5":2,"top10":4,"starts":9},{"pos":25,"driver":"Dakota Floyd2","cust_id":439386,"points":232,"wins":0,"top5":0,"top10":1,"starts":12},{"pos":26,"driver":"Angelo Hronis","cust_id":244261,"points":227,"wins":0,"top5":0,"top10":4,"starts":9},{"pos":27,"driver":"A.J. Stravato","cust_id":289748,"points":212,"wins":1,"top5":3,"top10":3,"starts":8},{"pos":28,"driver":"Brandon Wallace","cust_id":220155,"points":205,"wins":0,"top5":0,"top10":0,"starts":11},{"pos":29,"driver":"Matthew Radford","cust_id":1062794,"points":200,"wins":0,"top5":1,"top10":1,"starts":10},{"pos":30,"driver":"Noah Michalski","cust_id":363051,"points":189,"wins":0,"top5":0,"top10":1,"starts":10},{"pos":31,"driver":"Kenny Kibbey","cust_id":286465,"points":188,"wins":0,"top5":2,"top10":4,"starts":5},{"pos":32,"driver":"Kyle Peacock","cust_id":955004,"points":183,"wins":0,"top5":0,"top10":2,"starts":10},{"pos":33,"driver":"Jonathan Smith12","cust_id":204853,"points":181,"wins":0,"top5":0,"top10":2,"starts":9},{"pos":34,"driver":"Chad Clinger","cust_id":181470,"points":176,"wins":1,"top5":1,"top10":3,"starts":8},{"pos":34,"driver":"Michael Sturgill","cust_id":369915,"points":176,"wins":0,"top5":1,"top10":2,"starts":6},{"pos":34,"driver":"Logan Threlkeld","cust_id":291707,"points":176,"wins":0,"top5":0,"top10":1,"starts":8},{"pos":37,"driver":"Keith Shoemaker","cust_id":509126,"points":166,"wins":0,"top5":0,"top10":0,"starts":9},{"pos":38,"driver":"Matt Shinoski","cust_id":167746,"points":141,"wins":0,"top5":0,"top10":1,"starts":5},{"pos":39,"driver":"Aaron Smith II","cust_id":212706,"points":139,"wins":2,"top5":2,"top10":2,"starts":5},{"pos":40,"driver":"Seth Hatchel","cust_id":140174,"points":131,"wins":0,"top5":2,"top10":2,"starts":5},{"pos":41,"driver":"Nick F Wood","cust_id":459240,"points":128,"wins":0,"top5":0,"top10":0,"starts":7},{"pos":42,"driver":"Ben D Bafford","cust_id":290639,"points":124,"wins":0,"top5":1,"top10":1,"starts":5},{"pos":42,"driver":"Alek Martinez","cust_id":297632,"points":124,"wins":0,"top5":3,"top10":3,"starts":3},{"pos":42,"driver":"Benjamin Richards","cust_id":602763,"points":124,"wins":0,"top5":0,"top10":1,"starts":7},{"pos":45,"driver":"Stefan Davis","cust_id":431949,"points":114,"wins":0,"top5":0,"top10":0,"starts":7},{"pos":46,"driver":"Mikal Jones","cust_id":1002216,"points":112,"wins":0,"top5":0,"top10":0,"starts":8},{"pos":46,"driver":"J R Shepherd","cust_id":218210,"points":112,"wins":0,"top5":1,"top10":3,"starts":3},{"pos":48,"driver":"Adam Cabot","cust_id":38050,"points":111,"wins":1,"top5":2,"top10":2,"starts":3},{"pos":49,"driver":"Enathian Ferrada","cust_id":325310,"points":103,"wins":0,"top5":0,"top10":1,"starts":6},{"pos":50,"driver":"Bobby Patricca","cust_id":451519,"points":98,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":51,"driver":"Rob Denton","cust_id":1003122,"points":80,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":52,"driver":"Derek M Garrison","cust_id":365903,"points":77,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":53,"driver":"Brian Hennings","cust_id":740584,"points":75,"wins":0,"top5":1,"top10":1,"starts":4},{"pos":54,"driver":"Justin Richie","cust_id":833009,"points":71,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":55,"driver":"Joe Spinelli","cust_id":792293,"points":70,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":56,"driver":"Morgan Cook2","cust_id":577887,"points":66,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":57,"driver":"John Seniw","cust_id":317908,"points":54,"wins":0,"top5":0,"top10":1,"starts":3},{"pos":58,"driver":"Rob Hamp","cust_id":489206,"points":53,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":59,"driver":"Christian Angel","cust_id":780954,"points":41,"wins":0,"top5":0,"top10":1,"starts":2},{"pos":60,"driver":"Clark Genneken","cust_id":229578,"points":38,"wins":0,"top5":0,"top10":1,"starts":1},{"pos":61,"driver":"Jonny Rapp","cust_id":576262,"points":37,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":62,"driver":"Benjamin Garrity","cust_id":987210,"points":25,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":62,"driver":"Storm Patterson","cust_id":279069,"points":25,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":64,"driver":"Ben Laughter","cust_id":147818,"points":24,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":65,"driver":"Julio Villalobos.Jr","cust_id":93827,"points":22,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":66,"driver":"Kenny Fuller","cust_id":956767,"points":20,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":66,"driver":"Eric Garrison","cust_id":371787,"points":20,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":68,"driver":"Michael Muncy","cust_id":66480,"points":19,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":69,"driver":"Dallas Seiwert","cust_id":811603,"points":14,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":70,"driver":"Jace Kully","cust_id":362319,"points":9,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":70,"driver":"Jordan Traas","cust_id":979368,"points":9,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":72,"driver":"Jeffrey K Allen","cust_id":450093,"points":4,"wins":0,"top5":0,"top10":0,"starts":1}],"season4":[{"pos":1,"driver":"Bailey Turner","cust_id":246383,"points":2212,"wins":7,"top5":13,"top10":13,"starts":18},{"pos":2,"driver":"Joshua L Adams","cust_id":197210,"points":2191,"wins":2,"top5":6,"top10":10,"starts":17},{"pos":3,"driver":"Ryan Carwile","cust_id":18001,"points":2186,"wins":1,"top5":5,"top10":12,"starts":18},{"pos":4,"driver":"J R Shepherd","cust_id":218210,"points":2171,"wins":0,"top5":4,"top10":8,"starts":19},{"pos":5,"driver":"Dakota Floyd2","cust_id":439386,"points":2168,"wins":0,"top5":4,"top10":9,"starts":17},{"pos":6,"driver":"Nicholas Hapiak2","cust_id":624842,"points":2153,"wins":0,"top5":3,"top10":8,"starts":19},{"pos":7,"driver":"Kenny Kibbey","cust_id":286465,"points":2147,"wins":0,"top5":4,"top10":9,"starts":19},{"pos":8,"driver":"Casey Lakatos","cust_id":117544,"points":2142,"wins":0,"top5":2,"top10":5,"starts":17},{"pos":9,"driver":"Max Kost","cust_id":814229,"points":2141,"wins":0,"top5":0,"top10":2,"starts":19},{"pos":9,"driver":"Jeff J. Wright","cust_id":130107,"points":2141,"wins":1,"top5":7,"top10":9,"starts":18},{"pos":11,"driver":"Angelo Hronis","cust_id":244261,"points":2140,"wins":0,"top5":1,"top10":9,"starts":17},{"pos":11,"driver":"Caleb Weekley","cust_id":277666,"points":2140,"wins":0,"top5":0,"top10":1,"starts":19},{"pos":13,"driver":"Donald Kight","cust_id":796915,"points":2138,"wins":1,"top5":2,"top10":6,"starts":18},{"pos":14,"driver":"Matt Shinoski","cust_id":167746,"points":2124,"wins":0,"top5":0,"top10":2,"starts":19},{"pos":15,"driver":"Chad Clinger","cust_id":181470,"points":2118,"wins":1,"top5":6,"top10":11,"starts":18},{"pos":16,"driver":"Adam Cabot","cust_id":38050,"points":2097,"wins":3,"top5":9,"top10":10,"starts":11},{"pos":17,"driver":"Christopher Hodges","cust_id":907743,"points":443,"wins":0,"top5":2,"top10":2,"starts":18},{"pos":18,"driver":"Julio Villalobos.Jr","cust_id":93827,"points":441,"wins":0,"top5":2,"top10":4,"starts":17},{"pos":19,"driver":"Austin Boelke","cust_id":347666,"points":420,"wins":0,"top5":0,"top10":1,"starts":19},{"pos":20,"driver":"Brian Chambliss","cust_id":252205,"points":405,"wins":1,"top5":1,"top10":3,"starts":15},{"pos":21,"driver":"Bryce Shoemaker","cust_id":408639,"points":380,"wins":0,"top5":1,"top10":3,"starts":17},{"pos":22,"driver":"A.J. Stravato","cust_id":289748,"points":349,"wins":1,"top5":4,"top10":7,"starts":12},{"pos":23,"driver":"Joseph McWhorter","cust_id":239148,"points":313,"wins":0,"top5":0,"top10":3,"starts":17},{"pos":24,"driver":"Rhea Massey","cust_id":258136,"points":311,"wins":0,"top5":0,"top10":2,"starts":14},{"pos":25,"driver":"Elliott Butler","cust_id":138725,"points":298,"wins":0,"top5":1,"top10":3,"starts":13},{"pos":26,"driver":"Brandon Wallace","cust_id":220155,"points":285,"wins":0,"top5":0,"top10":0,"starts":17},{"pos":27,"driver":"Stefan Davis","cust_id":431949,"points":284,"wins":0,"top5":0,"top10":1,"starts":15},{"pos":28,"driver":"Joshua Banks","cust_id":214694,"points":283,"wins":0,"top5":2,"top10":3,"starts":14},{"pos":29,"driver":"Keith Shoemaker","cust_id":509126,"points":266,"wins":0,"top5":0,"top10":0,"starts":15},{"pos":30,"driver":"Eddy Trejo","cust_id":150568,"points":248,"wins":0,"top5":0,"top10":0,"starts":13},{"pos":31,"driver":"Reggie Ortega","cust_id":302188,"points":244,"wins":0,"top5":1,"top10":3,"starts":11},{"pos":32,"driver":"Logan Threlkeld","cust_id":291707,"points":236,"wins":0,"top5":1,"top10":1,"starts":15},{"pos":33,"driver":"Nick F Wood","cust_id":459240,"points":220,"wins":0,"top5":0,"top10":0,"starts":13},{"pos":34,"driver":"James Lehman","cust_id":143053,"points":216,"wins":0,"top5":0,"top10":2,"starts":14},{"pos":35,"driver":"Alek Martinez","cust_id":297632,"points":198,"wins":0,"top5":2,"top10":5,"starts":6},{"pos":36,"driver":"Andy Telgenhof","cust_id":629691,"points":190,"wins":0,"top5":2,"top10":2,"starts":8},{"pos":37,"driver":"Rob Hamp","cust_id":489206,"points":188,"wins":0,"top5":1,"top10":1,"starts":15},{"pos":38,"driver":"Ben Laughter","cust_id":147818,"points":173,"wins":0,"top5":0,"top10":2,"starts":8},{"pos":39,"driver":"Mike Sturgill","cust_id":425843,"points":145,"wins":0,"top5":0,"top10":0,"starts":8},{"pos":40,"driver":"Phillip Brewer","cust_id":667299,"points":130,"wins":0,"top5":0,"top10":0,"starts":11},{"pos":41,"driver":"Noah Michalski","cust_id":363051,"points":128,"wins":0,"top5":0,"top10":1,"starts":7},{"pos":42,"driver":"Ben D Bafford","cust_id":290639,"points":124,"wins":0,"top5":2,"top10":2,"starts":5},{"pos":42,"driver":"Hunter Senior","cust_id":602637,"points":124,"wins":0,"top5":0,"top10":2,"starts":4},{"pos":44,"driver":"Lucas Lyons","cust_id":610549,"points":114,"wins":0,"top5":1,"top10":1,"starts":4},{"pos":45,"driver":"Rob Denton","cust_id":1003122,"points":113,"wins":0,"top5":0,"top10":0,"starts":12},{"pos":46,"driver":"Mark McFadyen","cust_id":41162,"points":106,"wins":0,"top5":0,"top10":0,"starts":10},{"pos":47,"driver":"Joseph Solivan","cust_id":611599,"points":82,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":48,"driver":"Jared Skinner","cust_id":1017430,"points":81,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":49,"driver":"Oskar Jensen","cust_id":348409,"points":74,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":50,"driver":"Brian Hennings","cust_id":740584,"points":68,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":51,"driver":"Tyler Dohar","cust_id":682194,"points":66,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":52,"driver":"Seth Hatchel","cust_id":140174,"points":57,"wins":0,"top5":1,"top10":1,"starts":2},{"pos":53,"driver":"Jeremy E Miller","cust_id":246693,"points":56,"wins":0,"top5":1,"top10":1,"starts":2},{"pos":54,"driver":"Morgan Lilly","cust_id":680116,"points":55,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":55,"driver":"Benjamin Richards","cust_id":602763,"points":54,"wins":0,"top5":0,"top10":0,"starts":6},{"pos":56,"driver":"Clark Genneken","cust_id":229578,"points":50,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":57,"driver":"Broderick Vaclavik","cust_id":746227,"points":46,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":58,"driver":"Alex W Bell","cust_id":112336,"points":41,"wins":0,"top5":1,"top10":1,"starts":1},{"pos":59,"driver":"John Seniw","cust_id":317908,"points":39,"wins":0,"top5":0,"top10":1,"starts":3},{"pos":60,"driver":"Jonny Rapp","cust_id":576262,"points":35,"wins":0,"top5":0,"top10":1,"starts":1},{"pos":61,"driver":"Kyle Peacock","cust_id":955004,"points":32,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":62,"driver":"Justin Richie","cust_id":833009,"points":20,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":63,"driver":"Jordan Traas","cust_id":979368,"points":19,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":64,"driver":"Michael Sturgill","cust_id":369915,"points":-147,"wins":1,"top5":3,"top10":6,"starts":11}],"season5":[{"pos":1,"driver":"Jeff J. Wright","cust_id":130107,"points":2227,"wins":7,"top5":9,"top10":12,"starts":16},{"pos":2,"driver":"Kenny Kibbey","cust_id":286465,"points":2203,"wins":1,"top5":6,"top10":10,"starts":15},{"pos":3,"driver":"J R Shepherd","cust_id":218210,"points":2168,"wins":1,"top5":7,"top10":9,"starts":17},{"pos":4,"driver":"Joshua Banks","cust_id":214694,"points":2166,"wins":4,"top5":10,"top10":10,"starts":17},{"pos":5,"driver":"Chuck Sweeting","cust_id":111941,"points":2161,"wins":0,"top5":3,"top10":9,"starts":17},{"pos":6,"driver":"Elliott Butler","cust_id":138725,"points":2159,"wins":0,"top5":0,"top10":5,"starts":17},{"pos":7,"driver":"Brandon Wallace","cust_id":220155,"points":2153,"wins":0,"top5":1,"top10":1,"starts":17},{"pos":8,"driver":"Dakota Floyd2","cust_id":439386,"points":2139,"wins":0,"top5":3,"top10":4,"starts":16},{"pos":9,"driver":"Matt Shinoski","cust_id":167746,"points":2106,"wins":0,"top5":0,"top10":4,"starts":16},{"pos":10,"driver":"Nicholas Hapiak2","cust_id":624842,"points":2104,"wins":0,"top5":0,"top10":10,"starts":14},{"pos":11,"driver":"Caleb Weekley","cust_id":277666,"points":2103,"wins":0,"top5":0,"top10":1,"starts":14},{"pos":12,"driver":"Christopher Hodges","cust_id":907743,"points":2101,"wins":0,"top5":1,"top10":4,"starts":16},{"pos":13,"driver":"Bailey Turner","cust_id":246383,"points":2085,"wins":1,"top5":7,"top10":10,"starts":14},{"pos":14,"driver":"Joseph McWhorter","cust_id":239148,"points":2078,"wins":0,"top5":5,"top10":9,"starts":15},{"pos":15,"driver":"Angelo Hronis","cust_id":244261,"points":2067,"wins":0,"top5":2,"top10":5,"starts":14},{"pos":16,"driver":"Hunter Senior","cust_id":602637,"points":2032,"wins":0,"top5":1,"top10":5,"starts":12},{"pos":17,"driver":"Austin Boelke","cust_id":347666,"points":391,"wins":0,"top5":1,"top10":1,"starts":15},{"pos":18,"driver":"Casey Lakatos","cust_id":117544,"points":382,"wins":0,"top5":2,"top10":4,"starts":12},{"pos":19,"driver":"Ryan Carwile","cust_id":18001,"points":377,"wins":0,"top5":2,"top10":5,"starts":13},{"pos":20,"driver":"Chad Clinger","cust_id":181470,"points":344,"wins":1,"top5":3,"top10":5,"starts":15},{"pos":21,"driver":"Bryce Shoemaker","cust_id":408639,"points":339,"wins":0,"top5":0,"top10":4,"starts":12},{"pos":22,"driver":"Ben Laughter","cust_id":147818,"points":334,"wins":0,"top5":0,"top10":2,"starts":14},{"pos":23,"driver":"Eddy Trejo","cust_id":150568,"points":317,"wins":0,"top5":0,"top10":0,"starts":13},{"pos":24,"driver":"Bryce Kalusa","cust_id":179923,"points":282,"wins":0,"top5":3,"top10":4,"starts":12},{"pos":25,"driver":"Phillip Brewer","cust_id":667299,"points":273,"wins":0,"top5":3,"top10":3,"starts":12},{"pos":26,"driver":"Brian Chambliss","cust_id":252205,"points":258,"wins":0,"top5":1,"top10":1,"starts":9},{"pos":26,"driver":"Rhea Massey","cust_id":258136,"points":258,"wins":0,"top5":1,"top10":2,"starts":11},{"pos":28,"driver":"James Lehman","cust_id":143053,"points":256,"wins":0,"top5":0,"top10":2,"starts":11},{"pos":29,"driver":"Stefan Davis","cust_id":431949,"points":244,"wins":0,"top5":0,"top10":1,"starts":12},{"pos":30,"driver":"A.J. Stravato","cust_id":289748,"points":232,"wins":0,"top5":3,"top10":4,"starts":9},{"pos":31,"driver":"Donald Kight","cust_id":796915,"points":216,"wins":0,"top5":1,"top10":2,"starts":9},{"pos":32,"driver":"Enathian Ferrada","cust_id":325310,"points":209,"wins":1,"top5":2,"top10":3,"starts":8},{"pos":33,"driver":"Joshua L Adams","cust_id":197210,"points":201,"wins":0,"top5":1,"top10":2,"starts":11},{"pos":34,"driver":"Max Kost","cust_id":814229,"points":189,"wins":0,"top5":0,"top10":1,"starts":8},{"pos":35,"driver":"Jeremy E Miller","cust_id":246693,"points":164,"wins":0,"top5":1,"top10":3,"starts":6},{"pos":36,"driver":"Keith Shoemaker","cust_id":509126,"points":163,"wins":0,"top5":0,"top10":0,"starts":10},{"pos":37,"driver":"Reggie Ortega","cust_id":302188,"points":150,"wins":0,"top5":2,"top10":2,"starts":7},{"pos":38,"driver":"Seth Hatchel","cust_id":140174,"points":140,"wins":0,"top5":1,"top10":1,"starts":6},{"pos":39,"driver":"Broderick Vaclavik","cust_id":746227,"points":137,"wins":1,"top5":1,"top10":1,"starts":4},{"pos":40,"driver":"Jared Skinner","cust_id":1017430,"points":132,"wins":0,"top5":0,"top10":0,"starts":6},{"pos":41,"driver":"Craig Martin9","cust_id":512667,"points":117,"wins":0,"top5":0,"top10":2,"starts":4},{"pos":42,"driver":"Andy Telgenhof","cust_id":629691,"points":90,"wins":0,"top5":1,"top10":1,"starts":5},{"pos":43,"driver":"Benjamin Richards","cust_id":602763,"points":80,"wins":0,"top5":0,"top10":1,"starts":4},{"pos":44,"driver":"Adam Cabot","cust_id":38050,"points":72,"wins":0,"top5":1,"top10":1,"starts":3},{"pos":45,"driver":"Jacob Locklear","cust_id":365094,"points":70,"wins":0,"top5":0,"top10":1,"starts":2},{"pos":46,"driver":"Noah Michalski","cust_id":363051,"points":64,"wins":0,"top5":0,"top10":1,"starts":3},{"pos":47,"driver":"Julio Villalobos.Jr","cust_id":93827,"points":58,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":48,"driver":"Mark McFadyen","cust_id":41162,"points":57,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":49,"driver":"Rob Hamp","cust_id":489206,"points":53,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":50,"driver":"Kyle Taub","cust_id":704585,"points":41,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":51,"driver":"Ethan E Collier","cust_id":807950,"points":39,"wins":0,"top5":0,"top10":1,"starts":2},{"pos":52,"driver":"John Seniw","cust_id":317908,"points":35,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":53,"driver":"Jordan Traas","cust_id":979368,"points":34,"wins":0,"top5":0,"top10":1,"starts":1},{"pos":54,"driver":"Rob Denton","cust_id":1003122,"points":27,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":55,"driver":"Mark Cofield","cust_id":971935,"points":21,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":56,"driver":"Logan Threlkeld","cust_id":291707,"points":18,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":57,"driver":"Mikal Jones","cust_id":1002216,"points":15,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":58,"driver":"Jonathan Smith12","cust_id":204853,"points":12,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":59,"driver":"Kyle Peacock","cust_id":955004,"points":6,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":60,"driver":"Matt Dominique","cust_id":48994,"points":5,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":61,"driver":"Lucas Lyons","cust_id":610549,"points":4,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":62,"driver":"Michael Muncy","cust_id":66480,"points":3,"wins":0,"top5":0,"top10":0,"starts":1}],"season6":[{"pos":1,"driver":"Joshua Banks","cust_id":214694,"points":2240,"wins":5,"top5":13,"top10":15,"starts":20},{"pos":2,"driver":"Bailey Turner","cust_id":246383,"points":2235,"wins":4,"top5":14,"top10":17,"starts":21},{"pos":3,"driver":"Phillip Brewer","cust_id":667299,"points":2202,"wins":1,"top5":7,"top10":13,"starts":22},{"pos":4,"driver":"Jeff J. Wright","cust_id":130107,"points":2197,"wins":6,"top5":9,"top10":13,"starts":20},{"pos":5,"driver":"J R Shepherd","cust_id":218210,"points":2189,"wins":0,"top5":8,"top10":13,"starts":22},{"pos":6,"driver":"Kenny Kibbey","cust_id":286465,"points":2174,"wins":0,"top5":8,"top10":13,"starts":22},{"pos":7,"driver":"Dakota Floyd2","cust_id":439386,"points":2168,"wins":0,"top5":4,"top10":8,"starts":21},{"pos":8,"driver":"Elliott Butler","cust_id":138725,"points":2161,"wins":1,"top5":4,"top10":8,"starts":22},{"pos":9,"driver":"A.J. Stravato","cust_id":289748,"points":2154,"wins":3,"top5":11,"top10":15,"starts":20},{"pos":10,"driver":"Angelo Hronis","cust_id":244261,"points":2140,"wins":0,"top5":2,"top10":8,"starts":20},{"pos":11,"driver":"Justin Richie","cust_id":833009,"points":2126,"wins":0,"top5":0,"top10":8,"starts":21},{"pos":12,"driver":"Chuck Sweeting","cust_id":111941,"points":2120,"wins":0,"top5":1,"top10":3,"starts":22},{"pos":13,"driver":"Caleb Weekley","cust_id":277666,"points":2103,"wins":0,"top5":1,"top10":5,"starts":20},{"pos":14,"driver":"Seth Hatchel","cust_id":140174,"points":2088,"wins":0,"top5":4,"top10":15,"starts":19},{"pos":15,"driver":"Bryce Shoemaker","cust_id":408639,"points":549,"wins":0,"top5":0,"top10":4,"starts":21},{"pos":16,"driver":"Christopher Hodges","cust_id":907743,"points":518,"wins":0,"top5":1,"top10":2,"starts":21},{"pos":17,"driver":"Casey Lakatos","cust_id":117544,"points":510,"wins":0,"top5":0,"top10":3,"starts":22},{"pos":18,"driver":"Ben Laughter","cust_id":147818,"points":455,"wins":0,"top5":0,"top10":4,"starts":21},{"pos":19,"driver":"Austin Boelke","cust_id":347666,"points":442,"wins":0,"top5":0,"top10":2,"starts":19},{"pos":20,"driver":"Matt Shinoski","cust_id":167746,"points":439,"wins":0,"top5":0,"top10":1,"starts":19},{"pos":21,"driver":"Ryan Carwile","cust_id":18001,"points":425,"wins":0,"top5":2,"top10":7,"starts":15},{"pos":22,"driver":"Rhea Massey","cust_id":258136,"points":411,"wins":0,"top5":2,"top10":4,"starts":17},{"pos":23,"driver":"Brandon Wallace","cust_id":220155,"points":408,"wins":0,"top5":0,"top10":1,"starts":20},{"pos":24,"driver":"Adam Cabot","cust_id":38050,"points":399,"wins":0,"top5":8,"top10":9,"starts":11},{"pos":25,"driver":"Max Kost","cust_id":814229,"points":382,"wins":0,"top5":0,"top10":0,"starts":17},{"pos":26,"driver":"Chad Clinger","cust_id":181470,"points":378,"wins":0,"top5":2,"top10":5,"starts":18},{"pos":27,"driver":"Stefan Davis","cust_id":431949,"points":376,"wins":0,"top5":1,"top10":1,"starts":18},{"pos":28,"driver":"Reggie Ortega","cust_id":302188,"points":363,"wins":0,"top5":1,"top10":6,"starts":15},{"pos":29,"driver":"Broderick Vaclavik","cust_id":746227,"points":336,"wins":0,"top5":0,"top10":0,"starts":18},{"pos":30,"driver":"Rob Hamp","cust_id":489206,"points":313,"wins":0,"top5":1,"top10":2,"starts":17},{"pos":31,"driver":"Tim Shinoski","cust_id":216199,"points":297,"wins":0,"top5":0,"top10":0,"starts":16},{"pos":32,"driver":"Noah Michalski","cust_id":363051,"points":296,"wins":0,"top5":1,"top10":2,"starts":12},{"pos":33,"driver":"Keith Shoemaker","cust_id":509126,"points":281,"wins":0,"top5":0,"top10":0,"starts":17},{"pos":34,"driver":"Enathian Ferrada","cust_id":325310,"points":280,"wins":0,"top5":1,"top10":4,"starts":12},{"pos":35,"driver":"Brian Chambliss","cust_id":252205,"points":278,"wins":0,"top5":0,"top10":0,"starts":14},{"pos":36,"driver":"Andy Telgenhof","cust_id":629691,"points":269,"wins":2,"top5":2,"top10":3,"starts":8},{"pos":37,"driver":"Mikal Jones","cust_id":1002216,"points":249,"wins":0,"top5":1,"top10":1,"starts":15},{"pos":38,"driver":"Eldon Stewart IV","cust_id":903802,"points":232,"wins":0,"top5":0,"top10":1,"starts":14},{"pos":39,"driver":"John Seniw","cust_id":317908,"points":168,"wins":0,"top5":0,"top10":0,"starts":14},{"pos":40,"driver":"Derek M Garrison","cust_id":365903,"points":140,"wins":0,"top5":0,"top10":1,"starts":5},{"pos":41,"driver":"Kyle Peacock","cust_id":955004,"points":118,"wins":0,"top5":0,"top10":0,"starts":5},{"pos":42,"driver":"Justin Carey2","cust_id":342569,"points":100,"wins":0,"top5":0,"top10":1,"starts":5},{"pos":43,"driver":"James Lehman","cust_id":143053,"points":93,"wins":0,"top5":0,"top10":1,"starts":7},{"pos":44,"driver":"Bryan Dehn","cust_id":114727,"points":89,"wins":0,"top5":0,"top10":0,"starts":4},{"pos":45,"driver":"Mark McFadyen","cust_id":41162,"points":83,"wins":0,"top5":0,"top10":0,"starts":7},{"pos":46,"driver":"Justin Michael","cust_id":175503,"points":48,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":47,"driver":"Joseph McWhorter","cust_id":239148,"points":42,"wins":0,"top5":1,"top10":1,"starts":2},{"pos":48,"driver":"Wyatt Hayes","cust_id":1400448,"points":33,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":49,"driver":"Logan Threlkeld","cust_id":291707,"points":26,"wins":0,"top5":0,"top10":0,"starts":3},{"pos":50,"driver":"Christian Key","cust_id":1250352,"points":17,"wins":0,"top5":0,"top10":0,"starts":2},{"pos":51,"driver":"Julio Villalobos.Jr","cust_id":93827,"points":15,"wins":0,"top5":0,"top10":0,"starts":1},{"pos":52,"driver":"Logan Watern","cust_id":939364,"points":4,"wins":0,"top5":0,"top10":0,"starts":1}]};

const trackStatsData = {"Atlanta Motor Speedway (2008)":[{"driver":"Jeff J. Wright","wins":1,"poles":2,"top5":3,"top10":4,"starts":5,"laps_led":291},{"driver":"Chad Clinger","wins":1,"poles":1,"top5":2,"top10":3,"starts":5,"laps_led":8},{"driver":"Rhea Massey","wins":1,"poles":0,"top5":2,"top10":3,"starts":4,"laps_led":21},{"driver":"Brian Chambliss","wins":1,"poles":0,"top5":2,"top10":2,"starts":4,"laps_led":12},{"driver":"Ryan Carwile","wins":1,"poles":0,"top5":2,"top10":2,"starts":4,"laps_led":49},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":2,"top10":3,"starts":3,"laps_led":91},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":2,"top10":2,"starts":5,"laps_led":28},{"driver":"Alek Martinez","wins":0,"poles":0,"top5":1,"top10":3,"starts":3,"laps_led":2},{"driver":"Dakota Floyd","wins":0,"poles":0,"top5":1,"top10":2,"starts":4,"laps_led":0},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0}],"Auto Club Speedway":[{"driver":"Bailey Turner","wins":3,"poles":0,"top5":5,"top10":5,"starts":5,"laps_led":42},{"driver":"Jeff J. Wright","wins":2,"poles":1,"top5":5,"top10":6,"starts":6,"laps_led":245},{"driver":"Joseph McWhorter","wins":1,"poles":0,"top5":1,"top10":2,"starts":5,"laps_led":18},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":3,"top10":3,"starts":6,"laps_led":94},{"driver":"Angelo Hronis","wins":0,"poles":1,"top5":2,"top10":3,"starts":5,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":67},{"driver":"J R Shepherd","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":13},{"driver":"Adam Cabot","wins":0,"poles":0,"top5":1,"top10":3,"starts":3,"laps_led":7},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":2,"starts":6,"laps_led":1},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":1}],"Bristol Motor Speedway":[{"driver":"Joshua Banks","wins":1,"poles":1,"top5":3,"top10":3,"starts":4,"laps_led":190},{"driver":"Bailey Turner","wins":1,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":238},{"driver":"Joseph McWhorter","wins":1,"poles":0,"top5":2,"top10":2,"starts":4,"laps_led":29},{"driver":"Rhea Massey","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":19},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":2,"top10":3,"starts":4,"laps_led":0},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":11},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":190},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":0},{"driver":"Adam Cabot","wins":0,"poles":1,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Bryce Shoemaker","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0}],"Canadian Tire Motorsports Park":[{"driver":"A.J. Stravato","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":15},{"driver":"Adam Cabot","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"J R Shepherd","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":18},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Ben Laughter","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Casey Lakatos","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Charlotte Motor Speedway":[{"driver":"Enathian Ferrada","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1},{"driver":"Joshua L Adams","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":10},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":1},{"driver":"Joseph McWhorter","wins":0,"poles":1,"top5":1,"top10":2,"starts":2,"laps_led":141},{"driver":"Nicholas Hapiak","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":108},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Reggie Ortega","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":5},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":34}],"Chicagoland Speedway":[{"driver":"Jeff J. Wright","wins":2,"poles":1,"top5":3,"top10":3,"starts":4,"laps_led":202},{"driver":"Joshua Banks","wins":1,"poles":0,"top5":3,"top10":3,"starts":5,"laps_led":83},{"driver":"Bailey Turner","wins":1,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":36},{"driver":"Rhea Massey","wins":1,"poles":0,"top5":1,"top10":2,"starts":5,"laps_led":1},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":3,"top10":3,"starts":5,"laps_led":74},{"driver":"A.J. Stravato","wins":0,"poles":1,"top5":2,"top10":3,"starts":5,"laps_led":4},{"driver":"Adam Cabot","wins":0,"poles":1,"top5":2,"top10":2,"starts":2,"laps_led":79},{"driver":"J R Shepherd","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":5},{"driver":"Mark Whitley","wins":0,"poles":1,"top5":2,"top10":2,"starts":3,"laps_led":59},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":4,"starts":5,"laps_led":2}],"Darlington Raceway":[{"driver":"Jeff J. Wright","wins":2,"poles":1,"top5":2,"top10":2,"starts":3,"laps_led":245},{"driver":"Joshua Banks","wins":1,"poles":0,"top5":3,"top10":4,"starts":4,"laps_led":133},{"driver":"Adam Cabot","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":95},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":2,"top10":3,"starts":3,"laps_led":30},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":0},{"driver":"J R Shepherd","wins":0,"poles":0,"top5":1,"top10":3,"starts":3,"laps_led":1},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":3},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":1,"top10":2,"starts":4,"laps_led":3},{"driver":"Andy Telgenhof","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Chad Clinger","wins":0,"poles":1,"top5":1,"top10":1,"starts":3,"laps_led":29},{"driver":"Enathian Ferrada","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Stefan Davis","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Caleb Weekley","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Austin Boelke","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Justin Carey2","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Phillip Brewer","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Bryan Dehn","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Broderick Vaclavik","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Max Kost","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Casey Lakatos","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Tim Shinoski","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Ben Laughter","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Justin Richie","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Noah Michalski","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"John Seniw","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Matt Shinoski","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Mark McFadyen","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"James Lehman","wins":0,"poles":1,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":1},{"driver":"Rob Hamp","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Dakota Floyd2","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Brandon Wallace","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Mikal Jones","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Brian Chambliss","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Christopher Hodges","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Eldon Stewart2","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Elliott Butler","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Bryce Shoemaker","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0},{"driver":"Keith Shoemaker","wins":0,"poles":0,"top5":0,"top10":0,"starts":1,"laps_led":0}],"Daytona International Speedway":[{"driver":"Bailey Turner","wins":3,"poles":0,"top5":3,"top10":3,"starts":4,"laps_led":36},{"driver":"Reggie Ortega","wins":1,"poles":0,"top5":2,"top10":4,"starts":6,"laps_led":5},{"driver":"Eric Hutton","wins":1,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":4},{"driver":"Andy Telgenhof","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":8},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":3,"top10":3,"starts":6,"laps_led":57},{"driver":"Adam Cabot","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":30},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":2,"top10":2,"starts":6,"laps_led":20},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":2,"top10":2,"starts":4,"laps_led":31},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":3,"starts":3,"laps_led":4},{"driver":"Noah Michalski","wins":0,"poles":0,"top5":1,"top10":3,"starts":5,"laps_led":10}],"Dover Motor Speedway":[{"driver":"Adam Cabot","wins":2,"poles":1,"top5":2,"top10":2,"starts":3,"laps_led":241},{"driver":"Joshua Banks","wins":1,"poles":0,"top5":3,"top10":4,"starts":4,"laps_led":104},{"driver":"Jeff J. Wright","wins":1,"poles":2,"top5":2,"top10":3,"starts":5,"laps_led":214},{"driver":"Alek Martinez","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":45},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":3,"top10":3,"starts":4,"laps_led":18},{"driver":"Mark Whitley","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":1,"top10":2,"starts":4,"laps_led":53},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":2,"starts":4,"laps_led":1},{"driver":"J R Shepherd","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":2},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0}],"Homestead-Miami Speedway":[{"driver":"Ryan Carwile","wins":1,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":27},{"driver":"Jeff J. Wright","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":89},{"driver":"Alex W Bell","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":22},{"driver":"Christopher Hodges","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Dakota Floyd","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1},{"driver":"Joshua L Adams","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":34},{"driver":"Nicholas Hapiak","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":30},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":1},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1}],"Indianapolis Motor Speedway":[{"driver":"A.J. Stravato","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":5},{"driver":"Alek Martinez","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Eric Hutton","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":6},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":3},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Brian Chambliss","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Christopher Hodges","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":33},{"driver":"Mark Whitley","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Iowa Speedway":[{"driver":"Jeff J. Wright","wins":2,"poles":1,"top5":4,"top10":4,"starts":4,"laps_led":415},{"driver":"Joshua L Adams","wins":1,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":52},{"driver":"Michael Sturgill","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":8},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":3,"top10":4,"starts":4,"laps_led":70},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":0},{"driver":"Joseph McWhorter","wins":0,"poles":1,"top5":1,"top10":3,"starts":4,"laps_led":66},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":3},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":1,"top10":2,"starts":3,"laps_led":3},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Ben D Bafford","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0}],"Kansas Speedway":[{"driver":"Jeff J. Wright","wins":2,"poles":2,"top5":2,"top10":2,"starts":4,"laps_led":233},{"driver":"Adam Cabot","wins":1,"poles":0,"top5":3,"top10":3,"starts":3,"laps_led":130},{"driver":"Jeremy E Miller","wins":1,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":64},{"driver":"Joshua Banks","wins":1,"poles":0,"top5":1,"top10":2,"starts":3,"laps_led":38},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":3,"top10":3,"starts":3,"laps_led":21},{"driver":"Alex W Bell","wins":0,"poles":1,"top5":3,"top10":3,"starts":3,"laps_led":39},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":2,"top10":3,"starts":5,"laps_led":7},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":2,"top10":3,"starts":3,"laps_led":2},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":96},{"driver":"Phillip Brewer","wins":0,"poles":1,"top5":1,"top10":2,"starts":4,"laps_led":1}],"Kentucky Speedway":[{"driver":"J R Shepherd","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":20},{"driver":"Michael Sturgill","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":2},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":174},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":21},{"driver":"Bryce Kalusa","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Christopher Hodges","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":1},{"driver":"Dakota Floyd","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Julio Villalobos.Jr","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Nicholas Hapiak","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0}],"Kevin Harvick's Kern Raceway":[{"driver":"Bailey Turner","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":2},{"driver":"Casey Lakatos","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":12},{"driver":"Christopher Hodges","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"J R Shepherd","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Joshua L Adams","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Donald Kight","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":43},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":36}],"Las Vegas Motor Speedway":[{"driver":"Jeff J. Wright","wins":4,"poles":3,"top5":4,"top10":4,"starts":6,"laps_led":503},{"driver":"Joseph McWhorter","wins":1,"poles":0,"top5":3,"top10":3,"starts":5,"laps_led":78},{"driver":"Adam Cabot","wins":1,"poles":1,"top5":2,"top10":2,"starts":2,"laps_led":83},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":2,"top10":4,"starts":6,"laps_led":15},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":2,"top10":3,"starts":5,"laps_led":43},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":2,"top10":3,"starts":4,"laps_led":23},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":1},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":3,"starts":3,"laps_led":0},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":3,"starts":5,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":3,"starts":5,"laps_led":2}],"Martinsville Speedway":[{"driver":"Bailey Turner","wins":1,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":132},{"driver":"Joshua Banks","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":92},{"driver":"A.J. Stravato","wins":1,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":29},{"driver":"J R Shepherd","wins":0,"poles":1,"top5":1,"top10":1,"starts":3,"laps_led":107},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":1,"top10":2,"starts":3,"laps_led":7},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":0},{"driver":"Chad Clinger","wins":0,"poles":1,"top5":0,"top10":1,"starts":3,"laps_led":187},{"driver":"Casey Lakatos","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":3},{"driver":"Dakota Floyd2","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Michigan International Speedway":[{"driver":"Bailey Turner","wins":1,"poles":0,"top5":3,"top10":3,"starts":3,"laps_led":92},{"driver":"Chad Clinger","wins":1,"poles":1,"top5":2,"top10":3,"starts":3,"laps_led":22},{"driver":"A.J. Stravato","wins":1,"poles":0,"top5":1,"top10":1,"starts":3,"laps_led":26},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":3,"top10":3,"starts":3,"laps_led":86},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":24},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":2},{"driver":"Reggie Ortega","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Seth Hatchel","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":0,"top10":2,"starts":3,"laps_led":2}],"Nashville Fairgrounds Speedway":[{"driver":"Alex W Bell","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":35},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":9},{"driver":"Jeremy E Miller","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Michael Sturgill","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Enathian Ferrada","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":91},{"driver":"Reggie Ortega","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Taylor Butcher-Benjamin","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Nashville Superspeedway":[{"driver":"Jeff J. Wright","wins":1,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":188},{"driver":"Joshua Banks","wins":1,"poles":1,"top5":2,"top10":2,"starts":2,"laps_led":25},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":4},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Adam Cabot","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Austin Boelke","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":38},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":0,"top10":1,"starts":2,"laps_led":1}],"New Hampshire Motor Speedway":[{"driver":"Bailey Turner","wins":2,"poles":0,"top5":2,"top10":3,"starts":3,"laps_led":112},{"driver":"Mark Whitley","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":86},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":0},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":32},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":13},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":0},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":11},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":18},{"driver":"Adam Cabot","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":103},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0}],"North Wilkesboro Speedway":[{"driver":"Ben D Bafford","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":57},{"driver":"Jeff J. Wright","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":81},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":23},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":14},{"driver":"Caleb Weekley","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Julio Villalobos.Jr","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Phoenix Raceway":[{"driver":"Chad Clinger","wins":1,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":87},{"driver":"Jeff J. Wright","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":124},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":55},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":24},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":5},{"driver":"Adam Cabot","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Alek Martinez","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":4},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Noah Michalski","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":3},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":0,"top10":2,"starts":2,"laps_led":0}],"Pocono Raceway":[{"driver":"Chad Clinger","wins":1,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":14},{"driver":"Jeff J. Wright","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":26},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":19},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":2,"starts":2,"laps_led":31},{"driver":"Alek Martinez","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Donald Kight","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Hunter Senior","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Richmond Raceway":[{"driver":"Jeff J. Wright","wins":1,"poles":1,"top5":3,"top10":5,"starts":5,"laps_led":170},{"driver":"Joshua Banks","wins":1,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":60},{"driver":"Chad Clinger","wins":1,"poles":1,"top5":1,"top10":4,"starts":5,"laps_led":142},{"driver":"Aaron Smith II","wins":1,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":8},{"driver":"Kenny Kibbey","wins":1,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":70},{"driver":"Bailey Turner","wins":0,"poles":2,"top5":4,"top10":5,"starts":5,"laps_led":370},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":0},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":2,"top10":2,"starts":4,"laps_led":0},{"driver":"Jeremy E Miller","wins":0,"poles":0,"top5":2,"top10":2,"starts":3,"laps_led":5},{"driver":"Mark Whitley","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":42}],"Rockingham Speedway":[{"driver":"Joshua Banks","wins":1,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":16},{"driver":"Jeff J. Wright","wins":1,"poles":1,"top5":1,"top10":1,"starts":2,"laps_led":186},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":43},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":8},{"driver":"Mark Whitley","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":16},{"driver":"Phillip Brewer","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Reggie Ortega","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":0,"top10":1,"starts":2,"laps_led":0}],"Sonoma Raceway":[{"driver":"Jeff J. Wright","wins":1,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":22},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":18},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Sean Langton","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"James Loveland","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Jonathan Cofield","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Michael Kostek","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Talladega Superspeedway":[{"driver":"Adam Cabot","wins":2,"poles":1,"top5":3,"top10":4,"starts":4,"laps_led":57},{"driver":"Bailey Turner","wins":1,"poles":0,"top5":2,"top10":3,"starts":4,"laps_led":43},{"driver":"Broderick Vaclavik","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1},{"driver":"Donald Kight","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":20},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":2,"top10":3,"starts":4,"laps_led":4},{"driver":"Caleb Weekley","wins":0,"poles":0,"top5":1,"top10":3,"starts":4,"laps_led":0},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":1,"top10":2,"starts":3,"laps_led":0},{"driver":"Casey Lakatos","wins":0,"poles":0,"top5":1,"top10":2,"starts":4,"laps_led":1},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":1,"starts":3,"laps_led":29},{"driver":"Brandon Wallace","wins":0,"poles":0,"top5":1,"top10":1,"starts":5,"laps_led":0}],"Texas Motor Speedway":[{"driver":"Bailey Turner","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":16},{"driver":"Alek Martinez","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Andy Telgenhof","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Ben D Bafford","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":113},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Kenny Kibbey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Noah Michalski","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Reggie Ortega","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"The Milwaukee Mile":[{"driver":"Joshua Banks","wins":1,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":85},{"driver":"Alek Martinez","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":4},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":5},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":13},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Eric Hutton","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Phillip Brewer","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Reggie Ortega","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"Watkins Glen International":[{"driver":"Joseph McWhorter","wins":1,"poles":1,"top5":1,"top10":2,"starts":2,"laps_led":19},{"driver":"Aaron Smith II","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":16},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":2},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":2,"top10":2,"starts":2,"laps_led":2},{"driver":"Alek Martinez","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":4},{"driver":"Ben D Bafford","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Mark Whitley","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":22},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":1,"top10":1,"starts":2,"laps_led":1},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":0,"top10":2,"starts":2,"laps_led":5},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"World Wide Technology Raceway (Gateway)":[{"driver":"Joshua Banks","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":48},{"driver":"Angelo Hronis","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":2},{"driver":"Jacob Bradley","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":89},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Bryce Shoemaker","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Caleb Weekley","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Michael Kostek","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Noah Michalski","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Ryan J Rose","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"[Legacy] Kentucky Speedway - 2011":[{"driver":"Seth Hatchel","wins":1,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":52},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":11},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":17},{"driver":"Jeff J. Wright","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":3},{"driver":"Joseph McWhorter","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":48},{"driver":"Eric Hutton","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Lucas Lyons","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":2},{"driver":"Michael Kostek","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":1},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":6},{"driver":"Ryan Carwile","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"[Legacy] Texas Motor Speedway - 2009":[{"driver":"Jeff J. Wright","wins":1,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":121},{"driver":"A.J. Stravato","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":2},{"driver":"Chad Clinger","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":2},{"driver":"Chuck Sweeting","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":1},{"driver":"Michael Sturgill","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Eric Hutton","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":1},{"driver":"Jonathan Cofield","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Taylor Butcher-Benjamin","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}],"[Retired] Charlotte Motor Speedway":[{"driver":"Joseph McWhorter","wins":1,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":26},{"driver":"Bailey Turner","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":0},{"driver":"Jeff J. Wright","wins":0,"poles":1,"top5":1,"top10":1,"starts":1,"laps_led":82},{"driver":"Joshua Banks","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":9},{"driver":"Mark Whitley","wins":0,"poles":0,"top5":1,"top10":1,"starts":1,"laps_led":20},{"driver":"Adam Cabot","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":3},{"driver":"Alex W Bell","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Caleb Weekley","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Nicholas Starling","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0},{"driver":"Rhea Massey","wins":0,"poles":0,"top5":0,"top10":1,"starts":1,"laps_led":0}]};

const seasonChampions = {
  1: {driver: "Jeff J. Wright", points: 2270, wins: 6},
  2: {driver: "Joseph McWhorter", points: 2234, wins: 3},
  3: {driver: "Joshua Banks", points: 1194, wins: 1},
  4: {driver: "Bailey Turner", points: 2212, wins: 7},
  5: {driver: "Jeff J. Wright", points: 2227, wins: 7},
  6: {driver: "Joshua Banks", points: 2240, wins: 5}
};

// Standings tables show the top 43 only (the size of a full race field). The full standings stay in the data
// (driver profiles use them); drivers tied for 43rd are all shown.
const STANDINGS_DISPLAY_LIMIT = 43;
const topStandings = list => list.filter(d => d.pos <= STANDINGS_DISPLAY_LIMIT);

// --- State ---
let currentPage = 'home';
let currentSort = {col: 'pos', dir: 'asc'};
let currentSeason = 1;

// --- Init ---
// Each step is wrapped in try/catch so a failure in one (e.g., a missing
// element on a sub-page) does not block later steps like initHamburger().
// initHamburger() also runs FIRST so the mobile nav is always wired up.
function _safeInit(label, fn) {
  try { fn(); }
  catch (e) { console.warn('[init] ' + label + ' failed:', e); }
}
document.addEventListener('DOMContentLoaded', () => {
  _safeInit('initHamburger',       initHamburger);
  _safeInit('initThemeToggle',     initThemeToggle);
  _safeInit('initRouter',          initRouter);
  _safeInit('initCountdown',       initCountdown);
  _safeInit('renderSchedule',      renderSchedule);
  _safeInit('renderStandings',     renderStandings);
  _safeInit('renderLeaderCard',    renderLeaderCard);
  _safeInit('initStandingsSearch', initStandingsSearch);
  _safeInit('initTableSort',       initTableSort);
  _safeInit('initHistoryTabs',     initHistoryTabs);
  _safeInit('renderHistory',       () => renderHistory(1));
  _safeInit('renderTracks',        renderTracks);
  _safeInit('initTrackSearch',     initTrackSearch);
  _safeInit('initRuleAccordions',  initRuleAccordions);
});

// --- Points Leader Card ---
// Always reads from standingsData[0] so it auto-updates whenever standings are refreshed.
function renderLeaderCard() {
  if (!standingsData || !standingsData.length) return;
  const leader = standingsData[0];
  const posEl     = document.getElementById('leaderPos');
  const nameEl    = document.getElementById('leaderName');
  const ptsEl     = document.getElementById('leaderPts');
  const winsEl    = document.getElementById('leaderWins');
  const top5El    = document.getElementById('leaderTop5');
  const startsEl  = document.getElementById('leaderStarts');
  if (posEl)    posEl.textContent    = 'P' + leader.pos;
  if (nameEl)   nameEl.textContent   = leader.driver;
  if (ptsEl)    ptsEl.textContent    = leader.points;
  if (winsEl)   winsEl.textContent   = leader.wins;
  if (top5El)   top5El.textContent   = leader.top5;
  if (startsEl) startsEl.textContent = leader.starts;
}

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
  
  // Update nav — only toggle hash-routed links; preserve active state on direct page links
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
  
  // Close mobile menu
  const _nl = document.getElementById('navLinks');
  const _hb = document.getElementById('hamburger');
  if (_nl) _nl.classList.remove('open');
  if (_hb) _hb.classList.remove('open');
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// --- Countdown ---
function initCountdown() {
  const target = new Date('2027-01-30T22:00:00-05:00').getTime();
  
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
  if (!grid) return;
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
  if (!tbody) return;
  const list = topStandings(data || standingsData);
  const leaderPoints = list.length > 0 ? list[0].points : 0;

  tbody.innerHTML = list.map(d => {
    let rowClass = '';
    if (d.pos <= 3) rowClass += ' pos-' + d.pos;
    if (d.pos <= 14 && !d.suspended) rowClass += ' chase-eligible';
    if (d.suspended) rowClass += ' suspended-row';
    
    const suspBadge = d.suspended ? '<span class="suspended-badge">SUSPENDED R5</span>' : '';
    const winsClass = d.wins > 0 ? ' wins-highlight' : '';
    const behind = d.pos === 1 ? '<span style="color:var(--accent-gold);font-weight:700">--</span>' : '<span style="color:#888">-' + (leaderPoints - d.points) + '</span>';
    
    return '<tr class="' + rowClass.trim() + '">' +
      '<td class="pos-cell">' + d.pos + '</td>' +
      '<td><span class="driver-name">' + d.driver + '</span>' + suspBadge + '</td>' +
      '<td><strong>' + d.points + '</strong></td>' +
      '<td class="behind-cell">' + behind + '</td>' +
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
  const data = topStandings(historicalData[key] || []);
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
    '<th>Pos</th><th>Driver</th><th>Points</th><th>Behind</th><th>Wins</th><th>Top 5</th><th>Top 10</th><th>Starts</th>' +
    '</tr></thead><tbody>';
  
  const leaderPoints = data.length > 0 ? data[0].points : 0;
  
  data.forEach((d, i) => {
    let rowClass = '';
    if (d.pos === 1) rowClass = 'pos-1';
    else if (d.pos === 2) rowClass = 'pos-2';
    else if (d.pos === 3) rowClass = 'pos-3';
    
    const winsClass = d.wins > 0 ? ' wins-highlight' : '';
    const behind = d.pos === 1 ? '<span style="color:var(--gold)">--</span>' : '-' + (leaderPoints - d.points);
    
    html += '<tr class="' + rowClass + '">' +
      '<td class="pos-cell">' + d.pos + '</td>' +
      '<td class="driver-name">' + d.driver + '</td>' +
      '<td><strong>' + d.points + '</strong></td>' +
      '<td style="color:#888;font-size:0.85em">' + behind + '</td>' +
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
  if (!btn || !links) return;

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
