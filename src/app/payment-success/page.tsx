"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  Calendar,
  MapPin,
  User,
  Mail,
  Download,
  Home,
  MessageCircle,
} from "lucide-react";

import jsPDF from "jspdf";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [bookingDetails, setBookingDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId) {
        toast.error("Payment session ID not found.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/payments/session-details?session_id=${sessionId}`
        );
        if (!res.ok) throw new Error("Failed to fetch payment details");
        const data = await res.json();

        setBookingDetails({
          bookingId: data.id,
          tourName: data.metadata?.tourName || "Tour",
          teacherName: data.metadata?.teacherName || "Teacher",
          date: data.metadata?.date || "N/A",
          time: data.metadata?.time || "N/A",
          participants: data.metadata?.participants || 1,
          totalAmount: data.amount_total / 100,
          paymentMethod:
            data.payment_method_types?.[0] === "card"
              ? `•••• ${data.payment_method_details?.card?.last4 || "****"}`
              : data.payment_method_types?.join(", "),
          location: data.metadata?.location || "N/A",
          meetingPoint: data.metadata?.meetingPoint || "N/A",
          customerEmail: data.customer_details?.email,
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load payment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  // PDF রিসিপ্ট ডাউনলোড ফাংশন

  const downloadReceipt = () => {
    if (!bookingDetails) return;

    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor("#2c3e50");
    doc.text(
      `Tour Guide: ${bookingDetails.teacherName}`,
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );

    // Subtitle
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#34495e");
    doc.text(
      `Receipt for your booking`,
      doc.internal.pageSize.getWidth() / 2,
      30,
      { align: "center" }
    );

    // Line
    doc.setDrawColor("#2980b9");
    doc.setLineWidth(0.8);
    doc.line(20, 35, doc.internal.pageSize.getWidth() - 20, 35);

    let y = 45;
    const lineGap = 10;

    const addLabelValue = (
      label: string,
      value: string | number,
      smallValue?: boolean
    ) => {
      doc.setFont("helvetica", "bold");
      doc.setTextColor("#2980b9");
      doc.setFontSize(12);
      doc.text(`${label}:`, 20, y);

      doc.setFont("helvetica", "normal");
      doc.setTextColor("#2c3e50");

      // 🟡 এখানে ছোট ফন্ট সেট করা হলো শুধুমাত্র Booking ID-এর জন্য
      if (smallValue) {
        doc.setFontSize(11);
      } else {
        doc.setFontSize(12);
      }

      doc.text(`${value}`, 70, y);
      y += lineGap;
    };

    addLabelValue("Booking ID", bookingDetails.bookingId, true); // small font
    addLabelValue("Tour Name", bookingDetails.tourName);
    addLabelValue(
      "Date & Time",
      `${bookingDetails.date} ${bookingDetails.time}`
    );
    addLabelValue("Participants", bookingDetails.participants);
    addLabelValue("Total Paid", `$${bookingDetails.totalAmount}`);
    addLabelValue("Payment Method", bookingDetails.paymentMethod);
    addLabelValue("Location", bookingDetails.location);
    addLabelValue("Meeting Point", bookingDetails.meetingPoint);
    addLabelValue("Customer Email", bookingDetails.customerEmail || "N/A");

    // Footer note
    doc.setFontSize(8);
    doc.setTextColor("#7f8c8d");
    doc.text(
      "Thank you for booking your tour with us! Please bring this receipt along with you.",
      20,
      y + 15,
      { maxWidth: doc.internal.pageSize.getWidth() - 40 }
    );

    doc.save(`receipt_${bookingDetails.bookingId}.pdf`);
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-20">
        Loading payment details...
      </p>
    );

  if (!bookingDetails)
    return (
      <p className="text-center text-red-500 mt-20">
        Unable to load booking details.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Your tour booking has been confirmed
          </p>
          {bookingDetails.customerEmail && (
            <p className="text-sm text-gray-500 mt-1">
              Confirmation sent to {bookingDetails.customerEmail}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Booking Details
              </CardTitle>
              <CardDescription>
                Your tour information and schedule
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {bookingDetails.tourName}
                </h3>
                <p className="text-gray-600">
                  with {bookingDetails.teacherName}
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{bookingDetails.date}</p>
                    <p className="text-sm text-gray-600">
                      {bookingDetails.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium">{bookingDetails.location}</p>
                    <p className="text-sm text-gray-600">
                      Meet at: {bookingDetails.meetingPoint}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <p>{bookingDetails.participants} participants</p>
                </div>
              </div>

              <div
                className="bg-blue-50 p-4 rounded-lg max-w-xs truncate"
                title={bookingDetails.bookingId}
              >
                <p className="text-sm font-medium text-blue-800 mb-1">
                  Booking ID
                </p>
                <p className="text-blue-900 font-mono truncate">
                  {bookingDetails.bookingId}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Payment Summary
              </CardTitle>
              <CardDescription>Transaction details and receipt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid</span>
                  <span className="text-green-600">
                    ${bookingDetails.totalAmount}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                <p className="font-medium">{bookingDetails.paymentMethod}</p>
                <Badge
                  variant="secondary"
                  className="mt-2 flex items-center gap-1"
                >
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </Badge>
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={downloadReceipt}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Receipt
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>What&apos;s Next?</CardTitle>
            <CardDescription>
              Important information for your upcoming tour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Confirmation Email</h3>
                <p className="text-sm text-gray-600">
                  Check your email for detailed tour information and preparation
                  tips
                </p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Add to Calendar</h3>
                <p className="text-sm text-gray-600">
                  Don&lsquo;t forget to add this tour to your calendar with the
                  meeting location
                </p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Contact Teacher</h3>
                <p className="text-sm text-gray-600">
                  Reach out if you have any questions before your tour
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <Button variant="outline" size="lg">
            <Calendar className="w-4 h-4 mr-2" />
            View My Bookings
          </Button>
          <Button variant="outline" size="lg">
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Teacher
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Important:</strong> Please arrive 10 minutes early at the
            meeting point. Bring comfortable walking shoes and
            weather-appropriate clothing.
          </p>
        </div>
      </div>
    </div>
  );
}
