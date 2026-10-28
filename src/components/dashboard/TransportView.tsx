import React, { useState } from 'react';
import { BusRouteInfo, Student } from '../../types';
import {
  Bus,
  MapPin,
  Clock,
  Phone,
  Shield,
  Navigation,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface TransportViewProps {
  busInfo: BusRouteInfo;
  student: Student;
}

export const TransportView: React.FC<TransportViewProps> = ({ busInfo, student }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [eta, setEta] = useState(busInfo.etaMinutes);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setEta((prev) => Math.max(2, prev - 1));
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">School Transport & GPS Tracking</h2>
              <span className="text-xs font-bold text-sky-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                {busInfo.routeNumber}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Dedicated school fleet with real-time AIS-140 GPS & CCTV surveillance
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh GPS Signal</span>
          </button>
        </div>

        {/* Live Status Banner */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-sky-900 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
              <Navigation className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-sky-200 uppercase font-semibold">Live Fleet Telemetry</span>
                <span className="text-slate-400">·</span>
                <span className="text-xs text-emerald-300 font-bold">{busInfo.currentStatus}</span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Approaching: {busInfo.nextStopName}
              </h3>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-sky-200 uppercase font-medium">Estimated Arrival</span>
            <div className="text-2xl font-bold font-mono tabular-nums text-white mt-0.5">
              ~{eta} Minutes
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Route Information + Staff Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Route Details */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bus className="w-4 h-4 text-sky-900" />
            <span>Assigned Stop & Schedule</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <MapPin className="w-4 h-4 text-sky-800 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 text-[11px] font-bold uppercase">Designated Pickup Point</span>
                <p className="font-semibold text-slate-900 text-sm mt-0.5">{busInfo.pickupPoint}</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Student: {student.name} ({student.admissionNo})</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Morning Pickup</span>
                </span>
                <div className="text-base font-bold font-mono tabular-nums text-slate-900 mt-1">
                  {busInfo.morningPickupTime}
                </div>
                <span className="text-[10px] text-slate-400">Boarding closes 3m prior</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 text-[10px] font-bold uppercase flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Afternoon Drop</span>
                </span>
                <div className="text-base font-bold font-mono tabular-nums text-slate-900 mt-1">
                  {busInfo.afternoonDropTime}
                </div>
                <span className="text-[10px] text-slate-400">Escorted by bus helper</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] font-bold uppercase block">Vehicle Registration</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{busInfo.busNumber}</span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                Fitness & Speed Gov. Verified
              </span>
            </div>
          </div>
        </div>

        {/* Bus Personnel & Safety */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Shield className="w-4 h-4 text-sky-900" />
              <span>Assigned Crew Contacts</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Driver in Charge</span>
                  <span className="font-bold text-slate-900 text-sm">{busInfo.driverName}</span>
                  <span className="text-slate-500 text-[11px] block mt-0.5">12+ Yrs Clean Driving Record</span>
                </div>
                <a
                  href={`tel:${busInfo.driverPhone}`}
                  className="px-3 py-1.5 bg-sky-900 hover:bg-sky-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Driver</span>
                </a>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Bus Attendant / Helper</span>
                  <span className="font-bold text-slate-900 text-sm">{busInfo.helperName}</span>
                  <span className="text-slate-500 text-[11px] block mt-0.5">Student Boarding & Attendance Log</span>
                </div>
                <span className="text-xs font-medium text-slate-500 font-mono">Onboard Staff</span>
              </div>
            </div>
          </div>

          <div className="bg-sky-50/60 p-4 rounded-xl border border-sky-100 text-xs space-y-2">
            <span className="font-bold text-sky-900 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-sky-900" />
              <span>Transport Control Room 24/7 Helpline</span>
            </span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              For route diversions, temporary pickup changes, or bus delays, contact the Central Transport Dispatcher at <strong className="text-slate-900">+91 1274 248900</strong> or school administration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
