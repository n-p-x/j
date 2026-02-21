const deps = ['handlebars', 'handlebars-helpers', 'handlebars-helper-repeat'];

import Handlebars from "handlebars";
import repeat from "handlebars-helper-repeat";
import helpers from "handlebars-helpers";
import fs from "fs";
import path from "path";

Handlebars.registerHelper('repeat', repeat);

helpers({
  handlebars: Handlebars
});

function script({ positional, named }) {
  if(positional.length < 3) throw new Error("Two positional args required");
  const jsonf = path.resolve(named.workdir, positional[0]);
  const tplf = path.resolve(named.workdir, positional[1]);
  const outf = path.resolve(named.workdir, positional[2]);
  const json = fs.readFileSync(jsonf, 'utf8');
  const tpl = fs.readFileSync(tplf, 'utf8');
  const template = Handlebars.compile(tpl);
  const output = template(JSON.parse(json));
  fs.writeFileSync(outf, output, 'utf8');
  console.log('Output:', output);
}
