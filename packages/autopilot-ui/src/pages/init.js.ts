const preLength = "<!DOCTYPE html>".length + 1;

export async function get() {
  const data = await fetch("http://localhost:3000/widget2");
  const rendered = btoa((await data.text()).slice(preLength));

  return new Response(
    `window.__source__.create("source-widget", "${rendered}")`,
    {
      status: 200,
      headers: { "Content-Type": "text/javascript" },
    },
  );
}
