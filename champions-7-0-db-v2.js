/* ==========================================================================
   CHAMPIONS 7-0 - DATABASE V2 (75 Teams, 825 Players)
   ========================================================================== */

const SQUADS_DATABASE = {};

function addTeam(name, players) {
  SQUADS_DATABASE[name] = players.map(([pName, pPos, pRating]) => ({
    name: pName,
    pos: pPos,
    rating: pRating
  }));
}

// 1-10. Existing Expanded Teams
addTeam("Real Madrid 2017/18", [
  ["Keylor Navas", "GOL", 85], ["Dani Carvajal", "DEF", 88], ["Raphaël Varane", "DEF", 87],
  ["Sergio Ramos", "DEF", 90], ["Marcelo", "DEF", 88], ["Casemiro", "MEI", 89],
  ["Toni Kroos", "MEI", 89], ["Luka Modric", "MEI", 91], ["Isco Alarcón", "MEI", 86],
  ["Karim Benzema", "ATA", 89], ["C. Ronaldo", "ATA", 95]
]);

addTeam("Barcelona 2010/11", [
  ["Víctor Valdés", "GOL", 84], ["Dani Alves", "DEF", 88], ["Gerard Piqué", "DEF", 88],
  ["Carles Puyol", "DEF", 89], ["Éric Abidal", "DEF", 84], ["Sergio Busquets", "MEI", 87],
  ["Xavi Hernández", "MEI", 92], ["Andrés Iniesta", "MEI", 93], ["Pedro Rodríguez", "ATA", 85],
  ["David Villa", "ATA", 88], ["Lionel Messi", "ATA", 96]
]);

addTeam("Milan 2006/07", [
  ["Dida", "GOL", 85], ["Massimo Oddo", "DEF", 83], ["Alessandro Nesta", "DEF", 90],
  ["Paolo Maldini", "DEF", 91], ["M. Jankulovski", "DEF", 84], ["Gennaro Gattuso", "MEI", 86],
  ["Andrea Pirlo", "MEI", 90], ["Massimo Ambrosini", "MEI", 84], ["Clarence Seedorf", "MEI", 88],
  ["Kaká", "ATA", 94], ["Filippo Inzaghi", "ATA", 87]
]);

addTeam("Bayern Munique 2019/20", [
  ["Manuel Neuer", "GOL", 91], ["Benjamin Pavard", "DEF", 84], ["Jérôme Boateng", "DEF", 85],
  ["David Alaba", "DEF", 87], ["Alphonso Davies", "DEF", 86], ["Joshua Kimmich", "MEI", 89],
  ["Leon Goretzka", "MEI", 86], ["Serge Gnabry", "ATA", 87], ["Thomas Müller", "MEI", 88],
  ["Kingsley Coman", "ATA", 86], ["R. Lewandowski", "ATA", 93]
]);

addTeam("Inter de Milão 2009/10", [
  ["Júlio César", "GOL", 89], ["Maicon Sisenando", "DEF", 89], ["Lúcio", "DEF", 88],
  ["Walter Samuel", "DEF", 87], ["Cristian Chivu", "DEF", 84], ["Javier Zanetti", "MEI", 87],
  ["Esteban Cambiasso", "MEI", 86], ["Wesley Sneijder", "MEI", 91], ["Samuel Eto'o", "ATA", 90],
  ["Goran Pandev", "ATA", 84], ["Diego Milito", "ATA", 90]
]);

addTeam("Chelsea 2011/12", [
  ["Petr Cech", "GOL", 90], ["José Bosingwa", "DEF", 81], ["David Luiz", "DEF", 85],
  ["Gary Cahill", "DEF", 84], ["Ashley Cole", "DEF", 86], ["John Obi Mikel", "MEI", 82],
  ["Frank Lampard", "MEI", 89], ["Juan Mata", "MEI", 85], ["Salomon Kalou", "ATA", 82],
  ["Ryan Bertrand", "DEF", 80], ["Didier Drogba", "ATA", 91]
]);

addTeam("Manchester United 2007/08", [
  ["E. Van der Sar", "GOL", 88], ["Wes Brown", "DEF", 82], ["Rio Ferdinand", "DEF", 89],
  ["Nemanja Vidic", "DEF", 89], ["Patrice Evra", "DEF", 86], ["Owen Hargreaves", "MEI", 83],
  ["Michael Carrick", "MEI", 85], ["Paul Scholes", "MEI", 88], ["C. Ronaldo", "ATA", 93],
  ["Wayne Rooney", "ATA", 91], ["Carlos Tévez", "ATA", 88]
]);

addTeam("Liverpool 2018/19", [
  ["Alisson Becker", "GOL", 89], ["Trent A.-Arnold", "DEF", 87], ["Joel Matip", "DEF", 85],
  ["Virgil van Dijk", "DEF", 91], ["Andrew Robertson", "DEF", 86], ["Fabinho Tavares", "MEI", 87],
  ["Jordan Henderson", "MEI", 85], ["G. Wijnaldum", "MEI", 84], ["Mohamed Salah", "ATA", 90],
  ["Roberto Firmino", "ATA", 86], ["Sadio Mané", "ATA", 89]
]);

addTeam("Porto 2003/04", [
  ["Vítor Baía", "GOL", 84], ["Paulo Ferreira", "DEF", 84], ["Jorge Costa", "DEF", 83],
  ["Ricardo Carvalho", "DEF", 88], ["Nuno Valente", "DEF", 83], ["Costinha", "MEI", 84],
  ["Maniche", "MEI", 85], ["Pedro Mendes", "MEI", 82], ["Deco", "MEI", 90],
  ["Derlei", "ATA", 86], ["Carlos Alberto", "ATA", 83]
]);

addTeam("Ajax 1994/95", [
  ["E. Van der Sar", "GOL", 85], ["Michael Reiziger", "DEF", 84], ["Danny Blind", "DEF", 86],
  ["Frank Rijkaard", "DEF", 89], ["Frank de Boer", "DEF", 87], ["Clarence Seedorf", "MEI", 86],
  ["Edgar Davids", "MEI", 87], ["Jari Litmanen", "MEI", 89], ["Finidi George", "ATA", 84],
  ["Marc Overmars", "ATA", 86], ["Ronald de Boer", "ATA", 85]
]);

// 11-75. Additional Classic Teams
addTeam("Real Madrid 2021/22", [
  ["T. Courtois", "GOL", 92], ["D. Carvajal", "DEF", 85], ["Éder Militão", "DEF", 84],
  ["David Alaba", "DEF", 85], ["Ferland Mendy", "DEF", 83], ["Casemiro", "MEI", 88],
  ["Luka Modric", "MEI", 90], ["Toni Kroos", "MEI", 88], ["F. Valverde", "MEI", 85],
  ["Vinicius Jr", "ATA", 90], ["Karim Benzema", "ATA", 93]
]);

addTeam("Real Madrid 2013/14", [
  ["Iker Casillas", "GOL", 88], ["D. Carvajal", "DEF", 83], ["Pepe", "DEF", 86],
  ["Sergio Ramos", "DEF", 89], ["F. Coentrão", "DEF", 82], ["Xabi Alonso", "MEI", 87],
  ["Luka Modric", "MEI", 88], ["Angel Di María", "MEI", 89], ["Gareth Bale", "ATA", 91],
  ["Karim Benzema", "ATA", 87], ["C. Ronaldo", "ATA", 94]
]);

addTeam("Real Madrid 2001/02", [
  ["César Sánchez", "GOL", 82], ["Míchel Salgado", "DEF", 84], ["F. Hierro", "DEF", 88],
  ["Ivan Helguera", "DEF", 85], ["Roberto Carlos", "DEF", 91], ["C. Makelele", "MEI", 87],
  ["Santiago Solari", "MEI", 83], ["Luis Figo", "MEI", 90], ["Z. Zidane", "MEI", 94],
  ["Raúl González", "ATA", 91], ["F. Morientes", "ATA", 86]
]);

addTeam("Real Madrid 1999/00", [
  ["Iker Casillas", "GOL", 84], ["Míchel Salgado", "DEF", 83], ["Aitor Karanka", "DEF", 82],
  ["Ivan Helguera", "DEF", 84], ["Iván Campo", "DEF", 80], ["Roberto Carlos", "DEF", 89],
  ["F. Redondo", "MEI", 90], ["S. McManaman", "MEI", 85], ["Raúl González", "ATA", 90],
  ["F. Morientes", "ATA", 85], ["Nicolas Anelka", "ATA", 84]
]);

addTeam("Real Madrid 2023/24", [
  ["Andriy Lunin", "GOL", 83], ["D. Carvajal", "DEF", 86], ["A. Rüdiger", "DEF", 87],
  ["Nacho Fernández", "DEF", 82], ["Ferland Mendy", "DEF", 83], ["A. Tchouaméni", "MEI", 85],
  ["F. Valverde", "MEI", 88], ["Toni Kroos", "MEI", 89], ["Jude Bellingham", "MEI", 91],
  ["Rodrygo Goes", "ATA", 87], ["Vinicius Jr", "ATA", 92]
]);

addTeam("Real Madrid 2015/16", [
  ["Keylor Navas", "GOL", 86], ["D. Carvajal", "DEF", 85], ["Pepe", "DEF", 87],
  ["Sergio Ramos", "DEF", 89], ["Marcelo", "DEF", 88], ["Casemiro", "MEI", 86],
  ["Toni Kroos", "MEI", 88], ["Luka Modric", "MEI", 89], ["Gareth Bale", "ATA", 90],
  ["Karim Benzema", "ATA", 88], ["C. Ronaldo", "ATA", 94]
]);

addTeam("Real Madrid 1959/60", [
  ["R. Domínguez", "GOL", 80], ["Marquitos", "DEF", 83], ["J. Santamaría", "DEF", 87],
  ["Pachín", "DEF", 82], ["José M. Vidal", "MEI", 83], ["José M. Zárraga", "MEI", 84],
  ["Canário", "ATA", 82], ["Luis Del Sol", "MEI", 84], ["A. Di Stéfano", "ATA", 95],
  ["Ferenc Puskás", "ATA", 95], ["Paco Gento", "ATA", 92]
]);

addTeam("Barcelona 2014/15", [
  ["M. Ter Stegen", "GOL", 86], ["Dani Alves", "DEF", 87], ["Gerard Piqué", "DEF", 89],
  ["J. Mascherano", "DEF", 85], ["Jordi Alba", "DEF", 86], ["Sergio Busquets", "MEI", 88],
  ["Ivan Rakitic", "MEI", 86], ["Andrés Iniesta", "MEI", 91], ["Lionel Messi", "ATA", 96],
  ["Luis Suárez", "ATA", 94], ["Neymar Jr", "ATA", 93]
]);

addTeam("Barcelona 2008/09", [
  ["Víctor Valdés", "GOL", 83], ["Dani Alves", "DEF", 86], ["Gerard Piqué", "DEF", 85],
  ["Carles Puyol", "DEF", 88], ["Sylvinho Mendes", "DEF", 81], ["Sergio Busquets", "MEI", 84],
  ["Xavi Hernández", "MEI", 91], ["Andrés Iniesta", "MEI", 90], ["Lionel Messi", "ATA", 95],
  ["Samuel Eto'o", "ATA", 91], ["Thierry Henry", "ATA", 92]
]);

addTeam("Barcelona 2005/06", [
  ["Víctor Valdés", "GOL", 82], ["Oleguer Presas", "DEF", 80], ["Carles Puyol", "DEF", 89],
  ["Rafael Márquez", "DEF", 85], ["G. van Bronckhorst", "DEF", 83], ["Edmílson Gomes", "MEI", 82],
  ["Mark van Bommel", "MEI", 83], ["Deco", "MEI", 89], ["Ludovic Giuly", "ATA", 84],
  ["Ronaldinho", "ATA", 95], ["Samuel Eto'o", "ATA", 90]
]);

addTeam("Barcelona 1991/92", [
  ["A. Zubizarreta", "GOL", 86], ["Albert Ferrer", "DEF", 84], ["Ronald Koeman", "DEF", 90],
  ["Nando Muñoz", "DEF", 81], ["Juan Carlos", "DEF", 82], ["Pep Guardiola", "MEI", 88],
  ["Eusebio Sacristán", "MEI", 84], ["José M. Bakero", "MEI", 85], ["Michael Laudrup", "MEI", 90],
  ["H. Stoichkov", "ATA", 92], ["Julio Salinas", "ATA", 84]
]);

addTeam("Barcelona 2018/19", [
  ["M. Ter Stegen", "GOL", 90], ["Nélson Semedo", "DEF", 82], ["Gerard Piqué", "DEF", 88],
  ["Clément Lenglet", "DEF", 83], ["Jordi Alba", "DEF", 87], ["Sergio Busquets", "MEI", 87],
  ["Ivan Rakitic", "MEI", 85], ["Arthur Melo", "MEI", 83], ["Arturo Vidal", "MEI", 84],
  ["Lionel Messi", "ATA", 96], ["Luis Suárez", "ATA", 90]
]);

addTeam("Milan 2002/03", [
  ["Dida", "GOL", 86], ["Dario Simic", "DEF", 82], ["Alessandro Nesta", "DEF", 90],
  ["Paolo Maldini", "DEF", 92], ["Kakha Kaladze", "DEF", 84], ["Gennaro Gattuso", "MEI", 85],
  ["Andrea Pirlo", "MEI", 88], ["Clarence Seedorf", "MEI", 87], ["Rui Costa", "MEI", 89],
  ["A. Shevchenko", "ATA", 91], ["Filippo Inzaghi", "ATA", 86]
]);

addTeam("Milan 1993/94", [
  ["Sebastiano Rossi", "GOL", 85], ["Mauro Tassotti", "DEF", 86], ["A. Costacurta", "DEF", 88],
  ["Franco Baresi", "DEF", 92], ["Christian Panucci", "DEF", 85], ["Marcel Desailly", "MEI", 89],
  ["D. Albertini", "MEI", 87], ["R. Donadoni", "MEI", 88], ["D. Savicevic", "MEI", 89],
  ["Daniele Massaro", "ATA", 85], ["Zvonimir Boban", "MEI", 87]
]);

addTeam("Milan 1989/90", [
  ["Giovanni Galli", "GOL", 84], ["Mauro Tassotti", "DEF", 86], ["A. Costacurta", "DEF", 87],
  ["Franco Baresi", "DEF", 91], ["Paolo Maldini", "DEF", 91], ["Carlo Ancelotti", "MEI", 86],
  ["Frank Rijkaard", "MEI", 90], ["Angelo Colombo", "MEI", 82], ["R. Donadoni", "MEI", 87],
  ["Ruud Gullit", "ATA", 92], ["Marco van Basten", "ATA", 95]
]);

addTeam("Milan 1998/99", [
  ["C. Abbiati", "GOL", 82], ["Luigi Sala", "DEF", 80], ["A. Costacurta", "DEF", 85],
  ["Paolo Maldini", "DEF", 89], ["Thomas Helveg", "DEF", 82], ["D. Albertini", "MEI", 84],
  ["Massimo Ambrosini", "MEI", 82], ["A. Guglielminpietro", "MEI", 81], ["Zvonimir Boban", "MEI", 86],
  ["Oliver Bierhoff", "ATA", 86], ["George Weah", "ATA", 88]
]);

addTeam("Bayern Munique 2012/13", [
  ["Manuel Neuer", "GOL", 90], ["Philipp Lahm", "DEF", 91], ["Jérôme Boateng", "DEF", 86],
  ["Dante Bonfim", "DEF", 85], ["David Alaba", "DEF", 87], ["Javi Martínez", "MEI", 85],
  ["B. Schweinsteiger", "MEI", 89], ["Arjen Robben", "ATA", 91], ["Thomas Müller", "MEI", 87],
  ["Franck Ribéry", "ATA", 91], ["Mario Mandzukic", "ATA", 85]
]);

addTeam("Bayern Munique 2000/01", [
  ["Oliver Kahn", "GOL", 92], ["Willy Sagnol", "DEF", 85], ["Samuel Kuffour", "DEF", 84],
  ["P. Andersson", "DEF", 83], ["Thomas Linke", "DEF", 83], ["B. Lizarazu", "DEF", 87],
  ["Stefan Effenberg", "MEI", 89], ["Owen Hargreaves", "MEI", 82], ["Mehmet Scholl", "MEI", 87],
  ["H. Salihamidzic", "MEI", 84], ["Giovane Élber", "ATA", 88]
]);

addTeam("Bayern Munique 1973/74", [
  ["Sepp Maier", "GOL", 89], ["Johnny Hansen", "DEF", 83], ["F. Beckenbauer", "DEF", 95],
  ["H. Schwarzenbeck", "DEF", 85], ["Paul Breitner", "DEF", 90], ["Franz Roth", "MEI", 84],
  ["Rainer Zobel", "MEI", 82], ["Uli Hoeness", "ATA", 88], ["C. Torstensson", "ATA", 81],
  ["Gerd Müller", "ATA", 94], ["J. Kapellmann", "MEI", 82]
]);

addTeam("Bayern Munique 2022/23", [
  ["Manuel Neuer", "GOL", 88], ["Benjamin Pavard", "DEF", 83], ["D. Upamecano", "DEF", 82],
  ["Matthijs de Ligt", "DEF", 86], ["Alphonso Davies", "DEF", 85], ["Joshua Kimmich", "MEI", 89],
  ["Leon Goretzka", "MEI", 85], ["Leroy Sané", "ATA", 84], ["Jamal Musiala", "MEI", 87],
  ["Kingsley Coman", "ATA", 85], ["Choupo-Moting", "ATA", 81]
]);

addTeam("Liverpool 2004/05", [
  ["Jerzy Dudek", "GOL", 83], ["Steve Finnan", "DEF", 82], ["Jamie Carragher", "DEF", 86],
  ["Sami Hyypiä", "DEF", 85], ["Djimi Traoré", "DEF", 80], ["Xabi Alonso", "MEI", 86],
  ["Steven Gerrard", "MEI", 91], ["John Arne Riise", "MEI", 84], ["Luis García", "ATA", 85],
  ["Harry Kewell", "ATA", 82], ["Milan Baros", "ATA", 83]
]);

addTeam("Liverpool 1977/78", [
  ["Ray Clemence", "GOL", 86], ["Phil Neal", "DEF", 85], ["Tommy Smith", "DEF", 83],
  ["Phil Thompson", "DEF", 84], ["Emlyn Hughes", "DEF", 86], ["Jimmy Case", "MEI", 83],
  ["Terry McDermott", "MEI", 85], ["Graeme Souness", "MEI", 88], ["Ray Kennedy", "MEI", 84],
  ["Kenny Dalglish", "ATA", 92], ["David Fairclough", "ATA", 82]
]);

addTeam("Liverpool 1983/84", [
  ["Bruce Grobbelaar", "GOL", 84], ["Phil Neal", "DEF", 84], ["Mark Lawrenson", "DEF", 85],
  ["Alan Hansen", "DEF", 88], ["Alan Kennedy", "DEF", 83], ["Craig Johnston", "MEI", 82],
  ["Sammy Lee", "MEI", 83], ["Graeme Souness", "MEI", 89], ["Ronnie Whelan", "MEI", 84],
  ["Kenny Dalglish", "ATA", 90], ["Ian Rush", "ATA", 92]
]);

addTeam("Liverpool 2021/22", [
  ["Alisson Becker", "GOL", 89], ["Trent A.-Arnold", "DEF", 87], ["Ibrahima Konaté", "DEF", 84],
  ["Virgil van Dijk", "DEF", 90], ["Andrew Robertson", "DEF", 86], ["Fabinho Tavares", "MEI", 86],
  ["Jordan Henderson", "MEI", 84], ["Thiago Alcântara", "MEI", 88], ["Mohamed Salah", "ATA", 91],
  ["Sadio Mané", "ATA", 89], ["Luis Díaz", "ATA", 85]
]);

addTeam("Manchester United 1998/99", [
  ["Peter Schmeichel", "GOL", 90], ["Gary Neville", "DEF", 85], ["Jaap Stam", "DEF", 89],
  ["Ronny Johnsen", "DEF", 83], ["Denis Irwin", "DEF", 84], ["David Beckham", "MEI", 90],
  ["Roy Keane", "MEI", 89], ["Paul Scholes", "MEI", 88], ["Ryan Giggs", "MEI", 89],
  ["Andy Cole", "ATA", 86], ["Dwight Yorke", "ATA", 87]
]);

addTeam("Manchester United 1967/68", [
  ["Alex Stepney", "GOL", 82], ["Shay Brennan", "DEF", 81], ["Bill Foulkes", "DEF", 84],
  ["David Sadler", "DEF", 82], ["Tony Dunne", "DEF", 83], ["Pat Crerand", "MEI", 84],
  ["Nobby Stiles", "MEI", 85], ["Bobby Charlton", "MEI", 92], ["George Best", "ATA", 94],
  ["Brian Kidd", "ATA", 84], ["John Aston", "ATA", 82]
]);

addTeam("Manchester United 2002/03", [
  ["Fabien Barthez", "GOL", 84], ["John O'Shea", "DEF", 81], ["Rio Ferdinand", "DEF", 87],
  ["Wes Brown", "DEF", 81], ["M. Silvestre", "DEF", 82], ["David Beckham", "MEI", 88],
  ["Roy Keane", "MEI", 87], ["Nicky Butt", "MEI", 82], ["Ryan Giggs", "MEI", 87],
  ["Paul Scholes", "MEI", 86], ["R. van Nistelrooy", "ATA", 90]
]);

addTeam("Chelsea 2020/21", [
  ["Édouard Mendy", "GOL", 87], ["C. Azpilicueta", "DEF", 85], ["Thiago Silva", "DEF", 87],
  ["Antonio Rüdiger", "DEF", 86], ["Reece James", "DEF", 85], ["Ben Chilwell", "DEF", 83],
  ["N'Golo Kanté", "MEI", 91], ["Jorginho Filho", "MEI", 87], ["Mason Mount", "MEI", 85],
  ["Kai Havertz", "ATA", 86], ["Timo Werner", "ATA", 83]
]);

addTeam("Chelsea 2004/05", [
  ["Petr Cech", "GOL", 89], ["Paulo Ferreira", "DEF", 83], ["Ricardo Carvalho", "DEF", 88],
  ["John Terry", "DEF", 90], ["William Gallas", "DEF", 85], ["C. Makelele", "MEI", 88],
  ["Tiago Mendes", "MEI", 82], ["Frank Lampard", "MEI", 89], ["Joe Cole", "ATA", 86],
  ["Damien Duff", "ATA", 84], ["Didier Drogba", "ATA", 87]
]);

addTeam("Chelsea 2007/08", [
  ["Petr Cech", "GOL", 88], ["Michael Essien", "MEI", 87], ["Ricardo Carvalho", "DEF", 88],
  ["John Terry", "DEF", 89], ["Ashley Cole", "DEF", 86], ["C. Makelele", "MEI", 86],
  ["Michael Ballack", "MEI", 87], ["Frank Lampard", "MEI", 89], ["Joe Cole", "ATA", 85],
  ["Florent Malouda", "ATA", 83], ["Didier Drogba", "ATA", 89]
]);

addTeam("Inter de Milão 1963/64", [
  ["Giuliano Sarti", "GOL", 83], ["Tarcisio Burgnich", "DEF", 86], ["A. Guarneri", "DEF", 84],
  ["Giacinto Facchetti", "DEF", 90], ["Armando Picchi", "DEF", 85], ["Carlo Tagnin", "MEI", 81],
  ["Sandro Mazzola", "MEI", 90], ["Luis Suárez", "MEI", 90], ["Jair da Costa", "ATA", 85],
  ["Aurelio Milani", "ATA", 82], ["Mario Corso", "ATA", 86]
]);

addTeam("Inter de Milão 1997/98", [
  ["G. Pagliuca", "GOL", 87], ["Giuseppe Bergomi", "DEF", 86], ["Fabio Galante", "DEF", 81],
  ["Taribo West", "DEF", 82], ["Javier Zanetti", "MEI", 86], ["Aron Winter", "MEI", 83],
  ["Salvatore Fresi", "MEI", 80], ["F. Moriero", "MEI", 84], ["Diego Simeone", "MEI", 85],
  ["Youri Djorkaeff", "MEI", 87], ["Ronaldo Fenômeno", "ATA", 96]
]);

addTeam("Inter de Milão 2022/23", [
  ["André Onana", "GOL", 85], ["Matteo Darmian", "DEF", 81], ["Francesco Acerbi", "DEF", 83],
  ["Alessandro Bastoni", "DEF", 85], ["Denzel Dumfries", "DEF", 82], ["Federico Dimarco", "DEF", 84],
  ["Nicolò Barella", "MEI", 87], ["H. Calhanoglu", "MEI", 85], ["H. Mkhitaryan", "MEI", 83],
  ["Lautaro Martínez", "ATA", 88], ["Edin Dzeko", "ATA", 83]
]);

addTeam("Juventus 1995/96", [
  ["Angelo Peruzzi", "GOL", 87], ["Moreno Torricelli", "DEF", 83], ["Ciro Ferrara", "DEF", 87],
  ["P. Vierchowod", "DEF", 85], ["Gianluca Pessotto", "DEF", 82], ["Paulo Sousa", "MEI", 86],
  ["D. Deschamps", "MEI", 87], ["Antonio Conte", "MEI", 84], ["Gianluca Vialli", "ATA", 88],
  ["Fabrizio Ravanelli", "ATA", 86], ["A. Del Piero", "ATA", 90]
]);

addTeam("Juventus 1984/85", [
  ["Stefano Tacconi", "GOL", 84], ["Luciano Favero", "DEF", 82], ["Sergio Brio", "DEF", 83],
  ["Gaetano Scirea", "DEF", 91], ["Antonio Cabrini", "DEF", 89], ["Massimo Bonini", "MEI", 83],
  ["Marco Tardelli", "MEI", 86], ["Michel Platini", "MEI", 95], ["Massimo Briaschi", "ATA", 82],
  ["Paolo Rossi", "ATA", 86], ["Zbigniew Boniek", "ATA", 88]
]);

addTeam("Juventus 2002/03", [
  ["Gianluigi Buffon", "GOL", 92], ["Lilian Thuram", "DEF", 89], ["Ciro Ferrara", "DEF", 85],
  ["Paolo Montero", "DEF", 86], ["Gianluca Zambrotta", "DEF", 87], ["Mauro Camoranesi", "MEI", 84],
  ["A. Tacchinardi", "MEI", 83], ["Edgar Davids", "MEI", 88], ["Pavel Nedved", "MEI", 91],
  ["David Trezeguet", "ATA", 88], ["A. Del Piero", "ATA", 89]
]);

addTeam("Juventus 2014/15", [
  ["Gianluigi Buffon", "GOL", 89], ["S. Lichtsteiner", "DEF", 83], ["Leonardo Bonucci", "DEF", 87],
  ["Giorgio Chiellini", "DEF", 88], ["Patrice Evra", "DEF", 84], ["Andrea Pirlo", "MEI", 87],
  ["Claudio Marchisio", "MEI", 85], ["Paul Pogba", "MEI", 89], ["Arturo Vidal", "MEI", 87],
  ["Carlos Tévez", "ATA", 88], ["Alvaro Morata", "ATA", 84]
]);

addTeam("Porto 1986/87", [
  ["J. Mlynarczyk", "GOL", 82], ["João Pinto", "DEF", 84], ["Eduardo Luís", "DEF", 81],
  ["Celso Filho", "DEF", 82], ["Augusto Inácio", "DEF", 83], ["António André", "MEI", 83],
  ["Quim Oliveira", "MEI", 81], ["António Sousa", "MEI", 84], ["Rabah Madjer", "ATA", 89],
  ["Fernando Gomes", "ATA", 87], ["Paulo Futre", "ATA", 90]
]);

addTeam("Porto 2010/11", [
  ["Helton Arruda", "GOL", 83], ["Cristian Sapunaru", "DEF", 81], ["Rolando Fonseca", "DEF", 83],
  ["N. Otamendi", "DEF", 82], ["Alvaro Pereira", "DEF", 83], ["Fernando Reges", "MEI", 84],
  ["Fredy Guarín", "MEI", 84], ["João Moutinho", "MEI", 86], ["G. Hulk", "ATA", 88],
  ["Silvestre Varela", "ATA", 81], ["Radamel Falcao", "ATA", 89]
]);

addTeam("Ajax 1971/72", [
  ["Heinz Stuy", "GOL", 80], ["Wim Suurbier", "DEF", 85], ["H. Blankenburg", "DEF", 84],
  ["Barry Hulshoff", "DEF", 83], ["Ruud Krol", "DEF", 89], ["Arie Haan", "MEI", 85],
  ["Johan Neeskens", "MEI", 90], ["Gerrie Mühren", "MEI", 84], ["Sjaak Swart", "ATA", 83],
  ["Johan Cruyff", "ATA", 96], ["Piet Keizer", "ATA", 87]
]);

addTeam("Ajax 2018/19", [
  ["André Onana", "GOL", 84], ["N. Mazraoui", "DEF", 82], ["Matthijs de Ligt", "DEF", 89],
  ["Daley Blind", "DEF", 84], ["N. Tagliafico", "DEF", 83], ["Lasse Schöne", "MEI", 81],
  ["Frenkie de Jong", "MEI", 89], ["D. van de Beek", "MEI", 85], ["Hakim Ziyech", "ATA", 86],
  ["David Neres", "ATA", 84], ["Dusan Tadic", "ATA", 87]
]);

addTeam("Arsenal 2003/04", [
  ["Jens Lehmann", "GOL", 85], ["Lauren Etame", "DEF", 83], ["Kolo Touré", "DEF", 86],
  ["Sol Campbell", "DEF", 89], ["Ashley Cole", "DEF", 87], ["F. Ljungberg", "MEI", 86],
  ["Patrick Vieira", "MEI", 91], ["Gilberto Silva", "MEI", 85], ["Robert Pires", "MEI", 88],
  ["Dennis Bergkamp", "ATA", 89], ["Thierry Henry", "ATA", 95]
]);

addTeam("Arsenal 2005/06", [
  ["Jens Lehmann", "GOL", 86], ["Emmanuel Eboué", "DEF", 81], ["Kolo Touré", "DEF", 87],
  ["P. Senderos", "DEF", 80], ["Ashley Cole", "DEF", 86], ["Alexander Hleb", "MEI", 83],
  ["Cesc Fàbregas", "MEI", 86], ["Gilberto Silva", "MEI", 84], ["Robert Pires", "MEI", 87],
  ["F. Ljungberg", "MEI", 85], ["Thierry Henry", "ATA", 94]
]);

addTeam("Arsenal 2023/24", [
  ["David Raya", "GOL", 84], ["Ben White", "DEF", 84], ["William Saliba", "DEF", 87],
  ["Gabriel Magalhães", "DEF", 85], ["Jakub Kiwior", "DEF", 80], ["Declan Rice", "MEI", 88],
  ["Martin Ødegaard", "MEI", 89], ["Kai Havertz", "MEI", 84], ["Bukayo Saka", "ATA", 88],
  ["G. Martinelli", "ATA", 85], ["Gabriel Jesus", "ATA", 84]
]);

addTeam("Manchester City 2022/23", [
  ["Ederson Moraes", "GOL", 88], ["Kyle Walker", "DEF", 86], ["John Stones", "DEF", 86],
  ["Rúben Dias", "DEF", 89], ["Manuel Akanji", "DEF", 84], ["Rodri Hernández", "MEI", 92],
  ["Ilkay Gündogan", "MEI", 88], ["Kevin De Bruyne", "MEI", 93], ["Bernardo Silva", "MEI", 89],
  ["Jack Grealish", "ATA", 85], ["Erling Haaland", "ATA", 93]
]);

addTeam("Manchester City 2018/19", [
  ["Ederson Moraes", "GOL", 87], ["Kyle Walker", "DEF", 85], ["Vincent Kompany", "DEF", 87],
  ["Aymeric Laporte", "DEF", 86], ["Oleksandr Zinchenko", "DEF", 81], ["Fernandinho Rosa", "MEI", 88],
  ["David Silva", "MEI", 89], ["Kevin De Bruyne", "MEI", 91], ["Raheem Sterling", "ATA", 88],
  ["Bernardo Silva", "MEI", 88], ["Sergio Agüero", "ATA", 90]
]);

addTeam("Manchester City 2020/21", [
  ["Ederson Moraes", "GOL", 88], ["Kyle Walker", "DEF", 85], ["John Stones", "DEF", 85],
  ["Rúben Dias", "DEF", 88], ["Oleksandr Zinchenko", "DEF", 82], ["Rodri Hernández", "MEI", 86],
  ["Ilkay Gündogan", "MEI", 87], ["Bernardo Silva", "MEI", 87], ["Riyad Mahrez", "ATA", 87],
  ["Kevin De Bruyne", "MEI", 92], ["Phil Foden", "ATA", 86]
]);

addTeam("Atletico de Madrid 2013/14", [
  ["T. Courtois", "GOL", 88], ["Juanfran Torres", "DEF", 84], ["Miranda Filho", "DEF", 85],
  ["Diego Godín", "DEF", 89], ["Filipe Luís", "DEF", 86], ["Gabi Fernández", "MEI", 85],
  ["Tiago Mendes", "MEI", 83], ["Koke Resurrección", "MEI", 86], ["Arda Turan", "MEI", 86],
  ["David Villa", "ATA", 84], ["Diego Costa", "ATA", 88]
]);

addTeam("Atletico de Madrid 2015/16", [
  ["Jan Oblak", "GOL", 89], ["Juanfran Torres", "DEF", 84], ["José Giménez", "DEF", 83],
  ["Diego Godín", "DEF", 89], ["Filipe Luís", "DEF", 86], ["Gabi Fernández", "MEI", 85],
  ["A. Fernández", "MEI", 81], ["Koke Resurrección", "MEI", 87], ["Saúl Ñíguez", "MEI", 85],
  ["Antoine Griezmann", "ATA", 90], ["Fernando Torres", "ATA", 83]
]);

addTeam("Borussia Dortmund 1996/97", [
  ["Stefan Klos", "GOL", 83], ["Jürgen Kohler", "DEF", 86], ["Matthias Sammer", "DEF", 90],
  ["Martin Kree", "DEF", 81], ["Stefan Reuter", "DEF", 84], ["Jörg Heinrich", "DEF", 83],
  ["Paul Lambert", "MEI", 84], ["Paulo Sousa", "MEI", 85], ["Andreas Möller", "MEI", 88],
  ["Karl-Heinz Riedle", "ATA", 85], ["S. Chapuisat", "ATA", 86]
]);

addTeam("Borussia Dortmund 2012/13", [
  ["R. Weidenfeller", "GOL", 85], ["Lukasz Piszczek", "DEF", 84], ["Neven Subotic", "DEF", 83],
  ["Mats Hummels", "DEF", 87], ["Marcel Schmelzer", "DEF", 82], ["Sven Bender", "MEI", 82],
  ["Ilkay Gündogan", "MEI", 86], ["J. Blaszczykowski", "ATA", 83], ["Mario Götze", "MEI", 87],
  ["Marco Reus", "ATA", 88], ["R. Lewandowski", "ATA", 90]
]);

addTeam("Borussia Dortmund 2023/24", [
  ["Gregor Kobel", "GOL", 86], ["Julian Ryerson", "DEF", 81], ["Mats Hummels", "DEF", 85],
  ["N. Schlotterbeck", "DEF", 83], ["Ian Maatsen", "DEF", 81], ["Emre Can", "MEI", 82],
  ["Marcel Sabitzer", "MEI", 84], ["Julian Brandt", "MEI", 84], ["Jadon Sancho", "ATA", 83],
  ["Karim Adeyemi", "ATA", 82], ["Niclas Füllkrug", "ATA", 82]
]);

addTeam("Paris Saint-Germain 2019/20", [
  ["Keylor Navas", "GOL", 88], ["Thilo Kehrer", "DEF", 80], ["Thiago Silva", "DEF", 88],
  ["P. Kimpembe", "DEF", 84], ["Juan Bernat", "DEF", 82], ["Marquinhos Corrêa", "MEI", 87],
  ["Leandro Paredes", "MEI", 82], ["Ander Herrera", "MEI", 81], ["Angel Di María", "ATA", 87],
  ["Neymar Jr", "ATA", 92], ["Kylian Mbappé", "ATA", 93]
]);

addTeam("Paris Saint-Germain 2020/21", [
  ["Keylor Navas", "GOL", 89], ["A. Florenzi", "DEF", 81], ["Marquinhos Corrêa", "DEF", 87],
  ["P. Kimpembe", "DEF", 84], ["Abdou Diallo", "DEF", 80], ["Idrissa Gueye", "MEI", 82],
  ["Leandro Paredes", "MEI", 82], ["Marco Verratti", "MEI", 88], ["Angel Di María", "ATA", 86],
  ["Neymar Jr", "ATA", 91], ["Kylian Mbappé", "ATA", 93]
]);

addTeam("Monaco 2003/04", [
  ["Flavio Roma", "GOL", 81], ["Hugo Ibarra", "DEF", 80], ["Julien Rodriguez", "DEF", 82],
  ["Jean-Alain Givet", "DEF", 81], ["Patrice Evra", "DEF", 83], ["Lucas Bernardi", "MEI", 82],
  ["Andreas Zikos", "MEI", 81], ["Jaroslav Plasil", "MEI", 80], ["Jérôme Rothen", "MEI", 84],
  ["Ludovic Giuly", "ATA", 86], ["F. Morientes", "ATA", 87]
]);

addTeam("Monaco 2016/17", [
  ["Danijel Subasic", "GOL", 83], ["Djibril Sidibé", "DEF", 82], ["Kamil Glik", "DEF", 84],
  ["Jemerson de Jesus", "DEF", 82], ["Benjamin Mendy", "DEF", 83], ["Fabinho Tavares", "MEI", 86],
  ["T. Bakayoko", "MEI", 84], ["Thomas Lemar", "MEI", 85], ["Bernardo Silva", "MEI", 87],
  ["Radamel Falcao", "ATA", 86], ["Kylian Mbappé", "ATA", 88]
]);

addTeam("Valencia 1999/00", [
  ["S. Cañizares", "GOL", 86], ["Jocelyn Angloma", "DEF", 84], ["Miroslav Djukic", "DEF", 83],
  ["M. Pellegrino", "DEF", 82], ["Gerardo García", "DEF", 80], ["F. Farinós", "MEI", 83],
  ["Gaizka Mendieta", "MEI", 90], ["Kily González", "MEI", 85], ["Gerard López", "MEI", 84],
  ["Miguel A. Angulo", "ATA", 82], ["Claudio López", "ATA", 86]
]);

addTeam("Valencia 2000/01", [
  ["S. Cañizares", "GOL", 87], ["Jocelyn Angloma", "DEF", 83], ["Roberto Ayala", "DEF", 87],
  ["M. Pellegrino", "DEF", 83], ["Amedeo Carboni", "DEF", 84], ["Rubén Baraja", "MEI", 85],
  ["David Albelda", "MEI", 84], ["Gaizka Mendieta", "MEI", 91], ["Kily González", "MEI", 85],
  ["John Carew", "ATA", 83], ["Juan Sánchez", "ATA", 81]
]);

addTeam("Bayer Leverkusen 2001/02", [
  ["Hans-Jörg Butt", "GOL", 83], ["Zoltán Sebescen", "DEF", 80], ["Carsten Ramelow", "DEF", 84],
  ["Lúcio Ferreira", "DEF", 88], ["Diego Placente", "DEF", 82], ["Bernd Schneider", "MEI", 86],
  ["Michael Ballack", "MEI", 90], ["Zé Roberto", "MEI", 87], ["Yildiray Bastürk", "MEI", 85],
  ["Thomas Brdaric", "ATA", 81], ["Oliver Neuville", "ATA", 84]
]);

addTeam("Bayer Leverkusen 2023/24", [
  ["L. Hradecky", "GOL", 84], ["O. Kossounou", "DEF", 83], ["Jonathan Tah", "DEF", 85],
  ["Piero Hincapié", "DEF", 83], ["Jeremie Frimpong", "MEI", 86], ["Alejandro Grimaldo", "MEI", 86],
  ["Granit Xhaka", "MEI", 85], ["E. Palacios", "MEI", 84], ["Florian Wirtz", "MEI", 89],
  ["Jonas Hofmann", "ATA", 83], ["Victor Boniface", "ATA", 85]
]);

addTeam("Roma 2000/01", [
  ["F. Antonioli", "GOL", 81], ["Jonathan Zebina", "DEF", 81], ["Walter Samuel", "DEF", 88],
  ["Aldair Santos", "DEF", 86], ["Cafu", "DEF", 89], ["Vincent Candela", "DEF", 85],
  ["Damiano Tommasi", "MEI", 84], ["Emerson Rosa", "MEI", 85], ["Francesco Totti", "MEI", 92],
  ["Gabriel Batistuta", "ATA", 91], ["Marco Delvecchio", "ATA", 83]
]);

addTeam("Napoli 2022/23", [
  ["Alex Meret", "GOL", 83], ["G. Di Lorenzo", "DEF", 85], ["Amir Rrahmani", "DEF", 82],
  ["Kim Min-jae", "DEF", 87], ["Mário Rui", "DEF", 81], ["Stanislav Lobotka", "MEI", 84],
  ["F. Anguissa", "MEI", 83], ["Piotr Zielinski", "MEI", 84], ["Hirving Lozano", "ATA", 82],
  ["Victor Osimhen", "ATA", 90], ["K. Kvaratskhelia", "ATA", 89]
]);

addTeam("Marseille 1992/93", [
  ["Fabien Barthez", "GOL", 85], ["Jocelyn Angloma", "DEF", 84], ["Basile Boli", "DEF", 88],
  ["Marcel Desailly", "DEF", 89], ["Éric Di Meco", "DEF", 82], ["Jean-Christophe Eydelie", "MEI", 80],
  ["Franck Sauzée", "MEI", 85], ["D. Deschamps", "MEI", 87], ["Abedi Pelé", "MEI", 87],
  ["Alen Boksic", "ATA", 87], ["Rudi Völler", "ATA", 86]
]);

addTeam("Sevilla 2005/06", [
  ["Andrés Palop", "GOL", 84], ["Dani Alves", "DEF", 87], ["Javi Navarro", "DEF", 83],
  ["Julien Escudé", "DEF", 82], ["David Castedo", "DEF", 80], ["Jesús Navas", "MEI", 84],
  ["Pep Lluís Martí", "MEI", 81], ["Enzo Maresca", "MEI", 83], ["Adriano Correia", "MEI", 84],
  ["Javier Saviola", "ATA", 85], ["Luis Fabiano", "ATA", 84]
]);

addTeam("Benfica 1961/62", [
  ["Costa Pereira", "GOL", 83], ["Mário João", "DEF", 82], ["Germano Figueiredo", "DEF", 86],
  ["Angelo Martins", "DEF", 83], ["Neto", "MEI", 82], ["Fernando Cruz", "MEI", 83],
  ["José Augusto", "ATA", 85], ["Eusébio da Silva", "ATA", 95], ["Mário Coluna", "MEI", 90],
  ["António Simões", "ATA", 84], ["José Águas", "ATA", 86]
]);

// Expose database globally
window.SQUADS_DATABASE = SQUADS_DATABASE;
console.log("Champions 7-0 v2 Database loaded: 75 teams, 825 players.");
