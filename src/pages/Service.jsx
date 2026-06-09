import {
  BarChart3,
  Edit3,
  Plus,
  Search,
  Server,
  Trash2,
} from "lucide-react";
import {ToastContainer, toast} from "react-toastify";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import RegisterService from "./RegisterService";
import EditService from "./EditService";
import Navbar from "../components/Navbar";
const statusStyles = {
  true: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
  false: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
};

function ServiceCard({ setLoader,setEditService,fetchServices,Services }) {
  const navigate = useNavigate();
  const deleteService = async() =>{
    try{
      setLoader(true);
      console.log("Deleting service with ID:", Services._id);
      await axios.post("http://localhost:3000/delete-service",{serviceId: Services._id},{
        withCredentials: true,
      })
      setLoader(true);
      fetchServices();
      setLoader(false);
    }catch(error)
    {
      console.error("Error deleting service",error)
    }
  }
  return (
    <article className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/10 transition hover:border-purple-400/25 hover:bg-[#101018]">
        <ToastContainer/>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-white">{Services.service_name}</h2>
            <span className={`rounded-lg px-2 py-1 text-xs font-semibold ring-1 ${statusStyles[Services.isActive]}`}>
              {Services.isActive ? "Active" : "Inactive"}
            </span>
          </div>
          {/* <p className="mt-2 text-sm leading-6 text-slate-400">{service.description}</p> */}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => navigate(`/services/${Services.service_name}/analytics`)}
            type="button"
            aria-label={`View analytics for ${Services.service_name}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#20202a] text-slate-400 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
          >
            <BarChart3 size={16} />
          </button>
          <button
          onClick={()=>{
            setEditService(Services);
            document.body.classList.add("overflow-hidden");
          }}
            type="button"
            aria-label={`Edit ${Services.service_name}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#20202a] text-slate-400 transition hover:border-purple-400/40 hover:bg-[#151521] hover:text-white"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={deleteService}
            type="button"
            aria-label={`Delete ${Services.service_name}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#20202a] text-slate-400 transition hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-300"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-[#20202a] bg-[#08080d] p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Service Details</p>
        <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <p className="text-slate-500">URL</p>
            <p className="mt-1 break-all font-medium text-slate-200">{Services.url}</p>
          </div>
          <div>
            <p className="text-slate-500">Status</p>
            <p className="mt-1 font-medium text-slate-200">{Services.isActive ? "Active" : "Inactive"}</p>
          </div>
        </div>
      </div>

      {/* <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-[#20202a] bg-[#08080d] p-3">
          <div className="flex items-center gap-2 text-slate-500">
            <Activity size={15} />
            <p className="text-xs font-medium">Request Count</p>
          </div>
          <p className="mt-2 text-xl font-bold text-white">{service.requestCount}</p>
        </div>
        <div className="rounded-lg border border-[#20202a] bg-[#08080d] p-3">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock3 size={15} />
            <p className="text-xs font-medium">Average Latency</p>
          </div>
          <p className="mt-2 text-xl font-bold text-white">{service.averageLatency}</p>
        </div>
        <div className="rounded-lg border border-[#20202a] bg-[#08080d] p-3">
          <div className="flex items-center gap-2 text-slate-500">
            <AlertTriangle size={15} />
            <p className="text-xs font-medium">Error Count</p>
          </div>
          <p className="mt-2 text-xl font-bold text-white">{service.errorCount}</p>
        </div>
      </div> */}
    </article>
  );
}

function RecentLogs({Logs}) {
  return (
    <section className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 shadow-2xl shadow-black/10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Recent Logs</h2>
          <p className="mt-1 text-sm text-slate-400">Latest gateway events across registered services.</p>
        </div>
        <Server size={20} className="text-purple-300" />
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="border-b border-[#20202a] text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-3 pr-4 font-semibold">Time</th>
              <th className="px-4 py-3 font-semibold">Service</th>
              <th className="px-4 py-3 font-semibold">Route</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="py-3 pl-4 font-semibold">Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#20202a] text-slate-300">
            {Logs?.map((log) => (
              <tr key={log._id} className="transition hover:bg-[#101018]">
                <td className="py-3 pr-4 text-slate-500">{log.timestamp?new Date(log.timestamp).toLocaleString("en-IN",{
                  timeZone: "Asia/Kolkata",
                }): null}</td>
                <td className="px-4 py-3 font-medium text-white">{log.serviceName}</td>
                <td className="px-4 py-3">
                  <span className="mr-2 rounded bg-purple-400/10 px-2 py-1 text-xs font-semibold text-purple-300">
                    {log.method}
                  </span>
                  {log.path}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                      log.statusCode >= 500
                        ? "bg-rose-400/10 text-rose-300"
                        : log.statusCode >= 400
                          ? "bg-amber-400/10 text-amber-300"
                          : "bg-emerald-400/10 text-emerald-300"
                    }`}
                  >
                    {log.statusCode}
                  </span>
                </td>
                <td className="py-3 pl-4">{log.responseTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


export default function Service() {
  const [Services, setServices] = useState(null);
  const [logs, setLogs] = useState(null);
  const [loader, setloader] = useState(false);
  const [addService, setaddService] = useState(false);
  const [editService, setEditService] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState(null);
    const filter=(Query)=>{
      console.log("Filtering services with query:", Query);
      if(!Query || Query === "")
      {
        console.log("No search query provided. Showing all services.");
        setFilteredServices(Services);
        console.log("All services:", Services);
        console.log("Filtered services:", filteredServices);
        return;
      }
      const filtered=Services.filter((service)=>{
        return service.service_name.toLowerCase().includes(Query.toLowerCase()) || service.url.toLowerCase().includes(Query.toLowerCase());
      })
      setFilteredServices(filtered);
    }
   const fetchServices = async () => {
    await Promise.resolve();
    try {
      setloader(true);
      const response = await axios.get("http://localhost:3000/services",{
        withCredentials: true,
      });
      const logsResponse = await axios.get("http://localhost:3000/userLogs",{
        withCredentials: true,
      });
      setloader(false);
      setServices(response.data.services);
      setFilteredServices(response.data.services);
      setLogs(logsResponse.data.logs);
      console.log("Fetched services:", response.data);
      console.log("Fetched logs:", logsResponse.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };  
  useEffect(() => {
    fetchServices();
}, []);
  return (
    <main className="lg:ml-72">
      <Navbar/>
      {loader && <Loader/>}
      {addService && <RegisterService setaddService={setaddService} setloader={setloader} fetchServices={fetchServices}/>}
      {editService && <EditService service={editService} setEditService={setEditService} setloader={setloader} fetchServices={fetchServices}/>}
      <section className="mx-auto max-w-[1440px] space-y-8 px-4 py-7 sm:px-6 lg:px-8">
        <button onClick={() => {
          setaddService(true);
          document.body.classList.add("overflow-hidden");
        }} className="fixed bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-sm font-semibold text-white shadow-2xl shadow-purple-950/40 transition hover:bg-purple-400">
          <Plus />
        </button>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-300">Service registry</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">Services</h1>
          <p className="max-w-2xl text-sm text-slate-400">
            Review registered APIs, health signals, and recent gateway activity
          </p>
        </div>

        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="search"
            onChange={(e)=>{
              setSearchQuery(e.target.value);
              filter(e.target.value);
            }}
            placeholder="Search by service name or URL"
            className="h-11 w-full rounded-lg border border-[#20202a] bg-[#0b0b12] pl-10 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-purple-400/70 focus:ring-2 focus:ring-purple-400/10"
          />
        </div>

        {filteredServices && filteredServices.length > 0 && (
          <section className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} Services={service} setEditService={setEditService} setLoader={setloader} fetchServices={fetchServices} />
            ))}
          </section>
        )}

        {
          filteredServices && filteredServices.length === 0 && (
            <div className="rounded-lg border border-[#20202a] bg-[#0b0b12] p-6 text-center">
              <p className="text-sm text-slate-400">No services found matching your search.</p>
            </div>
          )   
        }

        <RecentLogs Logs={logs?logs:[]} />
      </section>
    </main>
  );
}
