export default {
  async fetch(request) {
    try {
      const webhookURL =
        "https://api.junkie-development.de/api/v1/webhooks/execute/f7da89d1-2459-4933-a4ed-94b561b30e8b";

      const res = await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: "{}"
      });

      let text = await res.text(); // pega a resposta como texto puro

      // tenta converter para JSON
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text }; // mantém texto cru se não for JSON
      }

      return new Response(JSON.stringify(data), {
        status: res.status,
        headers: { "Content-Type": "application/json" }
      });

    } catch (error) {
      return new Response(
        JSON.stringify({
          error: "worker-error",
          detail: error.message
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
};
