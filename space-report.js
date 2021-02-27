// space-report.js
import { serve } from "https://deno.land/std@0.88.0/http/server.ts";

async function writeBody() {
  const zpoolList = Deno.run({
    cmd: ["zpool", "list"],
    stdout: "piped",
    stderr: "piped",
  });

  const output = await zpoolList.output();
  const outStr = new TextDecoder().decode(output);

  zpoolList.close();
  return outStr;
}

const server = serve({ port: 80 });
for await (const request of server) {
  request.respond({ body: `${Date.now()}\n\n${await writeBody()}` });
}