exports.run = function(args) {
  // if (!procs.isNodeMillDir()) {
  //   return console.log('Please run in the root of the nodemill app.');
  // }
  if(args.length == 0){
    console.log("\nyou need to spicify and new type. for exsample\nquick-ui new page\n");
    return;
  } 
  var command = args[0];
  if (fs.existsSync(__dirname + '/new/' +command+".js")) {
    require(__dirname + '/new/' + command).run(args.slice(1));
  } else {
    console.log("\ncommand new "+command+" does not exist\n");
  }
};

