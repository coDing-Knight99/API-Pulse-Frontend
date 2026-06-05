import { useState } from "react";
import { Activity, KeyRound, Send } from "lucide-react";
import ApiSandboxHistory from "../components/ApiSandboxHistory";
import ApiSandboxRequestBuilder from "../components/ApiSandboxRequestBuilder";
import ApiSandboxResponseViewer from "../components/ApiSandboxResponseViewer";

const apiKeys = [
  { label: "Production Orders Key", value: "prod-orders" },
  { label: "Staging Gateway Key", value: "staging-gateway" },
  { label: "Internal QA Key", value: "internal-qa" },
];

const initialHeaders = [
  { key: "Content-Type", value: "application/json" },
  { key: "X-Request-Source", value: "api-sandbox" },
];

const initialBody = `{
  "name": "API Pulse",
  "environment": "sandbox",
  "active": true
}`;

const historySeed = [
  {
    id: 1,
    time: "18:44:21",
    method: "GET",
    url: "https://api.example.com/v1/services",
    status: 200,
    latency: 118,
  },
  {
    id: 2,
    time: "18:41:03",
    method: "POST",
    url: "https://api.example.com/v1/users",
    status: 201,
    latency: 164,
  },
  {
    id: 3,
    time: "18:36:55",
    method: "PATCH",
    url: "https://api.example.com/v1/services/svc-orders",
    status: 200,
    latency: 96,
  },
  {
    id: 4,
    time: "18:29:18",
    method: "DELETE",
    url: "https://api.example.com/v1/sessions/session_42",
    status: 401,
    latency: 82,
  },
];

const responseSamples = {
  200: {
    status: 200,
    statusText: "OK",
    latency: 118,
    size: "1.8 KB",
    body: {
      success: true,
      traceId: "trc_sandbox_29f13",
      data: {
        service: "Orders API",
        region: "ap-south-1",
        healthy: true,
        limits: {
          remaining: 9482,
          resetInSeconds: 3600,
        },
      },
    },
  },
  201: {
    status: 201,
    statusText: "Created",
    latency: 164,
    size: "1.1 KB",
    body: {
      success: true,
      traceId: "trc_sandbox_61a90",
      data: {
        id: "usr_1024",
        name: "Sandbox User",
        role: "developer",
        created: true,
      },
    },
  },
  401: {
    status: 401,
    statusText: "Unauthorized",
    latency: 82,
    size: "0.7 KB",
    body: {
      success: false,
      traceId: "trc_sandbox_7b014",
      error: {
        code: "INVALID_API_KEY",
        message: "The selected API key is not authorized for this endpoint.",
      },
    },
  },
};

export default function ApiSandbox() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.example.com/v1/services");
  const [selectedKey, setSelectedKey] = useState(apiKeys[0].value);
  const [headers, setHeaders] = useState(initialHeaders);
  const [body, setBody] = useState(initialBody);
  const [history, setHistory] = useState(historySeed);
  const [response, setResponse] = useState(responseSamples[200]);

  function handleSendRequest() {
    const nextStatus = method === "POST" ? 201 : selectedKey === "internal-qa" ? 401 : 200;
    const nextResponse = responseSamples[nextStatus];
    const nextHistoryItem = {
      id: Date.now(),
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
      method,
      url,
      status: nextResponse.status,
      latency: nextResponse.latency,
    };

    setResponse(nextResponse);
    setHistory((currentHistory) => [nextHistoryItem, ...currentHistory].slice(0, 8));
  }

  function handleHistorySelect(item) {
    setMethod(item.method);
    setUrl(item.url);
    setResponse(responseSamples[item.status] ?? responseSamples[200]);
  }

  return (
    <main className="lg:ml-72">
      <section className="mx-auto max-w-[1440px] space-y-6 px-4 py-7 sm:px-6 lg:px-8">

        <ApiSandboxRequestBuilder
          method={method}
          setMethod={setMethod}
          url={url}
          setUrl={setUrl}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
          apiKeys={apiKeys}
          headers={headers}
          setHeaders={setHeaders}
          body={body}
          setBody={setBody}
          onSend={handleSendRequest}
        />

        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.05fr)_minmax(26rem,0.95fr)]">
          <ApiSandboxResponseViewer response={response} />
          <ApiSandboxHistory items={history} onSelect={handleHistorySelect} />
        </div>
      </section>
    </main>
  );
}
