import { useState, useEffect } from "react";
import ApiSandboxHistory from "../components/ApiSandboxHistory";
import ApiSandboxRequestBuilder from "../components/ApiSandboxRequestBuilder";
import ApiSandboxResponseViewer from "../components/ApiSandboxResponseViewer";
import Loader from "../components/Loader";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
export default function ApiSandbox() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [queryParams, setQueryParams] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [body, setBody] = useState("[\n{\n\n}\n]");
  const [history, setHistory] = useState([]);
  const [response, setResponse] = useState([]);
  const [loader, setLoader] = useState(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL; 
  const buildRequestUrl = () => {
    const activeParams = queryParams.filter((param) => param.key.trim());

    if (!activeParams.length) {
      return url;
    }

    const separator = url.includes("?") ? "&" : "?";
    const queryString = activeParams
      .map((param) => `${encodeURIComponent(param.key.trim())}=${encodeURIComponent(param.value)}`)
      .join("&");

    return `${url}${separator}${queryString}`;
  }

  const handleSendRequest = async () => {
    try {
      const requestUrl = buildRequestUrl();
      setLoader(true);
      let parsedBody;

      if (body.trim() !== "") {
        try {
          parsedBody = JSON.parse(body);
        } catch (error) {
          toast.error("Invalid JSON in request body");
          setLoader(false);
          return;
        }
      }
      const ServerResponse = await axios.post(
        `${BASE_URL}/sandbox`,
        {
          method,
          url: requestUrl,
          headers: Object.fromEntries(
            headers.map((header) => [header.key, header.value])
          ),
          body: parsedBody,
          baseURL: url,
          queryParams: Object.fromEntries(
            queryParams.map((param) => [param.key, param.value])
          ),
        },
        {
          withCredentials: true,
        }
      );

      ServerResponse.size = `${(
        JSON.stringify(ServerResponse.data).length / 1024
      ).toFixed(3)} KB`;

      setResponse(ServerResponse);
      setLoader(false);
    } catch (error) {
      console.log(error.response);

      if (error.response) {
        error.response.size = `${(
          JSON.stringify(error.response.data).length / 1024
        ).toFixed(3)} KB`;

        setResponse(error.response);
      } else {
        setResponse({
          status: 500,
          data: {
            error: error.message,
          },
        });
      }
      setLoader(false);
      toast.error("Request failed");
    }
  };

  const handleHistorySelect = (item) => {
    console.log("History Select Reached");
    setMethod(item.method);
    setUrl(item.url);
  }

  const getRequestHistory = async () => {
    try {
      const historyResponse = await axios.get(`${BASE_URL}/sandbox/recent-requests`, {
        withCredentials: true,
      });
      console.log("history", historyResponse);
      setHistory(historyResponse.data);
    } catch (error) {
      console.error("Error fetching history:", response.message);
    }
  }

  useEffect(() => {
    setLoader(true);
    getRequestHistory();
    setLoader(false);
  }
    , [])

  return (
    <main className="lg:ml-72">
      <Navbar />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      {loader && <Loader />}
      <section className="mx-auto max-w-[1440px] space-y-6 px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-300">Developer Tool</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">API SandBox</h1>
          <p className="max-w-2xl text-sm text-slate-400">
            Test and debug your APIs with our interactive sandbox environment
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,0.78fr)] xl:items-start">

          <ApiSandboxRequestBuilder
            method={method}
            setMethod={setMethod}
            url={url}
            setUrl={setUrl}
            queryParams={queryParams}
            setQueryParams={setQueryParams}
            headers={headers}
            setHeaders={setHeaders}
            body={body}
            setBody={setBody}
            onSend={handleSendRequest}
          />

          <div className="xl:sticky xl:top-7">
            <ApiSandboxResponseViewer response={response} />
          </div>
        </div>

        <ApiSandboxHistory items={history} onSelect={handleHistorySelect} />
      </section>
    </main>
  );
}
