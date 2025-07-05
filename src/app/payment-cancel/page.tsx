"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Clock,
  Mail,
  RefreshCw,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentCancelPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [timestamp, setTimestamp] = useState("");
  const [referenceId, setReferenceId] = useState("");

  useEffect(() => {
    setTimestamp(new Date().toLocaleTimeString());
    setReferenceId(`#${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  }, []);

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8 pt-2">
            <div className="mx-auto mb-6 flex h-16  w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 shadow-lg">
              <AlertCircle className="h-8 w-8 text-amber-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-500 ">
              Payment Cancelled
            </CardTitle>
            <CardDescription className="text-slate-600 text-base leading-relaxed">
              Your payment has been cancelled safely. No charges were made.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2 px-8 pb-8">
            {/* Info Section */}
            <InfoBlock
              icon={
                <Shield className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              }
              title="Secure Cancellation"
              description="Your payment was securely cancelled before processing. No funds were charged, and your data remains protected."
            />

            {/* Transaction Summary */}
            <TransactionDetails
              status="Cancelled"
              time={timestamp}
              reference={referenceId}
              sessionId={sessionId || "N/A"}
            />

            {/* Action Buttons */}
            <ActionButtons />
          </CardContent>
        </Card>

        <SupportFooter />
      </div>
    </div>
  );
}

// --- COMPONENTS --- //

function InfoBlock({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-xl p-5 shadow-sm">
      <div className="flex items-start space-x-3">
        {icon}
        <div>
          <h4 className="font-semibold text-amber-900 mb-1">{title}</h4>
          <p className="text-sm text-amber-800 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function TransactionDetails({
  status,
  time,
  reference,
  sessionId,
}: {
  status: string;
  time: string;
  reference: string;
  sessionId: string;
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/50">
      <div className="flex items-center space-x-3 mb-3">
        <Clock className="h-4 w-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">
          Transaction Details
        </span>
      </div>
      <div className="space-y-2 text-sm text-slate-600">
        <DetailRow label="Status" value={status} valueClass="text-amber-600" />
        <DetailRow label="Time" value={time} />
        <DetailRow label="Reference" value={reference} isMono />
        <DetailRow label="Session ID" value={sessionId} isMono />
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  valueClass = "",
  isMono = false,
}: {
  label: string;
  value: string;
  valueClass?: string;
  isMono?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span>{label}:</span>
      <span
        className={`${valueClass} ${
          isMono ? "font-mono text-xs break-all" : "font-medium"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="space-y-3 pt-2">
      <Button
        asChild
        className="w-full h-12 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-700 hover:to-yellow-700 shadow-lg font-semibold"
      >
        <Link href="/teacher">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Payment Again
        </Link>
      </Button>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" asChild className="h-11">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Home
          </Link>
        </Button>
        <Button variant="outline" asChild className="h-11">
          <Link href="/">
            <Mail className="mr-2 h-4 w-4" />
            Support
          </Link>
        </Button>
      </div>
    </div>
  );
}

function SupportFooter() {
  return (
    <>
      <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-slate-500">
        <Shield className="h-3 w-3" />
        <span>Secured by 256-bit SSL encryption</span>
      </div>
    </>
  );
}
