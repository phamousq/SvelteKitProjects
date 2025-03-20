import { j as json } from "../../../../chunks/index2.js";
import * as fs from "node:fs";
import path from "node:path";
async function GET() {
  const routesDir = path.join(process.cwd(), "src", "routes");
  function getRoutes(dir) {
    const files = fs.readdirSync(dir);
    const routes2 = [];
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (!file.startsWith("api") && !file.startsWith("_")) {
          routes2.push(file);
        }
      }
    }
    return routes2;
  }
  const routes = getRoutes(routesDir);
  return json(routes);
}
export {
  GET
};
